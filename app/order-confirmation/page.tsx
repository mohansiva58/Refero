"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-600 mb-2">Order ID</p>
            <p className="text-2xl font-bold">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <p className="text-gray-600 mb-6">
            You will receive an email confirmation shortly. You can track your order using the Track Order page.
          </p>

          <div className="space-y-3">
            <Link
              href="/track"
              className="block w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
            >
              Track My Order
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-200 text-black py-3 rounded font-semibold hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
