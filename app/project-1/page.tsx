"use client";

import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <>
      <section className="min-h-screen flex justify-center px-4 pt-16">
        <div className="w-full max-w-6xl">

          <h1 className="text-4xl font-extrabold mb-12 text-center">
            Projecten
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {projectData.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer flex flex-col bg-card rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProject(null);
            }
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6"
        >
          <div className="bg-background w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-[400px] object-cover"
            />

            <div className="p-10">
              <h2 className="text-4xl font-bold mb-6">
                {selectedProject.title}
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                {selectedProject.description}
              </p>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground"
              >
                Sluiten
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}