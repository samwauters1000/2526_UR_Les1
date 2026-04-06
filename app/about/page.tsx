"use client";

const skills = [
  { name: "Java", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Figma", category: "Design" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Git", category: "Tooling" },
];

const timeline = [
  {
    years: "2023 – nu",
    role: "Student Toegepaste Informatica",
    company: "AP Hogeschool Antwerpen",
    desc: "Focus op full-stack development, algoritmen en software architecture met Java en moderne webtechnologieën.",
  },
  {
    years: "2019 – 2023",
    role: "Grafische Vormgeving",
    company: "Forum da Vinci",
    desc: "Grondige opleiding in visuele identiteit, lay-out en design-denken. Hier legde ik de basis voor mijn oog voor detail.",
  },
];

export default function About() {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <div>
            <span className="inline-block text-[11px] tracking-widest uppercase text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-5">
              Mijn Verhaal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-5">
              Waar design <br />
              overgaat in <br />
              <span className="text-zinc-400 italic">code.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-400 max-w-[42ch]">
              Ik ben een developer met een achtergrond in grafisch ontwerp. 
              Na mijn tijd bij Forum da Vinci besloot ik de stap te zetten naar de 
              technische kant bij AP Hogeschool. Ik bouw digitale oplossingen die 
              zowel technisch sterk als visueel doordacht zijn.
            </p>
          </div>

          <div className="relative">
            {/* Zorg dat je een foto van jezelf in de public folder zet als 'sam.jpg' */}
            <div className="w-full aspect-[4/5] bg-zinc-900 rounded-[20px] border border-white/10 overflow-hidden">
               <img
                src="/sam.jpg" 
                alt="Sam Wauters"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#111] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-2xl font-medium leading-none mb-1 text-white">AP</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Hogeschool</p>
            </div>
          </div>
        </div>

        <hr className="border-white/5 mb-16" />

        {/* Skills Section */}
        <div className="mb-16">
          <p className="text-[11px] tracking-widest uppercase text-zinc-500 mb-6">
            Stack & Tools
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 hover:border-white/20 transition-colors"
              >
                <p className="text-sm font-medium text-zinc-200">{skill.name}</p>
                <p className="text-[10px] uppercase tracking-wide text-zinc-500 mt-0.5">
                  {skill.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/5 mb-16" />

        {/* Timeline Section */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-zinc-500 mb-8">
            Educatie & Ervaring
          </p>
          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <div key={i} className="grid grid-cols-[100px_1px_1fr] gap-x-8">
                <p className="text-[11px] text-zinc-500 pt-1 text-right font-mono">{item.years}</p>
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                  {i < timeline.length - 1 && (
                    <div className="flex-1 w-[1px] bg-white/10 my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <p className="text-md font-medium mb-0.5 text-white">{item.role}</p>
                  <p className="text-sm text-zinc-400 mb-3">{item.company}</p>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}