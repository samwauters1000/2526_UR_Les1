"use client";

import dynamic from "next/dynamic";

// Dit dwingt Next.js om de Cursor-logica volledig te negeren tijdens de build
const CursorWrapper = dynamic(() => import("./Cursor"), { 
  ssr: false 
});

export default function ClientCursor() {
  return <CursorWrapper />;
}