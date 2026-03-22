import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    const handleScrollParallax = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll('.floating-badge').forEach((badge) => {
        const speed = parseFloat((badge as HTMLElement).dataset.speed || '0.5');
        const yPos = -(scrolled * speed);
        (badge as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener('scroll', handleScrollParallax);

    return () => {
      window.removeEventListener('scroll', handleScrollParallax);
    };
  }, []);
}
