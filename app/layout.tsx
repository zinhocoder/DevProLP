import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DevPro - Líder em Desenvolvimento e Soluções Digitais",
  description: "Transformamos ideias em código e impulsionamos seu negócio com a melhor tecnologia do mercado!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import "./globals.css"



import './globals.css'