"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

function InternalPDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderNav, setRenderNav] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(400);
  const containerRef = useRef<HTMLDivElement>(null);
  const [libraries, setLibraries] = useState<{ Document: any; Page: any } | null>(null);

  useEffect(() => {
    const loadLibs = async () => {
      const pdfLib = await import("react-pdf");
      const { pdfjs } = await import("react-pdf");
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      setLibraries({ Document: pdfLib.Document, Page: pdfLib.Page });
    };
    loadLibs();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.getBoundingClientRect().width);
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [libraries]);

  if (!libraries) return <div className="text-foreground/20 text-sm italic">Initializing...</div>;
  const { Document, Page } = libraries;

  return (
    <div className="flex flex-col items-center w-full bg-transparent">
      <div ref={containerRef} className="w-full flex justify-center overflow-hidden rounded-sm shadow-xl bg-white min-h-[300px]">
        <Document
          file={file}
          onLoadSuccess={({ numPages }: { numPages: number }) => { setNumPages(numPages); setRenderNav(true); }}
          loading={<div className="py-20 text-black/20 italic">Loading page...</div>}
          className="flex items-center justify-center"
        >
          <Page pageNumber={pageNumber} width={containerWidth} renderTextLayer={false} renderAnnotationLayer={false} canvasBackground="white" />
        </Document>
      </div>
      {renderNav && numPages > 1 && (
        <div className="flex items-center gap-6 mt-4 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
          <button type="button" onClick={(e) => { e.preventDefault(); setPageNumber((p) => Math.max(p - 1, 1)); }} disabled={pageNumber <= 1} className="text-foreground disabled:opacity-10 text-2xl p-2 hover:text-primary transition-colors">‹</button>
          <span className="text-[10px] tracking-widest text-foreground/40 uppercase font-bold">{pageNumber} / {numPages}</span>
          <button type="button" onClick={(e) => { e.preventDefault(); setPageNumber((p) => Math.min(p + 1, numPages)); }} disabled={pageNumber >= numPages} className="text-foreground disabled:opacity-10 text-2xl p-2 hover:text-primary transition-colors">›</button>
        </div>
      )}
    </div>
  );
}

const PDFViewer = dynamic(() => Promise.resolve(InternalPDFViewer), {
  ssr: false,
  loading: () => <div className="text-foreground/20 text-sm italic font-light tracking-widest">Loading PDF...</div>,
});

// Id's toegevoegd die matchen met de hashtags op de homepage
const projects = [
  {
    id: "magazine",
    title: "Magazine Design — School Project",
    type: "pdf",
    file: "/images/magazine.pdf",
    tag: "Self Magazine Project",
    description: "For this school project I designed a complete magazine from A to Z. From layout and typography to image selection and color palette — everything was carefully crafted to create a coherent and professional whole. this project was made in 2023 so some of the content is in Dutch. The magazine covers various topics related to design, culture and lifestyle based on my interests, and was created using Adobe InDesign.",
  },
  {
    id: "theatre",
    title: "Poster — Theatre Play",
    type: "image",
    file: "/images/toneel.png",
    tag: "Graphic Poster Design",
    description: "A poster designed for a theatre production. The goal was to capture the atmosphere and emotion of the play in one powerful image. I experimented with typography, contrast and composition. this was made for a school project in 2024.",
  },
  {
    id: "infographic",
    title: "Infographic — De Lijn Etiquette",
    type: "image",
    file: "/images/infographic.png",
    tag: "Visual Narrative",
    description: "An infographic about the rules of conduct in De Lijn public transport. The challenge was translating dry regulations into a visually engaging story through illustrations and clear icons. this was also made to be a parody of the often confusing and sometimes contradictory rules of De Lijn, which is why I took some creative liberties with the content. This was made for a school project in 2026.",
  },
  {
    id: "studiolux",
    title: "In the works...",
    type: "image",
    file: "/images/comming-soon.jpg",
    tag: "In the works...",
    description: "This project is currently in development. More details will follow soon. Stay tuned for updates on this new work.",
  },
];

export default function ProjectsPage() {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const isPDF = overlay?.toLowerCase().endsWith(".pdf");

  useEffect(() => {
    setMounted(true);
  }, []);

  // GEFIXT: Luistert naar de URL-hash bij binnenkomst en scrollt soepel naar het juiste project
  useEffect(() => {
    if (!mounted) return;

    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wacht heel even tot Next.js de DOM stabiel heeft opgebouwd
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 200);
      }
    };

    handleScrollToHash();
  }, [mounted]);

  useEffect(() => {
    if (overlay) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [overlay]);

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
            target.style.transition = "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)";
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderOverlay = () => {
    if (!overlay || !mounted) return null;

    return createPortal(
      <div className="fixed inset-0 w-screen h-screen z-[99999] backdrop-blur-xl bg-black/60 flex items-center justify-center p-6 select-none overflow-hidden md:p-12">
        <div 
          className="absolute inset-0 w-full h-full cursor-zoom-out" 
          onClick={() => setOverlay(null)} 
        />
        <div className="relative z-10 max-w-[85vw] max-h-[85vh] flex items-center justify-center">
          <button 
            type="button"
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white text-xl md:text-2xl font-medium bg-accent/90 border border-accent/30 hover:bg-accent rounded-full transition-all duration-300 z-[100010] cursor-pointer shadow-2xl" 
            onClick={() => setOverlay(null)}
          >
            ✕
          </button>
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isPDF ? (
              <iframe 
                src={`${overlay}#view=FitH`} 
                className="w-[85vw] h-[85vh] rounded-md shadow-2xl bg-white border border-neutral-800" 
                title="PDF Preview" 
              />
            ) : (
              <img 
                src={overlay} 
                className="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain rounded-md shadow-2xl border border-neutral-800" 
                alt="Preview" 
              />
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <main className="min-h-screen text-foreground bg-background text-center md:text-left">
      
      {renderOverlay()}

      <div className="w-full max-w-[320px] mx-auto px-0 md:max-w-4xl md:px-6 pb-24 flex flex-col gap-16 md:gap-24">
        <header ref={(el) => { itemsRef.current[0] = el; }} className="opacity-0 translate-y-[20px] mb-4">
          <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Projects</h1>
        </header>

        {projects.map((project, i) => (
          <article
            key={i}
            id={project.id} // GEFIXT: id gekoppeld voor scroll-to-hash ondersteuning
            ref={(el) => { itemsRef.current[i + 1] = el; }}
            className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center opacity-0 translate-y-[20px] ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="w-full relative group flex justify-center md:block">
                {project.type === "pdf" ? (
                  <PDFViewer file={project.file} />
                ) : (
                  <div className="overflow-hidden rounded-sm shadow-xl bg-foreground/5 md:cursor-zoom-in inline-block md:w-full" onClick={() => setOverlay(project.file)}>
                    <img
                      src={project.file}
                      className="w-auto max-h-[220px] mx-auto object-contain transition-all duration-700 hover:scale-105"
                      alt={project.title}
                    />
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setOverlay(project.file)} 
                className="mt-6 flex items-center gap-4 group/btn mx-auto md:mx-0 h-4"
              >
                <div className="w-8 h-px bg-foreground/30 group-hover/btn:w-12 group-hover/btn:bg-primary transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 group-hover/btn:text-foreground transition-colors duration-500 font-bold leading-none inline-flex items-center">
                  {project.type === "pdf" ? "Navigate with arrows through PDF" : "Click for full view"}
                </span>
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-accent font-bold bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-3">{project.tag}</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-primary">{project.title}</h2>
              <p className="text-foreground/60 leading-relaxed font-light text-sm md:text-base">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}