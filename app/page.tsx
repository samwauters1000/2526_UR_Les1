"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Footer from "@/components/Footer"

/* -- SCROLL REVEAL HOOK -- */
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

/* -- HERO -- */
function Hero() {
  return (
    <section
      className="relative flex"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
    {/* LEFT: full-bleed image using CSS background */}
<div
  style={{
    width: "40%",
    flexShrink: 0,
    position: "relative",
    backgroundImage: "url('/images/profile.png')",
    backgroundSize: "70%",
    backgroundPosition: "110% 30%",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Dark overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "rgba(30,32,44,0.25)",
  }} />
  {/* Purple bar on top of image */}
  <div style={{
  position: "absolute",
  top: "50%",
  left: "-10%",
  width: "130%",
  height: "23%",
  background: "#7217E8",
  opacity: 0.5,
  zIndex: 2,
}} />
</div>

      {/* RIGHT: text content */}
      <div
        className="relative flex flex-col justify-center pl-24 pr-12 xl:pl-100 xl:pr-20 overflow-hidden"
        style={{ flex: 1 }}
      >
        {/* Ghost SAM watermark */}
        <span
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-extrabold leading-none"
          style={{
            fontSize: "clamp(8rem, 18vw, 16rem)",
            fontFamily: "var(--font-geist-sans)",
            color: "rgba(114,23,232,0.04)",
          }}
          aria-hidden
        >
          SAM
        </span>

        <div className="animate-fadeIn relative z-10">
          {/* Tag pill */}
          <span className="inline-block mb-8 px-4 py-1 rounded-full text-xs uppercase tracking-widest text-primary border border-primary/20 bg-primary/10">
            Graphic Design Student
          </span>

          {/* Heading */}
          <h1
            className="font-extrabold leading-[1.02] tracking-tight mb-6 text-foreground"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontFamily: "var(--font-geist-sans)" }}
          >
            Hi, I&apos;m Sam
            <br />
            <span className="text-primary">Wauters.</span>
          </h1>

          {/* Purple accent line */}
          <div className="w-16 h-1 bg-primary rounded-full mb-6" />

          {/* Subtitle */}
          <p className="text-foreground/50 font-light text-lg leading-relaxed max-w-sm mb-10">
            Crafting visual identities and digital experiences that feel intentional, bold, and human.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href="#projects"
              className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-85 transition-opacity"
            >
              View my work
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-full border border-border text-foreground/70 font-normal text-sm hover:border-primary hover:text-foreground transition-all"
            >
              Get in touch
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 text-foreground/30 text-xs uppercase tracking-widest">
            <div className="w-10 h-px bg-foreground/30" />
            Scroll to explore
          </div>
        </div>
      </div>

      {/* Purple glow blob */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-[#7217E8] opacity-[0.06] blur-[80px]" />
    </section>
  )
}

/* -- PROJECTS CAROUSEL -- */
const PROJECTS = [
  { title: "Project 1", href: "/project-1", tag: "Branding", year: "2024" },
  { title: "Project 2", href: "/project-2", tag: "UI Design", year: "2024" },
  { title: "Project 3", href: "/project-3", tag: "Typography", year: "2025" },
]

const CARD_STYLES: Record<number, { width: string; height: string; opacity: number; scale: string; blur: string }> = {
  0: { width: "420px", height: "480px", opacity: 1,    scale: "scale-100", blur: "" },
  1: { width: "280px", height: "360px", opacity: 0.55, scale: "scale-95",  blur: "" },
  2: { width: "180px", height: "260px", opacity: 0.25, scale: "scale-90",  blur: "blur-[1px]" },
}

function ProjectsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [arrowAnim, setArrowAnim] = useState<"prev" | "next" | null>(null)
  const router = useRouter()
  const total = PROJECTS.length
  const { ref, visible } = useScrollReveal(0.1)

  const triggerAnim = (dir: "prev" | "next") => {
    setArrowAnim(dir)
    setTimeout(() => setArrowAnim(null), 400)
  }

  const prev = () => { triggerAnim("prev"); setCurrent((c) => (c - 1 + total) % total) }
  const next = () => { triggerAnim("next"); setCurrent((c) => (c + 1) % total) }

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 4000)
    return () => clearInterval(timer)
  }, [paused, total])

  const indices = [
    (current - 2 + total) % total,
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
    (current + 2) % total,
  ]

  return (
    <div
      className="px-4 md:px-8 pb-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <section
        id="projects"
        ref={ref}
        className="py-16 px-4 flex flex-col items-center overflow-hidden transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(60px)",
        }}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="w-8 h-px bg-primary" />
          <span className="text-xs uppercase tracking-widest text-primary">Selected work</span>
          <div className="w-8 h-px bg-primary" />
        </div>

        <h2
          className="font-bold tracking-tight mb-12 text-foreground text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-geist-sans)" }}
        >
          Projects
        </h2>

        <div className="relative flex items-center justify-center w-full gap-4">
          <button
            onClick={prev}
            aria-label="Previous project"
            className={`absolute left-4 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-primary transition-colors text-lg shrink-0 ${arrowAnim === "prev" ? "arrow-anim-prev" : ""}`}
          >
            &#8592;
          </button>

          <div className="flex items-center justify-center gap-3 md:gap-4 w-full">
            {indices.map((idx, pos) => {
              const p = PROJECTS[idx]
              const distance = Math.abs(pos - 2) as 0 | 1 | 2
              const isActive = distance === 0
              const style = CARD_STYLES[distance]

              const handleClick = () => {
                if (isActive) router.push(p.href)
                else if (pos < 2) prev()
                else next()
              }

              return (
                <div
                  key={`${idx}-${pos}`}
                  onClick={handleClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleClick()}
                  className={`group bg-card overflow-hidden transition-all duration-500 shrink-0 cursor-pointer ${style.scale} ${style.blur} ${isActive ? "shadow-[0_0_60px_0px_rgba(114,23,232,0.2)]" : ""}`}
                  style={{ width: style.width, height: style.height, opacity: style.opacity, borderRadius: "1.5rem" }}
                >
                  <div className="relative w-full overflow-hidden" style={{ height: "75%" }}>
                    <div className="absolute inset-0 bg-secondary" />
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                    {isActive && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs uppercase tracking-widest">
                        {p.tag}
                      </div>
                    )}
                    <span className="absolute inset-0 flex items-center justify-center text-foreground/20 text-xs uppercase tracking-widest">
                      Preview
                    </span>
                  </div>

                  <div className="px-5 pt-4 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      {!isActive && <span className="text-xs text-primary uppercase tracking-widest">{p.tag}</span>}
                      <span className={`text-xs text-foreground/30 ${isActive ? "" : "ml-auto"}`}>{p.year}</span>
                    </div>
                    <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors ${isActive ? "text-xl" : "text-sm"}`}>
                      {p.title}
                    </h3>
                    {isActive && <p className="text-foreground/40 text-xs mt-1">Click to view &#8594;</p>}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={next}
            aria-label="Next project"
            className={`absolute right-4 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-primary transition-colors text-lg shrink-0 ${arrowAnim === "next" ? "arrow-anim-next" : ""}`}
          >
            &#8594;
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(false) }}
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6 h-2" : "bg-foreground/20 w-2 h-2"}`}
              />
            ))}
          </div>
          <div className="w-32 h-px bg-foreground/10 rounded-full overflow-hidden">
            <div
              key={current}
              className="h-full bg-primary rounded-full"
              style={{ animation: paused ? "none" : "progressBar 4s linear forwards" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

/* -- EXPERIENCE DATA -- */
const EXPERIENCE = [
  {
    role: "Digitaal & Grafische media Student",
    company: "AP Hogeschool Antwerpen",
    period: "2024 - Present",
    desc: "Student op AP Hogeschool Antwerpen, waar ik me verdiep in grafisch ontwerp en digitale media. Hier ontwikkel ik mijn vaardigheden in visuele communicatie en creatieve conceptontwikkeling.",
  },
  {
    role: "Student",
    company: "Forum da Vinci",
    period: "2023 - 2024",
    desc: "Mijn 7de specialisatiejaar aan Forum da Vinci, in de grafische richting, waar ik mijn passie voor design verder heb kunnen ontwikkelen.",
  },
  {
    role: "Student",
    company: "Forum da Vinci",
    period: "2020 - 2023",
    desc: "Mijn intro in de grafische wereld begon bij Forum da Vinci, waar ik de basis van design leerde en mijn passie voor visuele communicatie ontdekte.",
  },
];

function Experience() {
  const reveal = useScrollReveal();
  // Veiligheidscheck voor de scroll reveal
  const ref = reveal?.ref;
  const visible = reveal?.visible ?? true;

  return (
    <section
      ref={ref}
      className="py-28 px-8 flex flex-col items-center transition-all duration-700"
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? "translateY(0)" : "translateY(50px)" 
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary" />
        <span className="text-xs uppercase tracking-widest text-primary">Background</span>
        <div className="w-8 h-px bg-primary" />
      </div>

      <h2
        className="font-bold tracking-tight mb-14 text-foreground text-center"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-geist-sans)" }}
      >
        Experience
      </h2>

      <div className="w-full max-w-3xl flex flex-col">
        {EXPERIENCE.map((e, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-8 text-center md:text-left border-b border-foreground/5 last:border-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}
          >
            <div>
              {/* De paarse kleur met subtiele opacity */}
              <p className="text-purple-500/60 text-xs font-bold uppercase tracking-wider">
                {e.period}
              </p>
              <p className="text-foreground/60 text-sm mt-1 font-medium">{e.company}</p>
            </div>
            <div>
              <h3 className="text-foreground font-semibold text-lg mb-2">{e.role}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -- CONTACT -- */
function Contact() {
  const { ref, visible } = useScrollReveal()
  return (
    <section
      ref={ref}
      className="py-28 px-8 flex flex-col items-center text-center transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)" }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-primary" />
        <span className="text-xs uppercase tracking-widest text-primary">Let&apos;s talk</span>
        <div className="w-8 h-px bg-primary" />
      </div>

      <h2
        className="font-bold tracking-tight mb-6 text-foreground"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-geist-sans)" }}
      >
        Got a project in mind?
      </h2>
      <p className="text-foreground/50 text-lg leading-relaxed mb-10 max-w-md">
        I&apos;m always open to new collaborations, internships, or just a good design conversation.
      </p>
      <Link
        href="/contact"
        className="inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-85 transition-opacity"
      >
        Say hello &#8594;
      </Link>
    </section>
  )
}



/* -- PAGE -- */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProjectsCarousel />
      <Experience />
      <Contact />
    </main>
  )
}