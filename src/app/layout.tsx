import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Notetal - One Stop for notes",
  description: "Get notes about everything and anything at one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}