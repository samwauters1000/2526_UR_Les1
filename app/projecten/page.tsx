"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ACCENT = "#a855f7"; // 🎨 Verander hier je accentkleur

// ─── PDF Viewer Component ───────────────────────────────────────────────────
function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* PDF pagina */}
      <div className="overflow-auto rounded-xl w-full flex justify-center" style={{ maxHeight: "340px" }}>
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="w-full aspect-video flex items-center justify-center rounded-xl bg-white/5 text-white/40 text-sm">
              PDF laden…
            </div>
          }
          error={
            <div className="w-full aspect-video flex items-center justify-center rounded-xl bg-white/5 text-white/40 text-sm">
              Kon PDF niet laden
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={380}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* Navigatie */}
      {numPages > 1 && (
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
            style={{ backgroundColor: ACCENT }}
          >
            ‹
          </button>
          <span className="text-sm text-white/60">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
            style={{ backgroundColor: ACCENT }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Project types ──────────────────────────────────────────────────────────
type ImageProject = {
  title: string;
  type?: "image";
  image: string;
  description: string;
};

type PDFProject = {
  title: string;
  type: "pdf";
  pdf: string;
  description: string;
};

type Project = ImageProject | PDFProject;

// ─── Projects data ──────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "Magazine Design — School Project",
    type: "pdf",
    pdf: "/docs/magazine.pdf", // 👈 Zet jouw PDF in /public/docs/magazine.pdf
    description:
      "Dit is de cover van het magazine dat ik heb gemaakt. Het is een tijdschrift dat zich richt op lifestyle, mode en meer met prachtige foto's en belangrijke onderwerpen voor mezelf. Zelf heb ik de cover ontworpen en de inhoud samengesteld, en het is een project waar ik erg trots op ben. Dit magazine is helemaal gebaseerd op mijn eigen stijl en interesses. Dit project is ook de eerste keer dat ik een magazine heb gemaakt en met InDesign heb gewerkt, en het was een geweldige ervaring om te leren hoe je een tijdschrift ontwerpt en samenstelt. Ik ben erg blij met het eindresultaat en ik hoop dat het anderen ook inspireert om hun eigen creativiteit te uiten.",
  },
  {
    title: "Affiche — Toneelstuk",
    type: "image",
    image: "/images/toneel.png",
    description:
      "Dit is een affiche, gemaakt als aankondiging voor een toneelstuk dat in 2023 op mijn middelbare school werd gespeeld. Deze opdracht kwam vanuit de school en werd samen met de rest van de klas uitgevoerd. Mijn affiche werd uiteindelijk gekozen door de directie. Het was een geweldige ervaring om mijn ontwerp te zien hangen in de school en het was een eer om mijn creativiteit te kunnen delen met mijn medestudenten en docenten.",
  },
  {
    title: "Infographic — School Project",
    type: "image",
    image: "/images/XX", // ⚠️ Vul hier de echte bestandsnaam in
    description:
      "Hier heb ik een infographic gemaakt als parodie over De Lijn en hun etiquette over het opstappen en afstappen van de bus. Deze opdracht kwam vanuit de school en was een leuke uitdaging om een humoristische draai te geven aan een alledaags onderwerp. Het onderwerp heb ik De Lijn gemaakt omdat ik elke dag onderweg naar school De Lijn pak en ik merk dat veel mensen zich niet aan de regels houden. Dus ik dacht dat het leuk zou zijn om een infographic te maken die op een grappige manier de regels benadrukt en hopelijk mensen aanmoedigt om zich eraan te houden.",
  },
  {
    title: "Brand Identity — Studio Lux",
    type: "image",
    image: "/images/studio-lux.jpg",
    description:
      "Full visual identity for a boutique interior design studio. Logotype, typography system, colour palette, and brand guidelines delivered across print and digital.",
  },
  {
    title: "Brand Identity — Lux",
    type: "image",
    image: "/images/XX", // ⚠️ Vul hier de echte bestandsnaam in
    description:
      "Full visual identity for a boutique interior design studio. Logotype, typography system, colour palette, and brand guidelines delivered across print and digital.",
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [overlayImage, setOverlayImage] = useState<{ src: string; alt: string } | null>(null);

  // Overlay sluiten met Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Achtergrond scrollen blokkeren als overlay open is
  useEffect(() => {
    document.body.style.overflow = overlayImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [overlayImage]);

  // Fade-in animatie bij scrollen
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

      {/* Foto overlay */}
      {overlayImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setOverlayImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOverlayImage(null)}
              className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center rounded-full text-white text-base font-medium z-10"
              style={{ backgroundColor: ACCENT }}
              aria-label="Sluiten"
            >
              ✕
            </button>
            <img
              src={overlayImage.src}
              alt={overlayImage.alt}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}

      {/* Paginatitel */}
      <h1
        ref={(el) => { itemsRef.current[0] = el; }}
        className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-5xl font-light tracking-tight"
      >
        Projects
      </h1>

      {/* Projectenlijst */}
      <div className="max-w-4xl mx-auto px-6 pb-32 flex flex-col gap-24">
        {projects.map((project, i) => {
          const reversed = i % 2 !== 0;
          return (
            <article
              key={i}
              ref={(el) => { itemsRef.current[i + 1] = el; }}
            >
              {/* Projecttitel in accentkleur */}
              <h2 className="text-2xl font-medium mb-5" style={{ color: ACCENT }}>
                {project.title}
              </h2>

              {/* Media en beschrijving naast elkaar, afwisselend gespiegeld */}
              <div className={`flex gap-8 items-center ${reversed ? "flex-row-reverse" : "flex-row"}`}>

                {/* PDF of afbeelding */}
                <div className="overflow-hidden rounded-xl w-1/2 flex-shrink-0">
                  {project.type === "pdf" ? (
                    // ── Scrollbare PDF viewer ──
                    <PDFViewer file={project.pdf} />
                  ) : (
                    // ── Normale afbeelding ──
                    <div
                      className="aspect-video cursor-zoom-in"
                      onClick={() =>
                        setOverlayImage({ src: project.image, alt: project.title })
                      }
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.015]"
                      />
                    </div>
                  )}
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