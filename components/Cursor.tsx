"use client";

import React, { useEffect, useState } from "react";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Gebruik requestAnimationFrame voor soepelere beweging
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", e.clientX.toString());
        document.documentElement.style.setProperty("--mouse-y", e.clientY.toString());
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="cursor-container">
      <svg
        viewBox="0 0 100 100"
        className="cursor-vector"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0 L90 50 L45 55 L35 95 Z" />
      </svg>
    </div>
  );
}