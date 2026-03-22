import { useEffect, type RefObject } from "react";

export function useParticles(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // Clear existing
      for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const x = Math.random() * 100, y = Math.random() * 100;
        const dur = 6 + Math.random() * 10;
        const drift = (Math.random() - 0.5) * 60;
        const colors = ['#00d4ff', '#ff2d9e', '#00ffd5', '#4f8eff'];
        const c = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `left:${x}%; top:${y}%; --dur:${dur}s; --drift:${drift}px; background:${c}; animation-delay:${Math.random() * -dur}s;`;
        containerRef.current.appendChild(p);
      }
    }
  }, [containerRef]);
}
