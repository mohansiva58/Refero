"use client"

import Link from "next/link"
import ProductCard from "./product-card"

const hoodies = [
  {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1999,
    image: "/black-hoodie-premium-streetwear.jpg",
    colors: ["Black", "White", "Navy"],
  },
  {
    id: 2,
    name: "Urban Grey Hoodie",
    price: 2199,
    image: "/grey-hoodie-modern-design.jpg",
    colors: ["Grey", "Dark Grey"],
  },
  {
    id: 3,
    name: "Oversized Charcoal",
    price: 2399,
    image: "/oversized-charcoal-hoodie-fashion.jpg",
    colors: ["Charcoal", "Black"],
  },
  {
    id: 4,
    name: "Vintage Cream Hoodie",
    price: 2299,
    image: "/cream-vintage-hoodie-luxury.jpg",
    colors: ["Cream", "Off-White"],
  },
]

export default function HoodiesSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop Hoodies</h2>
        <p className="text-gray-600 text-lg">Discover our premium collection of handcrafted hoodies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {hoodies.map((hoodie) => (
          <ProductCard key={hoodie.id} product={hoodie} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/shop" className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-900 transition">
          View All Products
        </Link>
      </div>
    </section>
  )
}
