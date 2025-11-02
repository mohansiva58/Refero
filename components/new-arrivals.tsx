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
    <section className="py-16 px-6 max-w-7xl mx-auto bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h2>
        <p className="text-gray-600 text-lg">Check out our latest releases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
