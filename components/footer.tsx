"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
            <p className="text-gray-600">Subscribe to our newsletter for exclusive offers</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
              Subscribe
            </button>
          </form>
          {subscribed && <p className="text-green-600 text-sm">Thanks for subscribing!</p>}
        </div>
      </section>

      {/* Footer Content */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black transition">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Chat with Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Work for Rare
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/profile" className="hover:text-black transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Returns / Exchange
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-black transition">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Store locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Themes */}
          <div>
            <h4 className="font-bold mb-4">Our Themes</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>All Rights Reserved The House Of Rare © 2025</p>
        </div>
      </div>
    </footer>
  )
}
