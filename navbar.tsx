"use client"

import { Button } from "@/components/ui/button"
import { Menu, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"
import { useCart } from "@/lib/hooks/use-cart"

export default function Navbar() {
  const { items } = useCart()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-yellow-500 font-bold text-xl">FRANCHISE</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/team">Team</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/premium">Premium</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <Button variant="ghost" className="text-white hover:text-purple-400">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </Link>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}

