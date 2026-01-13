"use client"

import { useRouter } from "next/navigation"
import { QrCode } from "lucide-react"
import React from "react"

export default function AccessDashboardButton() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Basic client-side auth/role detection
    // Checks for common keys; adjust to your auth implementation
    const token = typeof window !== "undefined" ? (localStorage.getItem("authToken") || localStorage.getItem("token")) : null
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null

    if (!token) {
      router.push("/register")
      return
    }

    if (role === "doctor") {
      router.push("/doctorDashboard")
      return
    }

    if (role === "patient") {
      router.push("/dashboard?role=patient")
      return
    }

    if (role === "pharmacist") {
      router.push("/dashboard?role=pharmacist")
      return
    }

    // fallback to register if role or routes not available
    router.push("/register")
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white shadow-lg focus:outline-none"
      aria-label="Access dashboard"
    >
      <QrCode className="w-5 h-5" />
      Access Dashboard
    </button>
  )
}
