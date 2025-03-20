"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingBag, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Wear the Dream
              </span>
              <br />
              Live your Legacy
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Franchise is more than just clothing. It's a statement, a lifestyle, and a community for those who dare to
            dream and live their legacy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
            </Link>
            <Link href="/premium">
              <Button size="lg" variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                <Sparkles className="mr-2 h-5 w-5" />
                Join Premium
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* History & Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 mx-auto max-w-4xl bg-black/60 backdrop-blur-md p-6 rounded-lg border border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Our History</h2>
            <p className="text-gray-300">
              Founded in 2023, Franchise began as a small collective of designers with a vision to create clothing that
              empowers. What started as a passion project has grown into a movement that inspires young people to
              express themselves through fashion.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-gray-300">
              We're on a mission to help young people express their unique identity through fashion that makes a
              statement. Every piece we create is designed to inspire confidence and help you build your personal
              legacy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}

