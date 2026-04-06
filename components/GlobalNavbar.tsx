"use client"

import Link from "next/link"

export default function GlobalNavbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a3e] rounded-full px-8 py-3 shadow-lg">
        <Link href="/" className="text-white font-bold text-xl mr-12 tracking-tight">
          Sam<span className="text-purple-500">.</span>
        </Link>

        <Link href="/" className="text-gray-300 hover:text-purple-500 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-base tracking-wide uppercase">Home</Link>
        <Link href="/about" className="text-gray-300 hover:text-purple-500 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-base tracking-wide uppercase">About</Link>
        <Link href="/projecten" className="text-gray-300 hover:text-purple-500 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-base tracking-wide uppercase">Projecten</Link>
        <Link href="/login" className="text-gray-300 hover:text-purple-500 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-base tracking-wide uppercase">Login</Link>
        <Link href="/admin-user" className="text-gray-300 hover:text-purple-500 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-base tracking-wide uppercase">Login User</Link>
        <Link href="/contact" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-colors text-base tracking-wide uppercase ml-2">Contact</Link>
        <Link href="/admin" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-colors text-base tracking-wide uppercase ml-1">Admin</Link>
      </nav>
    </div>
  )
}