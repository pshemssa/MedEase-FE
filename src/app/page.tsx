"use client"

import { Shield, CheckCircle, MessageCircle, Stethoscope, Pill, Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import AccessDashboardButton from "@/components/AccessDashboardButton"
import ModalLoginGate from "@/components/ModalLoginGate"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen">
      
      <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl  text-gray-900">MedEase</h1>
              <p className="text-sm text-gray-600">Rwanda Digital Health</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/?auth=login" className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base transition-opacity duration-300`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              My Account
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-blue-400 fixed top-16 left-0 right-0 z-40 shadow-md">
            <div className="px-4 py-4 space-y-3">
              <div className="text-center mb-4">
                <h1 className="text-xl text-white">MedEase</h1>
                <p className="text-sm text-blue-100">Rwanda Digital Health</p>
              </div>
              <div className="flex justify-center">
                <Link href="/?auth=login" className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-blue-600 hover:bg-blue-50 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  My Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 md:py-24 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-sm ">Republic of Rwanda - Ministry of Health</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                Digital Medical <br />
                <span className="text-blue-600">Ordinance System</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                Secure, efficient, and connected healthcare for all Rwandans. Digital prescriptions, verified
                authenticity, and AI-powered medical support.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up animation-delay-400">
                <div className="transition-transform hover:-translate-y-0.5">
                  <AccessDashboardButton />
                </div>
                <button
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white shadow-lg focus:outline-none "
                    aria-label="watch-demo"
                >
                  <Clock className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-600">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">MOH Certified</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-left animation-delay-300">
              <Image
                src="/healthcare-image.png"
                alt="Medical professionals using digital system"
                width={600}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-2xl shadow-2xl w-full h-auto max-w-lg sm:max-w-xl md:max-w-2xl mx-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl  text-gray-900 mb-4">Complete Healthcare Digital Ecosystem</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Connecting doctors, patients, and pharmacists through our core features of the system and AI-powered
              medical assistance:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 scroll-animate">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl  text-gray-900 mb-3 text-center">Patient Portal</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto text-center">
                A centralized health profile with personal details, chronic conditions, allergies, and past treatments
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 mb-6">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl  text-gray-900 mb-3">Smart Prescription Writing</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto">
                Create digital prescriptions, diagnosis notes, allergy alerts, and patient history to improve accuracy and safety.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 mb-6">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl  text-gray-900 mb-3">Seamless QR Verification</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto">
                Verify prescriptions with a QR scanner and mark medications as dispensed.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="mx-auto w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 mb-6">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl  text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto">
                24/7 medical guidance, dosage info, and appointment scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-blue-500 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center scroll-animate">
          <h3 className="text-4xl text-white  mb-6">Ready To Get Started</h3>
          <p className="text-lg mb-10 opacity-95 text-white max-w-3xl mx-auto">
            Start your journey with paperless, secure medical prescriptions by joining thousands of doctors, patients,
            and pharmacists transforming healthcare in Rwanda
          </p>
          <div className="flex justify-center">
            <Link href="/register" className="inline-block w-full sm:w-auto">
              <Button className="bg-white  px-12 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg w-full sm:w-auto">
                <span className="text-blue-500 hover:text-white ">Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
          <div className="text-center mb-12 md:mb-20 scroll-animate">
            <h3 className="text-3xl md:text-4xl  text-gray-900">What We Do</h3>
          </div>
          <div className="relative">
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
              style={{ top: 0, left: 0 }}
            >

              <line x1="45%" y1="80" x2="50%" y2="80" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="80" x2="50%" y2="650" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="330" x2="55%" y2="330" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="650" x2="45%" y2="650" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
              <div className="space-y-32 scroll-animate">
              
                <div className="max-w-full sm:max-w-sm">
                  <h4 className="text-xl  text-blue-600 mb-4">Simplify Access to Medical Records</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Patients can securely access their historical medical records, including past diagnoses,
                    prescriptions, and treating doctors. A simple email + OTP verification process makes records
                    available on demand, supporting better follow-up care and transparency in treatment history
                  </p>
                </div>

                <div className="max-w-full sm:max-w-sm">
                  <h4 className="text-xl  text-blue-600 mb-4">Ensure Patient Safety</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    The system stores critical medical information such as allergies, chronic conditions, and past
                    prescriptions. Doctors and pharmacists have instant access to this data, helping them avoid harmful
                    drug interactions and ensuring patients receive safe, accurate treatment every time
                  </p>
                </div>
              </div>
              <div className="hidden lg:block"></div>
              <div className="flex items-center justify-end lg:pt-16 scroll-animate">
                <div className="max-w-full sm:max-w-sm">
                  <h4 className="text-xl  text-blue-600 mb-4">Enable Paperless Prescriptions</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    We provide a secure digital platform that replaces paper prescriptions. Doctors create prescriptions
                    directly in the system, patients instantly receive a reference number or QR code, and pharmacists
     can verify and dispense medicines without delays. This eliminates lost prescriptions, reduces costs,
                    and ensures treatment continuity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate">
          <h2 className="text-4xl md:text-5xl  text-blue-600 mb-6">Join Our Newsletter</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Sign to our NEWSLETTER and be first to know about any of our new features:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email here"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <footer className="bg-blue-500 text-white py-12">
        <div className="container mx-auto px-4 scroll-animate">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Some of our feature
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Get started
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> What we do
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> How it works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-green-400 text-xl  mb-4">Quick Links:</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/login" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Patient Portal
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Doctor Dashboard
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:underline flex items-center">
                    <span className="mr-2">›</span> Pharmacy Tool
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-green-400 text-xl  mb-4">Contact us:</h3>
              <div className="space-y-3">
                <p className="whitespace-nowrap">
                  <strong>Address:</strong> KN 3 Ave, 30 St Kigali - Rwanda
                </p>
                <p>
                  <strong>Phone:</strong> +250 788 195 705 
                </p>
                <p>
                  <strong>Email:</strong> medease@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-green-400 text-xl  mb-4">Follow us:</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-400 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© Copyright SheCanCODE. All Rights Reserved</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:underline">
                FAQ
              </a>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ModalLoginGate />
    </div>
  )
}
