"use client"

import Link from "next/link"
import ProductCard from "./product-card"

const hoodies = [
  {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1999,
    mrp: 2499,
    discount: 20,
    image: "https://cdn.shopify.com/s/files/1/0752/6435/files/LAURELLIGHTTURQ-CC1380_900x.webp?v=1743582326",
    colors: ["Black", "White", "Navy"],
  },
  {
    id: 2,
    name: "Urban Grey Hoodie",
    price: 2199,
    mrp: 2999,
    discount: 27,
    image: "https://thehouseofrare.com/cdn/shop/files/LOBONAVY00798HERO-vmake.webp?v=1743582715",
    colors: ["Grey", "Dark Grey"],
  },
  {
    id: 3,
    name: "Oversized Charcoal",
    price: 2399,
    mrp: 3199,
    discount: 25,
    image: "https://thehouseofrare.com/cdn/shop/files/WALEDUSKYPINK01251.webp?v=1743581644",
    colors: ["Charcoal", "Black"],
  },
  {
    id: 4,
    name: "Vintage Cream Hoodie",
    price: 2299,
    mrp: 2999,
    discount: 23,
    image:"https://cdn.shopify.com/s/files/1/0752/6435/files/KANTOFFWHITE00263HERO_900x.webp?v=1743581669",
    colors: ["Cream", "Off-White"],
  },
]

export default function HoodiesSection() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Shop Hoodies</h2>
        <p className="text-gray-600 text-base md:text-lg">Discover our premium collection of handcrafted hoodies</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {hoodies.map((hoodie) => (
          <ProductCard key={hoodie.id} product={hoodie} />
        ))}
      </div>

      <div className="text-center mt-8 md:mt-12">
        <Link href="/shop" className="inline-block bg-black text-white px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base rounded hover:bg-gray-900 transition">
          View All Products
        </Link>
      </div>
    </section>
  )
}
