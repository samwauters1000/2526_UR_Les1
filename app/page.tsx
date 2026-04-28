"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

// ─── DATA (Exact dezelfde als op je projectenpagina) ────────────────
const PROJECTS = [
  { 
    title: "Magazine Design", 
    tag: "School Project", 
    image: "/images/magazine-thumb.jpg", 
    link: "/projecten" 
  },
  { 
    title: "Poster — Theatre Play", 
    tag: "Graphic Design", 
    image: "/images/toneel.png", 
    link: "/projecten" 
  },
  { 
    title: "Infographic", 
    tag: "Visual Narrative", 
    image: "/images/infographic.png", 
    link: "/projecten" 
  },
  { 
    title: "In the works...", 
    tag: "Studio Lux", 
    image: "/images/studio-lux.jpg", 
    link: "/projecten" 
  },
]

const EXPERIENCE = [
  { role: "Digital & Graphic Media Student", company: "AP University Antwerp", period: "2024 - Present", desc: "Student at AP University Antwerp, where I am immersing myself in graphic design and digital media." },
  { role: "Student", company: "Forum da Vinci", period: "2023 - 2024", desc: "My 7th specialization year at Forum da Vinci in the graphic design track." },
  { role: "Student", company: "Forum da Vinci", period: "2020 - 2023", desc: "My introduction to the graphic world began at Forum da Vinci." },
]

const wrapIndex = (i: number, n: number) => ((i % n) + n) % n;

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── CAROUSEL COMPONENTS ────────────────────────────────────────

