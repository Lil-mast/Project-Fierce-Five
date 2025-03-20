use actix_web::{web, App, HttpResponse, HttpServer, Error, middleware::Logger};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use bcrypt::hash;
use chrono::{Utc, Duration};
use uuid::Uuid;
use std::env;

#[macro_use] extern crate diesel;

// Database schema (for Diesel)
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
}

// Error handling
#[derive(thiserror::Error, Debug)]
enum SecurityError {
    #[error("Database error: {0}")]
    Database(#[from] diesel::result::Error),
    #[error("Bcrypt error: {0}")]
    Bcrypt(#[from] bcrypt::BcryptError),
    #[error("JWT error: {0}")]
    Jwt(#[from] jsonwebtoken::errors::Error),
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
}

impl actix_web::ResponseError for SecurityError {
    fn error_response(&self) -> HttpResponse {
        match self {
            SecurityError::Unauthorized(msg) => HttpResponse::Unauthorized().body(msg.clone()),
            _ => HttpResponse::InternalServerError().body(self.to_string()),
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

    #[derive(Insertable, Deserialize)]
    #[diesel(table_name = users)]
    pub struct NewUser {
        pub username: String,
        pub email: String,
        pub password_hash: String,
    }
}

// Authentication middleware
mod middleware {
    use super::*;

    pub fn validate_token(req: &actix_web::dev::ServiceRequest) -> Result<(), SecurityError> {
        let auth_header = req.headers().get("Authorization").ok_or_else(|| {
            SecurityError::Unauthorized("Missing Authorization header".to_string())
        })?;
        let auth_str = auth_header.to_str().map_err(|_| {
            SecurityError::Unauthorized("Invalid header format".to_string())
        })?;
        if !auth_str.starts_with("Bearer ") {
            return Err(SecurityError::Unauthorized("Invalid header format".to_string()));
        }
        let token = &auth_str[7..];
        let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        decode::<Claims>(token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())
            .map(|_| ())
            .map_err(|_| SecurityError::Unauthorized("Invalid or expired token".to_string()))
    }

    #[derive(Serialize, Deserialize)]
    pub struct Claims {
        sub: String, // Subject (user ID or username)
        exp: usize,  // Expiration timestamp
    }
}

// Controllers
mod controllers {
    use super::*;

    pub async fn register(
        pool: web::Data<config::DbPool>,
        user: web::Json<NewUserRequest>,
    ) -> Result<HttpResponse, SecurityError> {
        let password_hash = hash(&user.password, bcrypt::DEFAULT_COST)?;
        let new_user = models::NewUser {
            username: user.username.clone(),
            email: user.email.clone(),
            password_hash,
        };
        let conn = pool.get().expect("Couldn't get db connection");
        diesel::insert_into(schema::users::table)
            .values(&new_user)
            .execute(&conn)?;
        Ok(HttpResponse::Ok().json("User registered successfully"))
    }

    pub async fn login(
        pool: web::Data<config::DbPool>,
        credentials: web::Json<LoginRequest>,
    ) -> Result<HttpResponse, SecurityError> {
        let conn = pool.get().expect("Couldn't get db connection");
        let user: models::User = schema::users::table
            .filter(schema::users::username.eq(&credentials.username))
            .first(&conn)
            .optional()?
            .ok_or_else(|| SecurityError::Unauthorized("User not found".to_string()))?;

        if !bcrypt::verify(&credentials.password, &user.password_hash)? {
            return Err(SecurityError::Unauthorized("Invalid password".to_string()));
        }

        let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let claims = middleware::Claims {
            sub: user.username.clone(),
            exp: (Utc::now() + Duration::hours(24)).timestamp() as usize,
        };
        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))?;
        Ok(HttpResponse::Ok().json(TokenResponse { token }))
    }

    pub async fn protected_endpoint(
        pool: web::Data<config::DbPool>,
        req: actix_web::HttpRequest,
    ) -> Result<HttpResponse, SecurityError> {
        middleware::validate_token(&req.into())?;
        Ok(HttpResponse::Ok().json("This is a protected endpoint"))
    }

    #[derive(Deserialize)]
    pub struct NewUserRequest {
        pub username: String,
        pub email: String,
        pub password: String,
    }

    #[derive(Deserialize)]
    pub struct LoginRequest {
        pub username: String,
        pub password: String,
    }

    #[derive(Serialize)]
    pub struct TokenResponse {
        pub token: String,
    }
}

// Routes
mod routes {
    use super::*;

    pub fn configure(cfg: &mut web::ServiceConfig) {
        cfg.service(
            web::scope("/api")
                .route("/register", web::post().to(controllers::register))
                .route("/login", web::post().to(controllers::login))
                .route("/protected", web::get().to(controllers::protected_endpoint)),
        );
    }
}

// Main entry point
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    dotenv::dotenv().ok();
    let pool = config::establish_connection();

    println!("Starting server at http://127.0.0.1:8080");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(Logger::default()) // Logging middleware
            .configure(routes::configure)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}