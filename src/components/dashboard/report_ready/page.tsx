"use client"

import Link from "next/link"
import { Download, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReportReady() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-600 mb-2">Requested Report is Ready!</h1>
          <div className="w-1 h-1 bg-pink-400 mx-auto"></div>
        </div>

        <Card className="border border-blue-500 bg-blue-50 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="3"/>
                <path d="M30 50 L45 65 L70 35" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-600">Verification successful</h2>
              <p className="text-slate-600 mt-1">You now have access to your complete medical records</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3 mb-8">
          <button className="w-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-4 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>

          <Button variant="outline" className="w-full py-6 text-base font-semibold border-slate-200 hover:bg-blue-600 bg-transparent">
            <FileText className="w-5 h-5 mr-2" />
            View Record Online
          </Button>
        </div>

        <div className="w-1 h-1 bg-pink-400 mx-auto mb-8"></div>

        <Link href="/dashboard" className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Return to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}
