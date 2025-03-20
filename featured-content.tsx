"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredItems = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Explore our latest summer styles designed for comfort and style.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/products",
  },
  {
    id: 2,
    title: "Premium Membership",
    description: "Join our exclusive club and get early access to new releases.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/premium",
  },
  {
    id: 3,
    title: "Limited Edition Drops",
    description: "Don't miss our limited edition items - available while supplies last.",
    image: "/placeholder.svg?height=400&width=600",
    link: "/products",
  },
]

export function FeaturedContent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % featuredItems.length
        setActiveIndex(nextIndex)

        scrollRef.current.scrollTo({
          left: nextIndex * scrollRef.current.offsetWidth,
          behavior: "smooth",
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isScrolling])

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft
      const itemWidth = scrollRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / itemWidth)

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }

  const handleMouseEnter = () => setIsScrolling(true)
  const handleMouseLeave = () => setIsScrolling(false)

  return (
    <div className="relative w-full py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Featured</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
        onScroll={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {featuredItems.map((item) => (
          <div key={item.id} className="min-w-full w-full flex-shrink-0 snap-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  <Link href={item.link}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-purple-500" : "bg-gray-600"
            }`}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: index * scrollRef.current.offsetWidth,
                  behavior: "smooth",
                })
                setActiveIndex(index)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

