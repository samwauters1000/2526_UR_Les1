"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// --- PDF VIEWER COMPONENT ---
function InternalPDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderNav, setRenderNav] = useState(false);
  const [libraries, setLibraries] = useState<{
    Document: any;
    Page: any;
  } | null>(null);

  useEffect(() => {
    const loadLibs = async () => {
      const pdfLib = await import('react-pdf');
      const { pdfjs } = await import('react-pdf');
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      setLibraries({ Document: pdfLib.Document, Page: pdfLib.Page });
    };
    loadLibs();
  }, []);

  if (!libraries) return <div className="text-white/20 text-sm italic">Initializing...</div>;
  const { Document, Page } = libraries;

  return (
    <div className="flex flex-col items-center w-full bg-transparent">
      <div className="w-full flex justify-center overflow-hidden rounded-sm shadow-xl aspect-square bg-white/5">
        <Document
          file={file}
          onLoadSuccess={({ numPages }: { numPages: number }) => {
            setNumPages(numPages);
            setRenderNav(true);
          }}
          className="flex items-center justify-center"
        >
          <Page
            pageNumber={pageNumber}
            width={300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            canvasBackground="transparent"
          />
        </Document>
      </div>

      {renderNav && numPages > 1 && (
        <div className="flex items-center gap-6 mt-4 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setPageNumber((p) => Math.max(p - 1, 1)); }}
            disabled={pageNumber <= 1}
            className="text-white disabled:opacity-10 text-2xl p-2 hover:text-purple-400 transition-colors"
          >
            ‹
          </button>
          <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold">
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setPageNumber((p) => Math.min(p + 1, numPages)); }}
            disabled={pageNumber >= numPages}
            className="text-white disabled:opacity-10 text-2xl p-2 hover:text-purple-400 transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

const PDFViewer = dynamic(() => Promise.resolve(InternalPDFViewer), {
  ssr: false,
  loading: () => <div className="text-white/20 text-sm italic font-light tracking-widest">Loading PDF...</div>,
});

const ACCENT = "#a855f7";

const projects = [
  {
    title: "Magazine Design — School Project",
    type: "pdf",
    file: "/images/magazine.pdf",
    description: "This is the cover of a magazine I created. It is a publication focusing on lifestyle, fashion, and more, featuring impactful photography and subjects that are personally significant to me.",
  },
  {
    title: "Poster — Theatre Play",
    type: "image",
    file: "/images/toneel.png",
    description: "My design for a theatre play in 2023. The school administration chose this poster out of the entire class, which served as a wonderful recognition.",
  },
  {
    title: "Infographic — De Lijn Etiquette",
    type: "image",
    file: "/images/infographic.png",
    description: "A humorous infographic regarding public transport etiquette. A fun challenge to translate an everyday subject into a visual narrative.",
  },
  {
    title: "in the works... — sorry, can't say more yet!",
    type: "image",
    file: "/images/studio-lux.jpg",
    description: "More to come soon! This is a project i'm possible working on!",
  }
];

export default function ProjectsPage() {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [overlay, setOverlay] = useState<string | null>(null);

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean) as HTMLElement[];
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
          target.style.transition = "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
        }
      });
    }, { threshold: 0.1 });

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen text-white bg-[#1E202C]">
      
      {/* Overlay Modal */}
      {overlay && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
          onClick={() => setOverlay(null)}
        >
          <div className="relative max-w-[80vw] max-h-[70vh]">
            <img 
              src={overlay} 
              className="w-full h-full max-h-[70vh] object-contain shadow-2xl transition-transform duration-500" 
              alt="Preview" 
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-transform hover:scale-110 z-[110]"
              style={{ backgroundColor: ACCENT }}
              onClick={(e) => {
                e.stopPropagation();
                setOverlay(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col gap-40">
        <header ref={(el) => { itemsRef.current[0] = el; }}>
          <h1 className="text-6xl font-light tracking-tighter mb-4 text-gray-200">
            Projects
          </h1>
        </header>

        {projects.map((project, i) => (
          <article 
            key={i} 
            ref={(el) => { itemsRef.current[i + 1] = el; }}
            className={`flex flex-col md:flex-row gap-16 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* LINKER KOLOM: Foto + Click View Knop */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="w-full relative group">
                {project.type === "pdf" ? (
                  <div className="w-full">
                    <PDFViewer file={project.file} />
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-sm shadow-xl w-full aspect-square bg-white/5">
                    <img 
                      src={project.file} 
                      className="w-full h-full cursor-zoom-in grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105 object-cover"
                      onClick={() => setOverlay(project.file)}
                      alt={project.title}
                    />
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setOverlay(project.file)}
                className="mt-6 flex items-center gap-4 group/btn"
              >
                <div className="w-12 h-[1px] bg-gray-600 group-hover/btn:w-16 group-hover/btn:bg-purple-500 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover/btn:text-gray-300 transition-colors duration-500">
                  Click for full view
                </span>
              </button>
            </div>

            {/* RECHTER KOLOM: Tekst */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-medium mb-6" style={{ color: ACCENT }}>{project.title}</h2>
              <p className="text-gray-400 leading-relaxed font-light text-lg">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}