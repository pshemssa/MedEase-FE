"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, User, Pill, Mail, Lock, Phone, Calendar, Shield } from "lucide-react"
import Link from "next/link"

type UserRole = "patient" | "pharmacist"

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth?: string
  gender?: string
  insuranceProvider?: string
  insuranceNumber?: string
  phone?: string
  licenseNumber?: string
  pharmacyName?: string
}

export default function Register() {
  const [userRole, setUserRole] = useState<UserRole>("patient")
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    insuranceProvider: "",
    insuranceNumber: "",
    phone: "",
    licenseNumber: "",
    pharmacyName: "",
  })
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationFormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (userRole === "patient") {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required"
      }
      if (!formData.gender) {
        newErrors.gender = "Please select your gender"
      }
      if (!formData.insuranceProvider) {
        newErrors.insuranceProvider = "Please select your insurance provider"
      }
      if (!formData.insuranceNumber?.trim()) {
        newErrors.insuranceNumber = "Insurance number is required"
      }
      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number is required"
      }
    }

    if (userRole === "pharmacist") {
      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number is required"
      }
      if (!formData.licenseNumber?.trim()) {
        newErrors.licenseNumber = "License number is required"
      }
      if (!formData.pharmacyName?.trim()) {
        newErrors.pharmacyName = "Pharmacy name is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const referenceNumber = `RW-${userRole.toUpperCase()}-${Date.now().toString().slice(-6)}`
      
      console.log("Registration submitted:", { 
        role: userRole, 
        referenceNumber,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      
    
    
      setErrorMessage("")
      
      if (userRole === "pharmacist") {
        setSuccessMessage(`Welcome, ${formData.firstName}! Your pharmacist registration has been submitted successfully for verification. Reference number: ${referenceNumber}. You will be notified once your credentials are verified.`)
      } else {
        setSuccessMessage(`Welcome, ${formData.firstName}! Your ${userRole} account has been created successfully. Your reference number is: ${referenceNumber}`)
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
        insuranceProvider: "",
        insuranceNumber: "",
        phone: "",
        licenseNumber: "",
        pharmacyName: "",
      })

      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      setErrorMessage("Registration failed. Please try again or contact support if the problem persists.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative transition-all duration-500 ${
      userRole === "patient" 
        ? "bg-gradient-to-br from-blue-50 to-blue-100" 
        : "bg-gradient-to-br from-green-50 to-green-100"
    }`}>
      
      <div className={`absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 blur-xl transition-all duration-500 ${
        userRole === "patient" ? "bg-blue-400" : "bg-green-400"
      }`}></div>
      <div className={`absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-15 blur-lg transition-all duration-500 ${
        userRole === "patient" ? "bg-blue-300" : "bg-green-300"
      }`}></div>
      <Card className={`w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl relative z-10 transition-all duration-500 ${
        userRole === "patient" 
          ? "bg-white shadow-2xl border border-blue-200" 
          : "bg-white shadow-2xl border border-green-200"
      }`}>
        <CardHeader className={`space-y-2 p-4 sm:p-6 ${
          userRole === "patient" 
            ? "bg-blue-50/50" 
            : "bg-green-50/50"
        }`}>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <UserPlus className="h-6 w-6" />
          Create Account
        </CardTitle>
          <CardDescription className={`text-base transition-colors duration-500 ${
            userRole === "patient" ? "text-blue-600" : "text-green-600"
          }`}>Begin your journey to better health and wellness with our trusted community</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <Tabs value={userRole} onValueChange={(value) => setUserRole(value as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-5 mb-6">
              <TabsTrigger value="patient" className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="pharmacist" className="text-base flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Pharmacist
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className={`space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-lg ${
            userRole === "patient" ? "bg-blue-50 border border-blue-200" : "bg-green-50 border border-green-200"
          }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={errors.firstName ? "border-red-500" : ""}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && <p id="firstName-error" className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={errors.lastName ? "border-red-500" : ""}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && <p id="lastName-error" className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="judith@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.email ? "border-red-500" : ""}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {userRole === "patient" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth || ""}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                      aria-invalid={!!errors.dateOfBirth}
                      aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
                    />
                    {errors.dateOfBirth && <p id="dateOfBirth-error" className="text-xs text-red-500">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        Gender
                      </Label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleSelectChange}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.gender}
                        aria-describedby={errors.gender ? "gender-error" : undefined}
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p id="gender-error" className="text-xs text-red-500">{errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patientPhone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="patientPhone"
                        name="phone"
                        type="tel"
                        placeholder="+250 788 123 456"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={errors.phone ? "border-red-500" : ""}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && <p id="phone-error" className="text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider" className="text-sm font-medium flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Insurance Provider
                    </Label>
                    <select
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider || ""}
                      onChange={handleSelectChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.insuranceProvider}
                      aria-describedby={errors.insuranceProvider ? "insurance-error" : undefined}
                      className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.insuranceProvider ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Insurance Provider</option>
                      <option value="RSSB">RSSB - Community Based Health Insurance</option>
                      <option value="MMI">MMI - Medical Insurance</option>
                      <option value="RAMA">RAMA - Rwanda Military Medical Insurance</option>
                      <option value="Private">Private Insurance</option>
                      <option value="None">No Insurance</option>
                    </select>
                    {errors.insuranceProvider && <p id="insurance-error" className="text-xs text-red-500">{errors.insuranceProvider}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber" className="text-sm font-medium">
                      Insurance Number
                    </Label>
                    <Input
                      id="insuranceNumber"
                      name="insuranceNumber"
                      placeholder="Enter insurance number"
                      value={formData.insuranceNumber || ""}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={errors.insuranceNumber ? "border-red-500" : ""}
                      aria-invalid={!!errors.insuranceNumber}
                      aria-describedby={errors.insuranceNumber ? "insuranceNumber-error" : undefined}
                    />
                    {errors.insuranceNumber && <p id="insuranceNumber-error" className="text-xs text-red-500">{errors.insuranceNumber}</p>}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.password ? "border-red-500" : ""}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && <p id="password-error" className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                {errors.confirmPassword && <p id="confirmPassword-error" className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              {userRole === "pharmacist" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacistPhone" className="text-sm font-medium flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="pharmacistPhone"
                      name="phone"
                      type="tel"
                      placeholder="+250 788 123 456"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={errors.phone ? "border-red-500" : ""}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "pharmacistPhone-error" : undefined}
                    />
                    {errors.phone && <p id="pharmacistPhone-error" className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-sm font-medium flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      License Number
                    </Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      placeholder="RW-PHARM-123456"
                      value={formData.licenseNumber || ""}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={errors.licenseNumber ? "border-red-500" : ""}
                      aria-invalid={!!errors.licenseNumber}
                      aria-describedby={errors.licenseNumber ? "licenseNumber-error" : undefined}
                    />
                    {errors.licenseNumber && <p id="licenseNumber-error" className="text-xs text-red-500">{errors.licenseNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pharmacyName" className="text-sm font-medium">
                      Pharmacy Name
                    </Label>
                    <Input
                      id="pharmacyName"
                      name="pharmacyName"
                      placeholder="e.g., City Center Pharmacy"
                      value={formData.pharmacyName || ""}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={errors.pharmacyName ? "border-red-500" : ""}
                      aria-invalid={!!errors.pharmacyName}
                      aria-describedby={errors.pharmacyName ? "pharmacyName-error" : undefined}
                    />
                    {errors.pharmacyName && <p id="pharmacyName-error" className="text-xs text-red-500">{errors.pharmacyName}</p>}
                  </div>

                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      <strong>Note:</strong> Your registration will be submitted for verification. You will be notified once your professional credentials are verified and your account is activated.
                    </p>
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-2 sm:py-3 text-sm sm:text-base text-white ${
                  userRole === "patient" 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-center text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}