function ProjectCard({ project, isActive, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full bg-card cursor-pointer overflow-hidden transition-all duration-500 ${
        isActive 
          ? "shadow-[0_8px_60px_rgba(114,23,232,0.3)] border-[#7217E8]/50 scale-100" 
          : "border-transparent opacity-40 scale-95 hover:opacity-70"
      }`}
      style={{ borderRadius: "1.25rem", border: "1px solid" }}
    >
      <div className="relative w-full h-full">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "grayscale-0 scale-105" : "grayscale"}`}
        />
        
        {/* De fade die de tekst leesbaar maakt */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent p-8 flex flex-col justify-end transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[#7217E8] text-[10px] uppercase tracking-widest font-bold mb-2">{project.tag}</p>
          <h3 className="text-white text-3xl font-bold leading-tight">{project.title}</h3>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-3">View Case Study →</p>
        </div>
      </div>
    </div>
  )
}

function MainCarousel() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  const { ref, visible } = useScrollReveal(0.1)
  const slots = [-2, -1, 0, 1, 2]

  const next = () => setCurrent((c) => wrapIndex(c + 1, PROJECTS.length))
  const prev = () => setCurrent((c) => wrapIndex(c - 1, PROJECTS.length))

  const handleCardClick = (idx: number) => {
    if (idx === current) {
      router.push(`/projecten`)
    } else {
      setCurrent(idx)
    }
  }

  return (
    <section 
      id="projects" 
      ref={ref} 
      className="py-20 flex flex-col items-center transition-all duration-700 relative z-10"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(60px)" }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-8 h-px bg-[#7217E8]" />
        <span className="text-xs uppercase tracking-widest text-[#7217E8] font-bold">Selected Work</span>
        <div className="w-8 h-px bg-[#7217E8]" />
      </div>
      <h2 className="font-extrabold tracking-tight mb-16 text-white text-center text-5xl" style={{ fontFamily: "var(--font-geist-sans)" }}>Projects</h2>

      <div className="relative w-full max-w-7xl flex items-center justify-center h-[500px] md:h-[600px]">
        <AnimatePresence initial={false}>
          {slots.map((slot) => {
            const idx = wrapIndex(current + slot, PROJECTS.length)
            const absSlot = Math.abs(slot)
            const isCenter = slot === 0

            return (
              <motion.div
                key={`${idx}-${slot}`}
                initial={false}
                animate={{
                  x: slot * (typeof window !== 'undefined' && window.innerWidth < 768 ? 170 : 340),
                  scale: 1 - absSlot * 0.18,
                  opacity: 1 - absSlot * 0.45,
                  zIndex: 10 - absSlot,
                  filter: `blur(${absSlot * 3}px)`,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute w-[300px] md:w-[400px] aspect-[4/5]"
                style={{ pointerEvents: absSlot > 1 ? "none" : "auto" }}
              >
                <ProjectCard 
                  project={PROJECTS[idx]} 
                  isActive={isCenter} 
                  onClick={() => handleCardClick(idx)}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-16 flex flex-col items-center gap-8 relative z-20">
        <div className="flex items-center gap-8">
          <button onClick={prev} className="w-14 h-14 rounded-full border-2 border-[#7217E8] text-[#7217E8] flex items-center justify-center hover:bg-[#7217E8] hover:text-white transition-all shadow-lg active:scale-90 text-2xl">←</button>
          <div className="flex gap-3">
            {PROJECTS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all duration-500 ${i === current ? "w-12 bg-[#7217E8]" : "w-2.5 bg-[#7217E8]/20"}`} />
            ))}
          </div>
          <button onClick={next} className="w-14 h-14 rounded-full border-2 border-[#7217E8] text-[#7217E8] flex items-center justify-center hover:bg-[#7217E8] hover:text-white transition-all shadow-lg active:scale-90 text-2xl">→</button>
        </div>
      </div>
    </section>
  )
}

// ─── HERO & ORIGINAL SECTIONS ───────────────────────────────────

function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row" style={{ minHeight: "calc(100vh - 120px)" }}>
      <div className="block md:hidden w-full relative overflow-hidden" style={{ height: "220px" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(30,32,44,0.25)", zIndex: 1 }} />
        <img src="/images/profile.png" alt="Profile" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "100%", width: "auto", objectFit: "contain", objectPosition: "bottom", zIndex: 2 }} />
      </div>
      <div className="hidden md:block" style={{ width: "40%", flexShrink: 0, position: "relative", backgroundImage: "url('/images/profile.png')", backgroundSize: "70%", backgroundPosition: "110% 30%", backgroundRepeat: "no-repeat" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(30,32,44,0.25)" }} />
      </div>
      <div className="relative flex flex-col justify-center px-4 py-12 md:pl-24 md:pr-12 xl:pl-100 xl:pr-20 overflow-hidden" style={{ flex: 1 }}>
        <span className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-extrabold leading-none" style={{ fontSize: "clamp(5rem, 18vw, 16rem)", fontFamily: "var(--font-geist-sans)", color: "rgba(114,23,232,0.04)" }} aria-hidden>SAM</span>
        <div className="relative z-10">
          <span className="inline-block mb-6 px-4 py-1 rounded-full text-xs uppercase tracking-widest text-[#7217E8] border border-[#7217E8]/20 bg-[#7217E8]/10 font-bold">Graphic Design Student</span>
          <h1 className="font-extrabold leading-[1.02] tracking-tight mb-6 text-white" style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", fontFamily: "var(--font-geist-sans)" }}>
            Hi, I&apos;m Sam <br /> <span className="text-[#7217E8]">Wauters.</span>
          </h1>
          <div className="w-16 h-1 bg-[#7217E8] rounded-full mb-6" />
          <p className="text-white/50 font-light text-base md:text-lg leading-relaxed max-w-sm mb-10 italic">Crafting visual identities and digital experiences that feel intentional, bold, and human.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#projects" className="px-7 py-3 rounded-full bg-[#7217E8] text-white font-medium text-sm hover:opacity-85 transition-opacity">View my work</Link>
            <Link href="/contact" className="px-7 py-3 rounded-full border border-white/10 text-white/70 font-normal text-sm hover:border-[#7217E8] hover:text-white transition-all">Get in touch</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const { ref, visible } = useScrollReveal()
  return (
    <section ref={ref} className="py-24 px-4 md:px-8 flex flex-col items-center transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)" }}>
      <h2 className="font-bold tracking-tight mb-14 text-white text-center text-4xl" style={{ fontFamily: "var(--font-geist-sans)" }}>Experience</h2>
      <div className="w-full max-w-3xl flex flex-col">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-8 border-b border-white/5 last:border-none">
            <div>
              <p className="text-[#7217E8]/60 text-xs font-bold uppercase tracking-wider">{e.period}</p>
              <p className="text-white/60 text-sm mt-1 font-medium">{e.company}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">{e.role}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1E202C] text-white selection:bg-[#7217E8]/30">
      <Hero />
      <MainCarousel />
      <Experience />
    </main>
  )
}