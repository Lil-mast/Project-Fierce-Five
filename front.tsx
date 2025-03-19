"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import DynamicBackground from "@/components/dynamic-background"
import ChatBot from "@/components/chat-bot"

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showChatbot, setShowChatbot] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-navy-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-navy-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">FRANCHISE</h2>
          <p className="text-navy-400 mt-2">Loading our story...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Dynamic Background with reduced opacity */}
      <div className="opacity-30">
        <DynamicBackground />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-md border-b border-navy-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-navy-400 to-blue-500 bg-clip-text text-transparent"
            >
              FRANCHISE
            </Link>
          </motion.div>

          <Link href="/products">
            <motion.button
              className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-navy-900 border-r border-navy-800"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6 pl-2">Navigation</h2>
              <nav className="flex flex-col gap-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/products" },
                  { name: "About Us", path: "/about" },
                ].map((item) => (
                  <Link key={item.name} href={item.path}>
                    <motion.div
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        item.path === "/about" ? "bg-navy-800 text-white" : "text-navy-300 hover:bg-navy-800"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={16} />
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Our+Story"
                  alt="Franchise Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-navy-300">The Beginning</h2>
              <p className="text-navy-400 mb-4">
                Franchise was born in 2015 from a simple vision: to create apparel that inspires people to pursue their
                dreams with confidence and style. What started as a small collection designed in a college dorm room has
                evolved into a global brand that represents ambition and authenticity.
              </p>
              <p className="text-navy-400">
                Our founder's passion for design and quality craftsmanship remains at the heart of everything we create.
                Each piece in our collection is thoughtfully designed to empower you to express your unique identity.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mb-12 bg-navy-900/50 backdrop-blur-sm p-8 rounded-xl border border-navy-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-navy-300">Our Mission</h2>
            <p className="text-navy-400 text-center text-xl italic">
              "To inspire individuals to embrace their unique journey and create their legacy through premium apparel
              that combines style, quality, and purpose."
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              {
                title: "Quality",
                description:
                  "We source the finest materials and partner with ethical manufacturers to ensure every product meets our high standards.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously explore new designs, sustainable practices, and manufacturing techniques to stay at the forefront of the industry.",
              },
              {
                title: "Community",
                description:
                  "We believe in building a community of dreamers and doers who inspire each other to live authentically and purposefully.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-navy-900/50 backdrop-blur-sm p-6 rounded-xl border border-navy-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2 text-navy-300">{value.title}</h3>
                <p className="text-navy-400">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-navy-300">Join Our Journey</h2>
            <p className="text-navy-400 mb-8 max-w-2xl mx-auto">
              We're more than just a clothing brand – we're a movement of individuals who believe in the power of
              self-expression and pursuing dreams. When you wear Franchise, you're not just wearing a product; you're
              embodying a mindset.
            </p>
            <Link href="/products">
              <Button className="bg-navy-700 hover:bg-navy-600 text-white px-8 py-6 rounded-full text-lg">
                Explore Our Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-navy-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold bg-gradient-to-r from-navy-400 to-blue-500 bg-clip-text text-transparent">
                FRANCHISE
              </h2>
              <p className="text-navy-400 mt-2">Wear the dream, live your legacy</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="border-navy-700 hover:bg-navy-800/50">
                Contact Us
              </Button>
              <Button className="bg-navy-700 hover:bg-navy-600">Subscribe</Button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-navy-800 text-center text-navy-500">
            © {new Date().getFullYear()} Franchise. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowChatbot(!showChatbot)}
          className="rounded-full w-12 h-12 bg-navy-700 hover:bg-navy-600 shadow-lg"
        >
          {showChatbot ? <X size={20} /> : "💬"}
        </Button>

        <AnimatePresence>
          {showChatbot && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-80 md:w-96"
            >
              <ChatBot />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

