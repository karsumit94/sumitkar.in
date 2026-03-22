import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');
  const intersectionMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px', // Target the upper-middle of the screen
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        intersectionMap.current.set(`#${entry.target.id}`, entry.intersectionRatio);
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostActive = '';

      intersectionMap.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostActive = id;
        }
      });

      if (mostActive) {
        setActiveSection(mostActive);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
