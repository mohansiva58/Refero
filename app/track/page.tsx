"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Package, Clock, CheckCircle, Truck } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
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
]

export default function TrackPage() {
  const [searchId, setSearchId] = useState("")
  const [foundOrder, setFoundOrder] = useState<(typeof mockOrders)[0] | null>(null)

  const handleSearch = () => {
    const order = mockOrders.find((o) => o.id === searchId)
    setFoundOrder(order || null)
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

  return (
    <>
      <Navbar />
      <main className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>

          {/* Search Section */}
          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <p className="text-gray-600 mb-4">Enter your order ID to track your shipment</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., ORD-001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleSearch}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
              >
                Track
              </button>
            </div>
          </div>

          {/* Demo Order */}
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-900">
              Demo: Try searching for order ID: <strong>ORD-001</strong>
            </p>
          </div>

          {/* Tracking Details */}
          {foundOrder && (
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                {getStatusIcon(foundOrder.status)}
                <div>
                  <h2 className="text-2xl font-bold">{foundOrder.id}</h2>
                  <p className="text-gray-600 capitalize">Status: {foundOrder.status}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold">{new Date(foundOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="font-semibold">₹{foundOrder.total.toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="font-semibold mb-6">Delivery Timeline</h3>
                <div className="space-y-4">
                  {foundOrder.tracking.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${event.completed ? "bg-green-600" : "bg-gray-300"}`} />
                        {index < foundOrder.tracking.length - 1 && (
                          <div className={`w-1 h-12 ${event.completed ? "bg-green-600" : "bg-gray-300"}`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`font-semibold ${event.completed ? "text-green-600" : "text-gray-500"}`}>
                          {event.stage}
                        </p>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Items in This Order</h3>
                <ul className="space-y-2">
                  {foundOrder.items.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {searchId && !foundOrder && (
            <div className="text-center py-12">
              <p className="text-gray-600">No order found with ID: {searchId}</p>
              <p className="text-sm text-gray-500 mt-2">Please check the order ID and try again</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
