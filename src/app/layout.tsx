import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"

import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Patient Dashboard | Secure Digital Health Information",
  description: "Empowering patients in Rwanda with secure, accessible healthcare technology",
  keywords: "healthcare, Rwanda, patient dashboard, medical records, digital health",

}

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
