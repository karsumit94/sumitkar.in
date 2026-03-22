import { useEffect } from "react";

export function useCursor() {
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let animFrame: number;

    const cursorEl = document.getElementById('cursor');
    const ringEl = document.getElementById('cursor-ring');

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorEl) {
        cursorEl.style.left = mx + 'px';
        cursorEl.style.top = my + 'px';
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringEl) {
        ringEl.style.left = rx + 'px';
        ringEl.style.top = ry + 'px';
      }
      animFrame = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animRing();

    // Hover effects
    const interactiveEls = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .skill-chip, .contact-link');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ringEl && cursorEl) {
          ringEl.style.width = '56px';
          ringEl.style.height = '56px';
          ringEl.style.borderColor = 'rgba(0,212,255,0.6)';
          cursorEl.style.background = 'var(--magenta)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (ringEl && cursorEl) {
          ringEl.style.width = '36px';
          ringEl.style.height = '36px';
          ringEl.style.borderColor = 'rgba(0,212,255,0.4)';
          cursorEl.style.background = 'var(--blue-glow)';
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);
}
