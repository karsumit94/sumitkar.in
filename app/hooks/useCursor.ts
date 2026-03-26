import { useEffect } from "react";

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animFrame: number;

    const cursorEl = document.getElementById('cursor');
    const ringEl = document.getElementById('cursor-ring');

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringEl) {
        ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animRing();

    // Hover effects
    const interactiveEls = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .skill-chip, .contact-link');
    const handleMouseEnter = () => {
      if (ringEl && cursorEl) {
        ringEl.style.width = '56px';
        ringEl.style.height = '56px';
        ringEl.style.borderColor = 'rgba(0,212,255,0.6)';
        cursorEl.style.background = 'var(--magenta)';
      }
    };
    const handleMouseLeave = () => {
      if (ringEl && cursorEl) {
        ringEl.style.width = '36px';
        ringEl.style.height = '36px';
        ringEl.style.borderColor = 'rgba(0,212,255,0.4)';
        cursorEl.style.background = 'var(--blue-glow)';
      }
    };

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(animFrame);
    };
  }, []);
}
