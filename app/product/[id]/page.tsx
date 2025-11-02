"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

const productData = {
  1: {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1999,
    images: ["/black-hoodie-front-view.jpg", "/black-hoodie-back-view.jpg", "/black-hoodie-detail.jpg"],
    description:
      "Experience ultimate comfort and style with our classic black hoodie. Crafted from premium quality fabric, this hoodie is perfect for any occasion.",
    colors: ["Black", "White", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviews: 128,
    features: [
      "Premium Cotton Blend",
      "100% Authentic",
      "Free Shipping on Orders Above ₹500",
      "Easy Returns",
      "2-Year Warranty",
    ],
  },
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [mainImage, setMainImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Black")
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const product = productData[1]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Images */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 md:h-full">
                <img
                  src={product.images[mainImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`border-2 rounded overflow-hidden ${index === mainImage ? "border-black" : "border-gray-300"}`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={16} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    ))}
                </div>
                <p className="text-sm text-gray-600">({product.reviews} reviews)</p>
              </div>

              <p className="text-3xl font-bold mb-6">₹{product.price.toLocaleString("en-IN")}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded transition ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded font-semibold hover:bg-gray-900 transition"
                >
                  Add to Cart
                </button>
                <Link
                  href="/checkout"
                  className="block w-full bg-gray-200 text-black py-4 rounded font-semibold hover:bg-gray-300 transition text-center"
                >
                  Buy Now
                </Link>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Why Choose This?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
