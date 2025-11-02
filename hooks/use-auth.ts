"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name?: string
}

interface AuthStore {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, password) => {
        // Simulate API call
        if (!email || !password) throw new Error("Invalid credentials")
        set({
          user: {
            id: Math.random().toString(),
            email,
          },
        })
      },
      register: async (email, password) => {
        // Simulate API call
        if (!email || !password) throw new Error("Invalid input")
        set({
          user: {
            id: Math.random().toString(),
            email,
          },
        })
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" },
  ),
)
