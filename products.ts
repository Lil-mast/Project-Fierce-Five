export type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  featured?: boolean
  new?: boolean
  bestSeller?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Legacy Hoodie",
    description:
      "Our signature hoodie designed for comfort and style. Made from premium cotton blend with a soft inner lining.",
    price: 79.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Purple"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Dream T-Shirt",
    description: "Lightweight and breathable t-shirt with our iconic 'Dream' design on the front.",
    price: 34.99,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "t-shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Blue"],
    new: true,
  },
  {
    id: "3",
    name: "Franchise Cap",
    description: "Adjustable cap with embroidered Franchise logo. Perfect for any casual outfit.",
    price: 29.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Black", "White", "Purple"],
    bestSeller: true,
  },
  {
    id: "4",
    name: "Legacy Joggers",
    description:
      "Comfortable joggers with tapered fit and elastic waistband. Features side pockets and embroidered logo.",
    price: 59.99,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    featured: true,
  },
  {
    id: "5",
    name: "Dream Bomber Jacket",
    description: "Premium bomber jacket with quilted lining and Franchise emblem on the back.",
    price: 129.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    new: true,
    featured: true,
  },
  {
    id: "6",
    name: "Legacy Backpack",
    description: "Durable backpack with multiple compartments and laptop sleeve. Water-resistant material.",
    price: 89.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Black", "Gray"],
    bestSeller: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.new)
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.bestSeller)
}

