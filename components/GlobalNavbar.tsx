"use client"

import { useState } from "react"
import Link from "next/link"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Hamburger button — uses CSS variables so it's always visible */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* SidebarSlider */}
      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <nav className="flex flex-col space-y-2">
          <Link href="/" className="text-foreground hover:text-primary hover:underline py-1">Home</Link>
          <Link href="/about" className="text-foreground hover:text-primary hover:underline py-1">About</Link>
          <Link href="/project-1" className="text-foreground hover:text-primary hover:underline py-1">Project 1</Link>
          <Link href="/project-2" className="text-foreground hover:text-primary hover:underline py-1">Project 2</Link>
          <Link href="/project-3" className="text-foreground hover:text-primary hover:underline py-1">Project 3</Link>
          <Link href="/review" className="text-foreground hover:text-primary hover:underline py-1">Review</Link>
          <Link href="/contact" className="text-foreground hover:text-primary hover:underline py-1">Contact</Link>
          <Link href="/login" className="text-foreground hover:text-primary hover:underline py-1">Login</Link>

          <Link
            href="/admin"
            className="bg-destructive text-primary-foreground px-4 py-2 rounded transition-colors duration-200 hover:opacity-80 mt-2"
          >
            Admin
          </Link>
          <Link href="/admin-user" className="text-foreground hover:text-primary hover:underline py-1">Login User</Link>
        </nav>
      </SidebarSlider>
    </>
  )
}
