"use client"

import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const inspirationPosts = [
  {
    id: "1",
    title: "Finding Your Style Identity",
    excerpt:
      "Discover how to express your unique personality through fashion and create a style that truly represents who you are.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Style Guide",
  },
  {
    id: "2",
    title: "The Power of Sustainable Fashion",
    excerpt:
      "Learn about how sustainable fashion choices can make a positive impact on the environment while still looking amazing.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sustainability",
  },
  {
    id: "3",
    title: "From Sketch to Street: The Journey of a Design",
    excerpt:
      "Follow the fascinating process of how our clothing designs go from initial concept to finished products worn on the streets.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Behind the Scenes",
  },
  {
    id: "4",
    title: "Building Confidence Through Fashion",
    excerpt: "Explore how the right clothing choices can boost your confidence and help you make a lasting impression.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Personal Growth",
  },
  {
    id: "5",
    title: "Styling Tips for the Modern Youth",
    excerpt:
      "Get practical advice on how to create stylish, versatile outfits that express your individuality without breaking the bank.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Style Guide",
  },
  {
    id: "6",
    title: "The History of Streetwear",
    excerpt:
      "Dive into the rich history of streetwear fashion and how it has evolved to become a dominant force in the fashion industry.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Fashion History",
  },
]

export default function InspirationPage() {
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Inspiration</h1>
          <p className="text-gray-400 text-xl mb-12 text-center max-w-2xl mx-auto">
            Explore ideas, stories, and insights that inspire our designs and can help you develop your own unique
            style.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirationPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-white/10 overflow-hidden hover:border-purple-500/50 transition-all">
                  <div className="relative h-48 w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">{post.category}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <Button variant="link" className="text-purple-400 p-0 h-auto">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with like-minded individuals who share your passion for fashion, self-expression, and building a
              personal legacy.
            </p>
            <Link href="/premium">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">Join Premium Membership</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

