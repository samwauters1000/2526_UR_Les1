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

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setIsHoveringNav(true)
  }

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHoveringNav(false), 200)
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const showSecondary = isAtTop || isHoveringNav

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-[#1a1a2e]/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <nav className="flex flex-col items-center gap-6">
            <Link href="/" onClick={(e) => handleNavLinkClick(e, "/")} className="text-[#E8ECED] text-2xl font-medium uppercase tracking-widest">Home</Link>
            <Link href="/about" onClick={(e) => handleNavLinkClick(e, "/about")} className="text-[#E8ECED] text-2xl font-medium uppercase tracking-widest">About</Link>
            <Link href="/projecten" onClick={(e) => handleNavLinkClick(e, "/projecten")} className="text-[#E8ECED] text-2xl font-medium uppercase tracking-widest">Projecten</Link>
            <Link href="/contact" onClick={(e) => handleNavLinkClick(e, "/contact")} className="bg-[#7217E8] text-[#E8ECED] px-8 py-3 rounded-full text-lg uppercase font-bold">Contact</Link>
          </nav>
          
          <div className="w-12 h-[1px] bg-[#3A3D50]" />

          <nav className="flex flex-col items-center gap-4">
            <Link href="/login" onClick={(e) => handleNavLinkClick(e, "/login")} className="text-[#E8ECED]/50 text-sm uppercase">Login</Link>
            <Link href="/admin" onClick={(e) => handleNavLinkClick(e, "/admin")} className="text-[#E63946] text-sm uppercase font-bold border border-[#E63946]/30 px-4 py-1 rounded-full">Admin</Link>
          </nav>
        </div>
      </div>

      <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center px-4 md:px-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-8 py-2 shadow-lg w-auto">
          <Link href="/" onClick={(e) => handleNavLinkClick(e, "/")} className="text-[#E8ECED] font-bold text-xl mr-12 tracking-tight">Sam<span className="text-[#7217E8]">.</span></Link>
          <Link href="/" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Home</Link>
          <Link href="/about" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">About</Link>
          <Link href="/projecten" className="text-[#E8ECED]/70 hover:text-[#7217E8] px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide uppercase">Projecten</Link>
          <Link href="/contact" className="bg-[#7217E8] hover:bg-[#5e12c4] text-[#E8ECED] px-5 py-2 rounded-full transition-colors text-sm tracking-wide uppercase ml-2">Contact</Link>
        </nav>

        {/* Secondary Nav (Desktop Only) */}
        <div className="hidden md:flex absolute right-4 lg:right-10 items-center transition-all duration-300" style={{ opacity: showSecondary ? 1 : 0, pointerEvents: showSecondary ? "auto" : "none", transform: showSecondary ? "translateX(0)" : "translateX(15px)" }}>
          <nav className="flex items-center gap-1 bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-6 py-2 shadow-inner">
            <Link href="/login" className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">Login</Link>
            <Link href="/myprofile" className="text-[#E8ECED]/40 hover:text-[#E8ECED]/70 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-xs tracking-wide uppercase">Profile</Link>
            <Link href="/admin" className="bg-[#E63946] hover:bg-[#c42d38] text-[#E8ECED] px-4 py-1.5 rounded-full transition-colors text-xs tracking-wide uppercase ml-1">Admin</Link>
          </nav>
        </div>

        {/* Mobile Toggle Bar */}
        <div className="flex md:hidden items-center justify-between bg-[#1a1a2e] border border-[#3A3D50] rounded-full px-5 py-2.5 shadow-lg w-full max-w-[90vw] z-[70]">
          <Link href="/" onClick={(e) => handleNavLinkClick(e, "/")} className="text-[#E8ECED] font-bold text-xl tracking-tight">
            Sam<span className="text-[#7217E8]">.</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#E8ECED] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
    </>
  )
}