"use client";

import { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      image: "/project1.jpg",
    },
    {
      id: 2,
      title: "Project 2",
      description:
        "Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem.",
      image: "/project2.jpg",
    },
    {
      id: 3,
      title: "Project 3",
      description:
        "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
      image: "/project3.jpg",
    },
    {
      id: 4,
      title: "Project 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      image: "/project4.jpg",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedProject.title || selectedProject.title.trim().length < 3) {
      newErrors.title = "Titel moet minstens 3 karakters bevatten.";
    }
    if (
      !selectedProject.description ||
      selectedProject.description.trim().length < 10
    ) {
      newErrors.description =
        "Beschrijving moet minstens 10 karakters bevatten.";
    }
    if (!selectedProject.image) {
      newErrors.image = "Afbeelding URL is verplicht.";
    } else if (!/^https?:\/\/.+|\/.+/.test(selectedProject.image)) {
      newErrors.image = "Voer een geldige URL of pad in.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProject.id ? selectedProject : project
      )
    );
    setEditMode(false);
    setSelectedProject(null);
    setErrors({});
  };

  return (
    <>
      <section className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="w-full max-w-6xl">
          {/* Survey Button */}
          <div className="flex justify-center mb-8 relative">
            <a
              href="https://forms.gle/your-survey-link-here"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition relative z-10"
            >
              Neem deel aan de enquête
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded py-1 px-3 whitespace-nowrap z-20 pointer-events-none">
                Deze enquête gaat over uw mening over de projecten.
              </span>
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
            Projecten
          </h1>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setEditMode(false);
                }}
                className="cursor-pointer bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">{project.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

            {/* Detail view */}
            {!editMode ? (
              <>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {selectedProject.description}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-6 py-2 rounded-xl bg-yellow-500 text-white hover:opacity-90 transition"
                    >
                      Bewerken
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setErrors({});
                      }}
                      className="px-6 py-2 rounded-xl bg-gray-600 text-white hover:opacity-90 transition"
                    >
                      Sluiten
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Edit Form */
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">Project Bewerken</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-6"
                >
                  {/* Title */}
                  <div>
                    <label className="block mb-2 font-medium">Titel</label>
                    <input
                      type="text"
                      name="title"
                      value={selectedProject.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-xl border transition ${
                        errors.title
                          ? "border-red-500 animate-pulse"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 ${
                        errors.title
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Beschrijving
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={selectedProject.description}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-xl border transition ${
                        errors.description
                          ? "border-red-500 animate-pulse"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 ${
                        errors.description
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Afbeelding URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={selectedProject.image}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-xl border transition ${
                        errors.image
                          ? "border-red-500 animate-pulse"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 ${
                        errors.image
                          ? "focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-green-600 text-white hover:opacity-90 transition"
                    >
                      Opslaan
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-6 py-2 rounded-xl bg-gray-500 text-white hover:opacity-90 transition"
                    >
                      Annuleren
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}