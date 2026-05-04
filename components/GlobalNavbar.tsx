"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function GlobalNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isHoveringNav, setIsHoveringNav] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setIsHoveringNav(true)
  }

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHoveringNav(false)
    }, 0)
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const showSecondary = isAtTop || isHoveringNav

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center px-4 md:px-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── DESKTOP PRIMARY NAV ── */}
        <nav className="hidden md:flex items-center gap-2 bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-8 py-2 shadow-lg w-auto">
          <Link
            href="/"
            onClick={(e) => handleNavLinkClick(e, "/")}
            className="text-[#E8ECED] font-bold text-xl mr-12 tracking-tight"
          >
            Sam<span className="text-[#7217E8]">.</span>
          </Link>
          <Link href="/" onClick={(e) => handleNavLinkClick(e, "/")} className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Home</Link>
          <Link href="/about" onClick={(e) => handleNavLinkClick(e, "/about")} className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">About</Link>
          <Link href="/projecten" onClick={(e) => handleNavLinkClick(e, "/projecten")} className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Project's</Link>
          <Link href="/contact" onClick={(e) => handleNavLinkClick(e, "/contact")} className="bg-[#7217E8] hover:bg-[#5e12c4] text-[#E8ECED] px-5 py-2 rounded-full transition-colors text-sm tracking-wide uppercase ml-2">Contact</Link>
        </nav>

        {/* ── DESKTOP SECONDARY NAV ── */}
        <div
          className="hidden md:flex absolute right-4 lg:right-10 items-center transition-all duration-300"
          style={{
            opacity: showSecondary ? 1 : 0,
            pointerEvents: showSecondary ? "auto" : "none",
            transform: showSecondary ? "translateX(0)" : "translateX(15px)"
          }}
        >
          <nav className="flex items-center gap-1 bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-6 py-2 shadow-inner">
            <Link href="/login" onClick={(e) => handleNavLinkClick(e, "/login")} className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">Login</Link>
            <Link href="/myprofile" onClick={(e) => handleNavLinkClick(e, "/myprofile")} className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">My profile</Link>
            <Link href="/admin" onClick={(e) => handleNavLinkClick(e, "/admin")} className="bg-[#E63946] hover:bg-[#c42d38] text-[#E8ECED] px-4 py-1.5 rounded-full transition-colors text-xs tracking-wide uppercase ml-1">Admin</Link>
          </nav>
        </div>

        {/* ── MOBILE NAV ──
            max-w-[320px] maakt de nav smaller dan het scherm,
            waardoor de zijmarges automatisch groter worden via mx-auto (via justify-center op parent)
        */}
        <div className="flex md:hidden flex-col w-full max-w-[320px]">

          {/* Mobile toggle bar */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-6 py-3 shadow-lg cursor-pointer select-none"
          >
            <Link
              href="/"
              onClick={(e) => {
                e.stopPropagation()
                handleNavLinkClick(e, "/")
              }}
              className="text-[#E8ECED] font-bold text-xl tracking-tight z-10"
            >
              Sam<span className="text-[#7217E8]">.</span>
            </Link>

            <div className="flex flex-col gap-1.5 p-1">
              <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </div>

          {isOpen && (
            <div className="mt-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">

              {/* Block 1 — Navigation */}
              <div style={{ borderRadius: "1.5rem" }} className="bg-[#2A2D3A] border border-[#3A3D50] shadow-lg p-3 flex flex-col gap-1">
                <p className="text-[#E8ECED]/30 text-xs uppercase tracking-widest px-4 pt-1 pb-0.5">Navigation</p>
                <Link href="/" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Home</Link>
                <Link href="/about" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">About</Link>
                <Link href="/projecten" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Projects</Link>
                <Link href="/contact" className="bg-[#7217E8] hover:bg-[#5e12c4] text-[#E8ECED] px-4 py-2.5 rounded-full transition-colors text-sm tracking-wide uppercase text-center mt-1">Contact</Link>
              </div>

              {/* Mobile divider */}
              <div className="flex items-center gap-3 px-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#3A3D50]"></div>
                <span className="text-[#3A3D50] text-[9px] tracking-[0.2em] uppercase whitespace-nowrap">Admin area</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#3A3D50]"></div>
              </div>

              {/* Block 2 — Utility */}
              <div style={{ borderRadius: "1.5rem" }} className="bg-[#1a1a2e] border border-[#3A3D50] shadow-inner p-3 flex flex-col gap-1">
                <Link href="/login" className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-4 py-2 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">Login</Link>
                <Link href="/myprofile" className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-4 py-2 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">My Profile</Link>
                <Link href="/admin" className="bg-[#E63946] hover:bg-[#c42d38] text-[#E8ECED] px-4 py-2 rounded-full transition-colors text-xs tracking-wide uppercase text-center">Admin</Link>
              </div>

            </div>
          )}
        </div>

      </div>
    </>
  )
}