"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Brand Identity — Studio Lux",
    image: "/images/studio-lux.jpg",
    description:
      "Full visual identity for a boutique interior design studio. Logotype, typography system, colour palette, and brand guidelines delivered across print and digital.",
  },
  {
    title: "Web Design — Bloom App",
    image: "/images/bloom-app.jpg",
    description:
      "Landing page and onboarding UI for a wellness app. Focused on calm, approachable aesthetics with a strong conversion flow from hero to sign-up.",
  },
  {
    title: "Motion — Product Launch",
    image: "/images/product-launch.jpg",
    description:
      "Animated assets for a SaaS product launch — social reels, hero animations, and UI micro-interactions, all built around a single cohesive motion language.",
  },
  {
    title: "Packaging — Maré Cosmetics",
    image: "/images/mare-cosmetics.jpg",
    description:
      "Packaging design and brand refresh for a natural skincare line. Minimal forms, an earthy palette, and a focus on sustainable material choices throughout.",
  },
];

export default function ProjectsPage() {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean) as HTMLElement[];

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
            }, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">

      {/* Title */}
      <h1
        ref={(el) => { itemsRef.current[0] = el; }}
        className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-5xl font-light tracking-tight"
      >
        Projects
      </h1>

      {/* Projects */}
      <div className="max-w-4xl mx-auto px-6 pb-32 flex flex-col gap-24">
        {projects.map((project, i) => {
          const reversed = i % 2 !== 0;
          return (
            <article
              key={project.title}
              ref={(el) => { itemsRef.current[i + 1] = el; }}
            >
              {/* Project title */}
              <h2 className="text-2xl font-medium mb-5">{project.title}</h2>

              {/* Image + description side by side */}
              <div className={`flex gap-8 items-center ${reversed ? "flex-row-reverse" : "flex-row"}`}>
                <div className="overflow-hidden rounded-xl w-1/2 aspect-video flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.015]"
                  />
                </div>
                <p className="w-1/2 leading-relaxed">{project.description}</p>
              </div>
            </article>
          );
        })}
      </div>

    </main>
  );
}