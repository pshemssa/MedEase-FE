"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getAuthState, getRoleBasedRedirect } from "@/lib/auth-middleware"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string | string[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles,
  redirectTo 
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const { isAuthenticated, user } = getAuthState()

      if (!isAuthenticated || !user) {
        // Not authenticated, redirect to login
        router.push(redirectTo || '/login')
        return
      }

      // Check role-based access
      if (allowedRoles) {
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
        if (!roles.includes(user.role || '')) {
          // User doesn't have required role, redirect to their dashboard
          const redirectPath = getRoleBasedRedirect(user.role)
          router.push(redirectPath)
          return
        }
      }

      setIsAuthorized(true)
      setIsChecking(false)
    }

    checkAuth()
  }, [router, allowedRoles, redirectTo])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
