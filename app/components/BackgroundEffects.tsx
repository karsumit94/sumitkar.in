import { useRef } from "react";
import { useParticles } from "../hooks/useParticles";

export function BackgroundEffects() {
  const particlesRef = useRef<HTMLDivElement>(null);
  useParticles(particlesRef);

  return (
    <>
      <div className="grid-bg"></div>
      <div className="noise"></div>
      <div className="scanline"></div>
      <div ref={particlesRef} className="particles absolute inset-0 pointer-events-none z-0" />
    </>
  );
}
