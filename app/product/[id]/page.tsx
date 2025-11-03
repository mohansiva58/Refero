"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Heart, Share2, Truck, Shield, X, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { useRouter } from "next/navigation"

const allProducts = [
  {
    id: 1,
    name: "REGULAR FIT GRAPHIC PRINT SWEATSHIRT",
    subtitle: "LOBO - NAVY",
    mrp: 4499,
    price: 3959,
    discount: 12,
    images: [
      "https://cdn.shopify.com/s/files/1/0752/6435/files/LAURELLIGHTTURQ-CC1380_900x.webp?v=1743582326",
      "https://thehouseofrare.com/cdn/shop/files/LOBONAVY00798HERO-vmake.webp?v=1743582715",
      "https://thehouseofrare.com/cdn/shop/files/WALEDUSKYPINK01251.webp?v=1743581644",
      "https://cdn.shopify.com/s/files/1/0752/6435/files/KANTOFFWHITE00263HERO_900x.webp?v=1743581669",
    ],
    description:
      "Elevate your casual wardrobe with our Regular Fit Graphic Print Sweatshirt. Made from premium cotton blend fabric, this sweatshirt features a bold graphic print on the back and sleeves, offering both comfort and style. Perfect for layering or wearing solo.",
    longDescription: `Crafted with care and attention to detail, this sweatshirt is designed to be your go-to choice for everyday comfort. The regular fit ensures a relaxed silhouette that moves with you, while the soft fabric provides warmth without compromising breathability.

The eye-catching graphic print adds a contemporary edge to this classic piece, making it perfect for both casual outings and relaxed weekends. Whether you're running errands or meeting friends, this sweatshirt delivers effortless style.`,
    colors: ["Navy", "Dusky Pink", "Off White", "Black"],
    sizes: ["XS-36", "S-38", "M-40", "L-42", "XL-44", "XXL-46", "3XL-48"],
    rating: 4.5,
    reviews: 128,
    features: [
      "Premium Cotton Blend (80% Cotton, 20% Polyester)",
      "Regular Fit for Comfortable Wear",
      "Graphic Print on Back and Sleeves",
      "Ribbed Cuffs and Hem",
      "Machine Washable",
      "100% Authentic Product",
    ],
    gstSavings: 111,
    fabricCare: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
      "Do not dry clean",
    ],
    sizeChart: {
      headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
      data: [
        ["XS-36", "36", "26", "16.5"],
        ["S-38", "38", "27", "17"],
        ["M-40", "40", "28", "17.5"],
        ["L-42", "42", "29", "18"],
        ["XL-44", "44", "30", "18.5"],
        ["XXL-46", "46", "31", "19"],
        ["3XL-48", "48", "32", "19.5"],
      ],
    },
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [mainImage, setMainImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Navy")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [pincode, setPincode] = useState("")
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { user, setShowLoginModal } = useAuth()
  const router = useRouter()

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  const productId = resolvedParams?.id ? Number.parseInt(resolvedParams.id) : 1
  const product = allProducts.find((p) => p.id === productId) || allProducts[0]
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
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

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    
    // Check if user is logged in before proceeding to checkout
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    handleAddToCart()
    router.push("/checkout")
  }

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryStatus("✓ Delivery available in 3-5 business days")
    } else {
      setDeliveryStatus("Please enter a valid 6-digit pincode")
    }
  }

  const gstSavings = product.gstSavings || Math.round((product.mrp - product.price) * 0.18)

  const openImageModal = (index: number) => {
    setModalImageIndex(index)
    setShowImageModal(true)
  }

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <>
      <Navbar />
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X size={32} />
          </button>
          <button
            onClick={prevModalImage}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={nextModalImage}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
          >
            <ChevronRight size={48} />
          </button>
          <img
            src={product.images[modalImageIndex] || "/placeholder.svg"}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">Size Guide</h2>
              <button onClick={() => setShowSizeChart(false)} className="text-gray-600 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {product.sizeChart.headers.map((header, i) => (
                        <th key={i} className="border border-gray-300 px-4 py-3 text-left font-bold text-sm">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeChart.data.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-300 px-4 py-3 text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-sm mb-2">How to Measure</h3>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                  <li>• <strong>Length:</strong> Measure from the highest point of shoulder to the hem</li>
                  <li>• <strong>Shoulder:</strong> Measure from shoulder seam to shoulder seam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
          {/* Breadcrumb */}
          <div className="text-xs md:text-sm text-gray-600 mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:underline hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:underline hover:text-black">
              Rare Rabbit
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.subtitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] cursor-zoom-in"
                onClick={() => openImageModal(mainImage)}
              >
                <img
                  src={product.images[mainImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Wishlist & Share Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                      })
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition ${
                      isWishlisted ? "bg-red-500 text-white" : "bg-white/80 text-black hover:bg-white"
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                  </button>
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      index === mainImage ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1">{product.name}</h1>
                <p className="text-sm md:text-base text-gray-600 font-medium">{product.subtitle}</p>
              </div>

              {/* Price Section */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs md:text-sm text-gray-600">MRP</p>
                  <p className="text-base md:text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black">₹{product.price.toLocaleString("en-IN")}</p>
                  <span className="text-sm md:text-base text-red-600 font-bold">{product.discount}%</span>
                </div>
                <p className="text-xs text-gray-600">(Incl. of all taxes)</p>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm md:text-base font-bold uppercase">Size Guide</label>
                  <button 
                    onClick={() => setShowSizeChart(true)}
                    className="text-xs md:text-sm underline hover:no-underline text-black font-medium"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 md:py-3 px-2 border-2 rounded text-xs md:text-sm font-medium transition ${
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

              {/* Quantity Selector */}
              <div>
                <label className="text-sm md:text-base font-bold mb-3 block">QUANTITY</label>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-lg font-bold hover:text-gray-600 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 text-lg font-semibold min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-lg font-bold hover:text-gray-600 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* EMI Section */}
              <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-xs md:text-sm font-bold text-gray-900">PAY NOW</p>
                  <span className="text-base md:text-lg font-bold text-green-600">₹{Math.round(product.price * 0.1)}</span>
                  <span className="text-xs text-gray-600">REST PAY LATER</span>
                  <span className="text-[10px] md:text-xs bg-teal-600 text-white px-2 py-0.5 rounded font-bold">NEW</span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-700">
                  AT 0% EMI ON <span className="font-bold">UPI</span> |{" "}
                  <button className="text-blue-600 underline hover:no-underline font-medium">CHECK EMI NOW</button>
                </p>
              </div>

              {/* Pincode Check */}
              <div className="pb-6 border-b border-gray-200">
                <p className="text-xs md:text-sm font-bold mb-3 uppercase">Check Estimated Delivery</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER YOUR PINCODE"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black uppercase placeholder:text-xs"
                  />
                  <button
                    onClick={checkDelivery}
                    className="px-4 md:px-6 py-2.5 md:py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition text-xs md:text-sm whitespace-nowrap"
                  >
                    CHECK
                  </button>
                </div>
                {deliveryStatus && (
                  <p
                    className={`text-xs mt-2 font-medium ${deliveryStatus.includes("✓") ? "text-green-600" : "text-red-600"}`}
                  >
                    {deliveryStatus}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 md:py-4 px-4 border-2 border-black text-black font-bold rounded hover:bg-gray-100 transition text-sm md:text-base"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 md:py-4 px-4 bg-black text-white font-bold rounded hover:bg-gray-800 transition text-sm md:text-base"
                >
                  BUY IT NOW
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-3 items-start">
                  <Truck size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Free Shipping</p>
                    <p className="text-gray-600 text-xs">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Shield size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Easy Returns & Exchanges</p>
                    <p className="text-gray-600 text-xs">Within 30 days of purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description Section */}
          <div className="mt-12 md:mt-16 space-y-8">
            {/* Description */}
            <div className="border-t border-gray-200 pt-8 md:pt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase">Description</h2>
              <div className="prose prose-sm md:prose-base max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-8 md:pt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase">Product Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                    <span className="text-sm md:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fabric Care */}
            <div className="border-t border-gray-200 pt-8 md:pt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase">Fabric Care</h2>
              <ul className="space-y-2">
                {product.fabricCare.map((care, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gray-400 text-lg">•</span>
                    <span className="text-sm md:text-base text-gray-700">{care}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8 md:pt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase">Ratings & Reviews</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className={`text-xl md:text-2xl ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold">{product.rating} out of 5</p>
                  <p className="text-xs md:text-sm text-gray-600">Based on {product.reviews} reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
