"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Package, Clock, CheckCircle, Truck, Mail, Lock, Search } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    email: "customer@example.com",
    date: "2025-01-15",
    status: "delivered",
    items: ["Classic Black Hoodie"],
    total: 1999,
    tracking: [
      { stage: "Order Confirmed", date: "2025-01-15", completed: true },
      { stage: "Processing", date: "2025-01-16", completed: true },
      { stage: "Shipped", date: "2025-01-17", completed: true },
      { stage: "Out for Delivery", date: "2025-01-19", completed: true },
      { stage: "Delivered", date: "2025-01-20", completed: true },
    ],
  },
  {
    id: "ORD-002",
    email: "test@example.com",
    date: "2025-01-20",
    status: "shipped",
    items: ["White Premium Hoodie", "Black T-Shirt"],
    total: 2499,
    tracking: [
      { stage: "Order Confirmed", date: "2025-01-20", completed: true },
      { stage: "Processing", date: "2025-01-21", completed: true },
      { stage: "Shipped", date: "2025-01-22", completed: true },
      { stage: "Out for Delivery", date: "", completed: false },
      { stage: "Delivered", date: "", completed: false },
    ],
  },
]

export default function TrackPage() {
  const [searchId, setSearchId] = useState("")
  const [email, setEmail] = useState("")
  const [foundOrder, setFoundOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleSearch = async () => {
    setError("")
    setFoundOrder(null)
    setShowResult(false)

    if (!searchId.trim()) {
      setError("Please enter an order ID")
      return
    }

    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call with delay
    setTimeout(() => {
      const order = mockOrders.find(
        (o) => o.id.toUpperCase() === searchId.toUpperCase() && o.email.toLowerCase() === email.toLowerCase()
      )

      if (order) {
        setFoundOrder(order)
        setShowResult(true)
      } else {
        setError("Order not found or email doesn't match. Please check your details and try again.")
      }
      setIsLoading(false)
    }, 800)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-600" size={24} />
      case "shipped":
        return <Truck className="text-blue-600" size={24} />
      case "processing":
        return <Clock className="text-yellow-600" size={24} />
      default:
        return <Package className="text-gray-600" size={24} />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header with Animation */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="relative inline-block mb-4">
              <Package className="w-16 h-16 mx-auto text-gray-700 animate-bounce-slow" />
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Track Your Order
            </h1>
            <p className="text-gray-600 text-lg">Enter your order details to track your shipment in real-time</p>
          </div>

          {/* Search Card with Animation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 animate-slide-up">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter Order ID (e.g., ORD-001)"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Tracking Order...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Track Order
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Demo Info */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl animate-slide-up">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Demo:</span> Try order ID: <strong>ORD-001</strong> with email:{" "}
              <strong>customer@example.com</strong>
            </p>
          </div>

          {/* Tracking Details with Animation */}
          {showResult && foundOrder && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl animate-slide-up-fade">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {getStatusIcon(foundOrder.status)}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{foundOrder.id}</h2>
                    <p className="text-gray-600 text-sm mt-1">Order placed on {new Date(foundOrder.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusBadge(foundOrder.status)}`}
                >
                  {foundOrder.status}
                </span>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Order Total</p>
                  <p className="text-2xl font-bold text-gray-800">₹{foundOrder.total.toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4">
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Items</p>
                  <p className="text-2xl font-bold text-gray-800">{foundOrder.items.length}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-4">
                  <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{foundOrder.email}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-6 text-gray-800">Delivery Timeline</h3>
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="absolute left-2 top-2 bottom-2 w-1 bg-gray-200 rounded-full"></div>
                  {/* Animated Progress Bar */}
                  <div
                    className="absolute left-2 top-2 w-1 bg-gradient-to-b from-green-600 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      height: `${(foundOrder.tracking.filter((t) => t.completed).length / foundOrder.tracking.length) * 100}%`,
                    }}
                  ></div>
                  
                  <div className="space-y-6">
                    {foundOrder.tracking.map((event, index) => (
                      <div
                        key={index}
                        className={`flex gap-4 items-start relative animate-slide-in-left`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative z-10">
                          <div
                            className={`w-5 h-5 rounded-full border-4 border-white shadow-md transition-all duration-300 ${
                              event.completed ? "bg-gradient-to-br from-green-500 to-blue-600 scale-110" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                          <p className={`font-semibold ${event.completed ? "text-gray-800" : "text-gray-400"}`}>
                            {event.stage}
                          </p>
                          {event.date && (
                            <p className="text-sm text-gray-500 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                          )}
                          {!event.completed && <p className="text-xs text-gray-400 mt-1">Pending</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Items in This Order</h3>
                <div className="space-y-3">
                  {foundOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg animate-slide-in-left"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Package size={20} className="text-gray-600" />
                      <p className="text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchId && email && !foundOrder && !isLoading && !error && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl animate-fade-in">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg font-medium">No order found</p>
              <p className="text-sm text-gray-500 mt-2">Please check your order ID and email, then try again</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.7s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
      <Footer />
    </>
  )
}
