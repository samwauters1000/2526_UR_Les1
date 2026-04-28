"use client";

import React from "react";

const EXPERIENCE = [
  {
    role: "Digital & Graphic Media Student",
    company: "AP Hogeschool Antwerpen",
    period: "2024 - Present",
    desc: "Student at AP Hogeschool Antwerpen, where I am deepening my knowledge in graphic design and digital media. Here, I develop my skills in visual communication and creative concept development.",
  },
  {
    role: "Graphic Design Student",
    company: "Forum da Vinci",
    period: "2023 - 2024",
    desc: "My 7th specialization year at Forum da Vinci, focusing on graphic design, where I further developed my passion for design.",
  },
  {
    role: "Student",
    company: "Forum da Vinci",
    period: "2020 - 2023",
    desc: "My introduction to the graphic world began at Forum da Vinci, where I learned the basics of design and discovered my passion for visual communication.",
  },
];

export default function About() {
  return (
    /* px-4 on mobile matches the navbar outer wrapper exactly */
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 text-gray-300">
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <div>
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-accent font-bold bg-accent/15 border border-accent/30 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
              My Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-5 text-gray-200">
              Hi, I'm <span className="text-accent">Sam</span>. <br />
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-gray-400 max-w-[42ch]">
              I am a graphic designer student trying to learn the ins and outs of graphic design & interactive design. as a student designer, I am passionate about creating meaningful and engaging experiences that connect people. I am currently exploring the intersection of physical and digital design, aiming to create projects that enable users to interact with their environment in new, engaging, and efficient ways.
            </p>
          </div>

          <div className="relative">
            <div className="w-full aspect-[4/5] rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
              <img src="/images/profile.png" alt="Sam Wauters" className="h-full m-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-[24px] px-10 py-3 shadow-2xl">
              <p className="text-2xl font-bold leading-none mb-1 text-gray-200">AP</p>
              <p className="text-[10px] uppercase tracking-widest text-accent font-bold">University</p>
            </div>
          </div>
        </div>

        <hr className="border-border/40 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent font-bold mb-6">Skills & Focus</p>
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-gray-400">
                I am currently actively developing my skills in interactive design, with a focus on creating engaging user experiences. I am particularly interested in exploring how physical and digital elements can be combined to create innovative projects that allow users to interact with their environment in new ways.
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                Additionally, I am refining my ability and skill of using design tools such as Figma, Adobe Creative Cloud, and various prototyping software to bring my ideas to life. I am also learning to code in languages such as JavaScript and Next.js, which allows me to create more complex and interactive projects.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent font-bold mb-6">My Ambitions</p>
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-gray-400">
                My goal is to continue growing in interactive design.
                I want to create projects that connect the physical and digital worlds,
                such as interactive installations that let people look at their environment in a new way. but also projects that are more focused on the digital world, such as websites and apps that provide a unique user experience. I am eager to explore how design can be used to create meaningful and engaging experiences that connect people and enhance their interaction with the world around them.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-border/40 mb-10" />

        <ExperienceSection />
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <div className="py-20 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-accent/50" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-bold">Background</span>
        <div className="w-8 h-px bg-accent/50" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-gray-200 text-center">
        Experience & Education
      </h2>
      <div className="w-full max-w-3xl flex flex-col">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 border-b border-border/50 last:border-none group">
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-widest">{e.period}</p>
              <p className="text-gray-400 text-sm mt-1 font-medium">{e.company}</p>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{e.role}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}