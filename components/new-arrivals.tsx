"use client"

import ProductCard from "./product-card"

const newArrivals = [
  {
    id: 5,
    name: "Autumn Edition Hoodie",
    price: 2499,
    image: "/autumn-hoodie-new-collection-streetwear.jpg",
    colors: ["Rust", "Bronze"],
  },
  {
    id: 6,
    name: "Limited Edition Drop",
    price: 3299,
    image: "/limited-edition-hoodie-exclusive.jpg",
    colors: ["Black", "White"],
  },
]

export default function NewArrivals() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 max-w-7xl mx-auto bg-gray-50">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">New Arrivals</h2>
        <p className="text-gray-600 text-base md:text-lg">Check out our latest releases</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
