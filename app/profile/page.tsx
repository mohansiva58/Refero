"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { Mail, Phone, MapPin, LogOut, Edit2 } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Login</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
            <Link
              href="/login"
              className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Go to Login
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically make an API call to save the profile data
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                  <h2 className="text-xl font-bold">{profileData.fullName || user.email}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <Link href="/profile" className="block px-4 py-2 bg-black text-white rounded text-sm font-semibold">
                    My Profile
                  </Link>
                  <Link
                    href="/track"
                    className="block px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-100"
                  >
                    Track Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-sm font-semibold text-black hover:underline"
                  >
                    <Edit2 size={16} /> {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border border-gray-300 rounded ${
                          isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Mail size={16} /> Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Phone size={16} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="+91"
                        className={`w-full px-4 py-2 border border-gray-300 rounded ${
                          isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <MapPin size={16} /> Full Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Street address"
                      className={`w-full px-4 py-2 border border-gray-300 rounded ${
                        isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border border-gray-300 rounded ${
                          isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border border-gray-300 rounded ${
                          isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={profileData.pincode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border border-gray-300 rounded ${
                          isEditing ? "focus:outline-none focus:ring-2 focus:ring-black" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
              )}

              {/* Recent Orders */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                <p className="text-gray-600 text-center py-8">No orders yet. Start shopping now!</p>
                <Link
                  href="/shop"
                  className="block w-full bg-gray-100 text-center py-3 rounded font-semibold hover:bg-gray-200 transition"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
