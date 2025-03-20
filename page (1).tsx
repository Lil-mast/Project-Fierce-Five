"use client"

import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CheckoutSuccessPage() {
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

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-black/40 border border-white/10 rounded-lg p-8 max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-gray-300 mb-8">
            Thank you for your purchase. We've received your order and will process it right away. You'll receive a
            confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white/10 text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

