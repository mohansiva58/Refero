"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronDown } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1999,
    image: "/black-hoodie-premium-streetwear.jpg",
    colors: ["Black", "White", "Navy"],
    category: "Hoodies",
    size: "All",
  },
  {
    id: 2,
    name: "Urban Grey Hoodie",
    price: 2199,
    image: "/grey-hoodie-modern-design.jpg",
    colors: ["Grey", "Dark Grey"],
    category: "Hoodies",
    size: "All",
  },
  {
    id: 3,
    name: "Oversized Charcoal",
    price: 2399,
    image: "/oversized-charcoal-hoodie-fashion.jpg",
    colors: ["Charcoal", "Black"],
    category: "Hoodies",
    size: "Oversized",
  },
  {
    id: 4,
    name: "Vintage Cream Hoodie",
    price: 2299,
    image: "/cream-vintage-hoodie-luxury.jpg",
    colors: ["Cream", "Off-White"],
    category: "Hoodies",
    size: "All",
  },
  {
    id: 5,
    name: "Autumn Edition Hoodie",
    price: 2499,
    image: "/autumn-hoodie-new-collection-streetwear.jpg",
    colors: ["Rust", "Bronze"],
    category: "Limited Edition",
    size: "All",
  },
  {
    id: 6,
    name: "Limited Edition Drop",
    price: 3299,
    image: "/limited-edition-hoodie-exclusive.jpg",
    colors: ["Black", "White"],
    category: "Limited Edition",
    size: "All",
  },
  {
    id: 7,
    name: "Premium Midnight Black",
    price: 2599,
    image: "/premium-midnight-black-hoodie.jpg",
    colors: ["Black"],
    category: "Hoodies",
    size: "All",
  },
  {
    id: 8,
    name: "Sunset Orange Hoodie",
    price: 2399,
    image: "/sunset-orange-hoodie.jpg",
    colors: ["Orange", "Rust"],
    category: "Hoodies",
    size: "All",
  },
]

const priceRanges = [
  { label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "₹0 - ₹2000", min: 0, max: 2000 },
  { label: "₹2000 - ₹2500", min: 2000, max: 2500 },
  { label: "₹2500+", min: 2500, max: Number.POSITIVE_INFINITY },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: Number.POSITIVE_INFINITY })
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))]

  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    filtered = filtered.filter((p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max)

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id)
    }

    return filtered
  }, [selectedCategory, selectedPrice, sortBy])

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Page Header */}
        <div className="border-b border-gray-200 px-6 py-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
          <p className="text-gray-600">Discover our exclusive range of premium hoodies</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
              <div className="space-y-6">
                {/* Categories */}
                <div className="border-b pb-6">
                  <h3 className="font-bold mb-4">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded transition ${
                          selectedCategory === cat
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="border-b pb-6">
                  <h3 className="font-bold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPrice({ min: range.min, max: range.max })}
                        className={`block w-full text-left px-3 py-2 rounded transition ${
                          selectedPrice.min === range.min && selectedPrice.max === range.max
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredProducts.length}</span> products
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black pr-8"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  {showFilters ? "Hide" : "Show"} Filters
                </button>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
