"use client";

import dynamic from "next/dynamic";

const CursorWrapper = dynamic(() => import("./Cursor"), { 
  ssr: false 
});

export default function ClientCursor() {
  return <CursorWrapper />;
}