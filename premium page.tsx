"use client"

import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Star } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
  "Early access to new collections",
  "Exclusive member-only designs",
  "Free shipping on all orders",
  "Special discounts and promotions",
  "Invitation to fashion events",
  "Personalized styling advice",
  "Access to limited edition items",
  "Member community and forums",
]

const plans = [
  {
    name: "Monthly",
    price: 19.99,
    period: "month",
    features: [
      "Access to exclusive designs",
      "Free shipping on orders over $50",
      "10% discount on all products",
      "Monthly newsletter",
    ],
    popular: false,
  },
  {
    name: "Annual",
    price: 14.99,
    period: "month",
    billedAs: "billed annually ($179.88)",
    features: [
      "All Monthly benefits",
      "Free shipping on all orders",
      "15% discount on all products",
      "Early access to new collections",
      "Exclusive member events",
    ],
    popular: true,
  },
  {
    name: "Lifetime",
    price: 499,
    period: "one-time",
    features: [
      "All Annual benefits",
      "20% lifetime discount",
      "Priority access to limited editions",
      "Personal styling consultation",
      "VIP customer support",
      "Exclusive gifts with purchase",
    ],
    popular: false,
  },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Franchise Premium Membership</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Join our exclusive community and unlock premium benefits that will elevate your fashion experience and help
            you build your legacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Member Benefits</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-purple-600 rounded-full p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/40 border border-white/10 rounded-lg p-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Why Join?</h2>
            <p className="text-gray-300 mb-4">
              Franchise Premium is more than just a membership - it's a community of like-minded individuals who are
              passionate about fashion and self-expression.
            </p>
            <p className="text-gray-300 mb-4">
              As a member, you'll get exclusive access to limited edition designs, early releases, and special events
              that will help you stay ahead of the fashion curve.
            </p>
            <p className="text-gray-300 mb-4">
              Our premium members also receive personalized styling advice from our team of fashion experts, helping you
              create a unique style that truly represents who you are.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-white mb-2">Join the Movement</h3>
              <p className="text-gray-300">
                Become part of a growing community that's redefining fashion and helping young people express themselves
                through clothing that makes a statement.
              </p>
            </div>
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Plan</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-900/40 to-black/40 border-purple-500"
                    : "bg-black/40 border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                    {plan.billedAs && <p className="text-sm text-gray-400 mt-1">{plan.billedAs}</p>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Star className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join?</h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Start your premium membership today and unlock a world of exclusive fashion benefits.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
            Become a Member
          </Button>
        </div>
      </div>
    </div>
  )
}

