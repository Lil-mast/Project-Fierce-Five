"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Christian Tazma",
    role: "Project Manager",
    image: "/images/christian.png",
  },
  {
    id: 2,
    name: "Fazaldeen Abdul",
    role: "Backend Engineer",
    image: "/images/fazaldeen.png",
  },
  {
    id: 3,
    name: "Rose Gathoni",
    role: "Frontend Engineer",
    image: "/images/rose.png",
  },
  {
    id: 4,
    name: "Samira Abdullahi",
    role: "DevOps Engineer",
    image: "/images/samira.png",
  },
  {
    id: 5,
    name: "Nasra Kulow",
    role: "Head of Design",
    image: "/images/nasra.png",
  },
]

export function TeamFooter() {
  return (
    <footer className="bg-[#0a1122] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">FRANCHISE</h3>
            <p className="text-gray-400 mb-4">
              Wear the Dream, Live your Legacy. Premium clothing designed to inspire the next generation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-400 hover:text-white">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">0725466528</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">info@franchise.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new releases and special offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-center">Our Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <motion.div key={member.id} whileHover={{ y: -5 }} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-3 overflow-hidden rounded-lg">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="font-semibold text-white">{member.name}</h4>
                <p className="text-sm text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Franchise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

