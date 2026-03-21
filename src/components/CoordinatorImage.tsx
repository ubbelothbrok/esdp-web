"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function CoordinatorImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
        <User size={32} />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover bg-slate-50"
      onError={() => setError(true)}
    />
  );
}
