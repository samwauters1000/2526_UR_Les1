"use client";

import { useState, useEffect } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const ENQUETE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6Zbr4UjxCMAC0wW04z_vCBKN1UoZxTnhGfGFLa8hGE9rQNQ/viewform?usp=sharing&ouid=100784256318759189473";

  const projectData = [
    {
      title: "Magazine",
      description: "Dit is de cover van het magazine dat ik heb gemaakt. Het is een tijdschrift dat zich richt op mode en lifestyle, met prachtige foto's en belangrijken onderwerpen voor mezelf. zelf heb ik de cover ontworpen en de inhoud samengesteld, en het is een project waar ik erg trots op ben. Dit magazine is helmaal gebasseerd op mijn eigen stijl en interesses.",
      image: "./images/magazine.png",
    },
    {
      title: "Project 2",
      description: "Praesent libero. Sed cursus ante dapibus diam.",
      image: "/project2.jpg",
    },
    {
      title: "Project 3",
      description: "Duis sagittis ipsum. Praesent mauris.",
      image: "/project3.jpg",
    },
    {
      title: "Project 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/project4.jpg",
    },
  ];

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimatingIn(true));
    });
  };

  const closeProject = () => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 200);
    setIsAnimatingIn(false);
    setTimeout(() => {
      setIsVisible(false);
      setSelectedProject(null);
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section className="min-h-screen flex justify-center px-4 pt-16">
        <div className="w-full max-w-6xl">

          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-extrabold">
              Projecten
            </h1>
            <a
              href={ENQUETE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#7217E8",
                color: "#E8ECED",
                padding: "10px 20px",
                borderRadius: "0.75rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(114,23,232,0.45)",
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
              onMouseDown={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.95)";
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Enquête
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {projectData.map((project, index) => (
              <div
                key={index}
                onClick={() => openProject(project)}
                className="cursor-pointer flex flex-col overflow-hidden hover:shadow-2xl transition"
                style={{
                  backgroundColor: "#2A2D3A",
                  borderRadius: "1.75rem",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2
                    className="text-2xl font-semibold mb-3"
                    style={{ color: "#E8ECED" }}
                  >
                    {project.title}
                  </h2>
                  <p style={{ color: "#a0a3b1" }}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isVisible && (
        <>
          <div
            onClick={closeProject}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              opacity: isAnimatingIn ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          <div
            className="fixed top-0 right-0 h-full z-50 overflow-y-auto flex flex-col"
            style={{
              width: "86%",
              backgroundColor: "#1E202C",
              borderRadius: "2rem 0 0 2rem",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
              transform: isAnimatingIn ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <div
              className="sticky top-0 z-10 px-8 py-6"
              style={{ backgroundColor: "#1E202C" }}
            >
              <button
                onClick={closeProject}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: isButtonPressed ? "#5a10c0" : "#7217E8",
                  color: "#E8ECED",
                  padding: "10px 18px",
                  borderRadius: "0.75rem",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  transform: isButtonPressed ? "scale(0.92)" : "scale(1)",
                  boxShadow: isButtonPressed
                    ? "0 1px 4px rgba(114,23,232,0.3)"
                    : "0 4px 14px rgba(114,23,232,0.45)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Terug
              </button>
            </div>

            {selectedProject && (
              <div className="flex flex-col px-8 pb-16">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full object-contain mb-10"
                  style={{
                    maxHeight: "500px",
                    borderRadius: "1.5rem",
                  }}
                />
                <h1
                  className="text-4xl font-bold mb-6"
                  style={{ color: "#E8ECED" }}
                >
                  {selectedProject.title}
                </h1>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#a0a3b1" }}
                >
                  {selectedProject.description}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}