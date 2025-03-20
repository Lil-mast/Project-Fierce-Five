use actix_web::{web, App, HttpResponse, HttpServer, Error};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use bcrypt::hash;
use chrono::{Utc, Duration};
use uuid::Uuid;
use std::env;

#[macro_use] extern crate diesel;

// Schema for Diesel (assuming tables are defined)
mod schema {
    use diesel::prelude::*;
    table! {
        users (id) {
            id -> Int4,
            username -> Varchar,
            email -> Varchar,
            password_hash -> Varchar,
        }
    }
    table! {
        payments (id) {
            id -> Uuid,
            user_id -> Int4,
            amount -> Float8,
            bank_account_id -> Varchar,
            status -> Varchar,
            created_at -> Timestamp,
        }
    }
}

// Database configuration
mod config {
    use super::*;
    pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

    pub fn establish_connection() -> DbPool {
        dotenv::dotenv().ok();
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let manager = ConnectionManager::<PgConnection>::new(database_url);
        r2d2::Pool::builder()
            .build(manager)
            .expect("Failed to create pool")
    }
}

// Models
mod models {
    use super::*;

    #[derive(Queryable, Serialize, Deserialize)]
    pub struct User {
        pub id: i32,
        pub username: String,
        pub email: String,
        pub password_hash: String,
    }

    #[derive(Insertable, Serialize, Deserialize)]
    #[diesel(table_name = users)]
    pub struct NewUser {
        pub username: String,
        pub email: String,
        pub password_hash: String,
    }

    #[derive(Queryable, Serialize, Deserialize)]
    pub struct Payment {
        pub id: Uuid,
        pub user_id: i32,
        pub amount: f64,
        pub bank_account_id: String,
        pub status: String,
        pub created_at: chrono::NaiveDateTime,
    }

    #[derive(Insertable, Serialize, Deserialize)]
    #[diesel(table_name = payments)]
    pub struct NewPayment {
        pub user_id: i32,
        pub amount: f64,
        pub bank_account_id: String,
        pub status: String,
    }
}

// Middleware
mod middleware {
    use super::*;

    pub struct AuthMiddleware;

    impl AuthMiddleware {
        pub fn validate_token(req: &actix_web::dev::ServiceRequest) -> Result<(), Error> {
            let auth_header = req.headers().get("Authorization");
            if let Some(auth_header) = auth_header {
                if let Ok(auth_str) = auth_header.to_str() {
                    if auth_str.starts_with("Bearer ") {
                        let token = &auth_str[7..];
                        let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
                        decode::<Claims>(token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())
                            .map(|_| ())
                            .map_err(|_| actix_web::error::ErrorUnauthorized("Invalid token"))
                    } else {
                        Err(actix_web::error::ErrorUnauthorized("Invalid header"))
                    }
                } else {
                    Err(actix_web::error::ErrorUnauthorized("Invalid header format"))
                }
            } else {
                Err(actix_web::error::ErrorUnauthorized("Missing token"))
            }
        }
    }

    #[derive(Serialize, Deserialize)]
    pub struct Claims {
        sub: String,
        exp: usize,
    }
}

// Controllers
mod controllers {
    use super::*;

    pub async fn register(
        pool: web::Data<config::DbPool>,
        user: web::Json<models::NewUser>,
    ) -> Result<HttpResponse, Error> {
        let password_hash = hash(&user.password_hash, bcrypt::DEFAULT_COST)?;
        let new_user = models::NewUser {
            username: user.username.clone(),
            email: user.email.clone(),
            password_hash,
        };
        let conn = pool.get().expect("Couldn't get db connection");
        diesel::insert_into(schema::users::table)
            .values(&new_user)
            .execute(&conn)?;
        Ok(HttpResponse::Ok().json("User registered"))
    }

    pub async fn login(
        pool: web::Data<config::DbPool>,
        credentials: web::Json<LoginCredentials>,
    ) -> Result<HttpResponse, Error> {
        let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let claims = middleware::Claims {
            sub: credentials.username.clone(),
            exp: (Utc::now() + Duration::hours(24)).timestamp() as usize,
        };
        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))?;
        Ok(HttpResponse::Ok().json(token))
    }

    pub async fn initiate_payment(
        pool: web::Data<config::DbPool>,
        payment: web::Json<InitiatePaymentRequest>,
        req: actix_web::HttpRequest,
    ) -> Result<HttpResponse, Error> {
        middleware::AuthMiddleware::validate_token(&req.into())?;
        let conn = pool.get().expect("Couldn't get db connection");

        let bank_account_id = env::var("RECEIVING_BANK_ACCOUNT_ID")
            .expect("RECEIVING_BANK_ACCOUNT_ID must be set");

        let new_payment = models::NewPayment {
            user_id: payment.user_id,
            amount: payment.amount,
            bank_account_id: bank_account_id.clone(),
            status: "pending".to_string(),
        };

        let payment = diesel::insert_into(schema::payments::table)
            .values(&new_payment)
            .get_result::<models::Payment>(&conn)?;

        simulate_bank_transfer(&payment).await?;
        Ok(HttpResponse::Ok().json(payment))
    }

    async fn simulate_bank_transfer(payment: &models::Payment) -> Result<(), Error> {
        println!(
            "Simulating transfer of {} to bank account {} for user {}",
            payment.amount, payment.bank_account_id, payment.user_id
        );
        Ok(())
    }

    #[derive(Deserialize)]
    pub struct LoginCredentials {
        username: String,
        password: String,
    }

    #[derive(Deserialize)]
    pub struct InitiatePaymentRequest {
        user_id: i32,
        amount: f64,
    }
}

// Routes
mod routes {
    use super::*;

    pub fn configure(cfg: &mut web::ServiceConfig) {
        cfg.service(
            web::scope("/auth")
                .route("/register", web::post().to(controllers::register))
                .route("/login", web::post().to(controllers::login))
        )
        .service(
            web::scope("/payments")
                .route("/initiate", web::post().to(controllers::initiate_payment))
        );
    }
}

// Main entry point
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let pool = config::establish_connection();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::configure)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}