"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  image: string
  longDescription: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A short description of what this project is about and what it does.",
    image: "/images/magazine.png",
    longDescription:
      "This is a longer description for Project One. Here you can explain the full scope of the project, what technologies were used, what challenges you faced, and what you learned from it. Replace this with your real content when you're ready.",
  },
  {
    id: 2,
    title: "Project Two",
    description: "A short description of what this project is about and what it does.",
    image: "/images/toneel.png",
    longDescription:
      "This is a longer description for Project Two. Here you can explain the full scope of the project, what technologies were used, what challenges you faced, and what you learned from it. Replace this with your real content when you're ready.",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A short description of what this project is about and what it does.",
    image: "/images/magazine.png",
    longDescription:
      "This is a longer description for Project Three. Here you can explain the full scope of the project, what technologies were used, what challenges you faced, and what you learned from it. Replace this with your real content when you're ready.",
  },
  {
    id: 4,
    title: "Project Four",
    description: "A short description of what this project is about and what it does.",
    image: "/images/toneel.png",
    longDescription:
      "This is a longer description for Project Four. Here you can explain the full scope of the project, what technologies were used, what challenges you faced, and what you learned from it. Replace this with your real content when you're ready.",
  },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-2">

      {/* Survey button */}
      <div className="max-w-4xl mx-auto mb-4 mt-4">
        <a
          href="YOUR_GOOGLE_FORM_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-2xl bg-card border border-border text-muted-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300 text-center"
        >
          Fill in our survey
        </a>
      </div>

      {/* Page title */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Projects</h1>
        <p className="text-muted-foreground text-lg">A selection of work I've done. Click a card to learn more.</p>
      </div>

      {/* 2x2 Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            style={{ borderRadius: "24px" }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer bg-card text-card-foreground shadow-lg border border-border hover:shadow-xl hover:border-primary transition-all duration-300 group overflow-hidden"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-foreground mb-2">{project.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              <span className="inline-block mt-4 text-primary text-sm font-medium group-hover:underline">
                View details →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed z-50 bg-card text-card-foreground shadow-2xl border border-border overflow-hidden"
              style={{ height: "90vh", left: "5%", right: "5%", bottom: "2%", borderRadius: "24px" }}
            >
              {/* Drag handle visual */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground opacity-40" />
              </div>

              {/* Close button top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-foreground transition-colors z-10"
              >
                <X size={22} />
              </button>
{/* Scrollable content inside sheet */}
<div className="overflow-y-auto h-full pb-20">
  {/* Big image */}
  <img
    src={selectedProject.image}
    alt={selectedProject.title}
    className="w-full h-[500px] object-contain"
  />

                {/* Text content */}
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-foreground mb-3">{selectedProject.title}</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-8">
                    {selectedProject.longDescription}
                  </p>

                  {/* Close button at bottom */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-fit px-6 py-2 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
