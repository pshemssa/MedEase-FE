import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"

import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedEase - Medical Dashboard",
  description: "Comprehensive medical practice management system for doctors and healthcare professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}

      </body>
    </html>
  )
}
