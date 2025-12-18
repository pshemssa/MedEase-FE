import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"

import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedEase | Digital Medical Ordinance System - Rwanda",
  description: "Secure, efficient, and connected healthcare for all Rwandans. Digital prescriptions, verified authenticity, and AI-powered medical support.",
  icons: {
    icon: "/favicon.ico",
  },
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
