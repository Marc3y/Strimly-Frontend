import type React from "react"
import { Navbar } from "@/components/navbar/navbar"
import { Link } from "@heroui/link"

export default function TtsLayout({
                                    children,
                                  }: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen bg-black">
      {children}
    </div>
  )
}
