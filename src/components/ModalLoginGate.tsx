"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export default function ModalLoginGate() {
  const params = useSearchParams()
  const showLogin = params.get("auth") === "login"

  useEffect(() => {
    if (showLogin) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [showLogin])

  if (!showLogin) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gray-900/90"></div>
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="relative">
          <Link
            href="/"
            className="absolute -top-3 -right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close login"
          >
            <span className="text-xl leading-none">&times;</span>
          </Link>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
