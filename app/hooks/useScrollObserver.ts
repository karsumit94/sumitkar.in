import { useEffect } from "react";

export function useScrollObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target as HTMLElement;
          const delay = target.dataset.delay ? parseInt(target.dataset.delay) : 0;
          setTimeout(() => target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.stat-card').forEach((el, i) => { (el as HTMLElement).dataset.delay = (i * 100).toString(); obs.observe(el); });
    document.querySelectorAll('.timeline-item').forEach((el, i) => { (el as HTMLElement).dataset.delay = (i * 120).toString(); obs.observe(el); });
    document.querySelectorAll('.project-card').forEach((el, i) => { (el as HTMLElement).dataset.delay = (i * 100).toString(); obs.observe(el); });
    document.querySelectorAll('.ai-card').forEach((el, i) => { (el as HTMLElement).dataset.delay = (i * 120).toString(); obs.observe(el); });
    document.querySelectorAll('.metric-block').forEach((el, i) => { (el as HTMLElement).dataset.delay = (i * 150).toString(); obs.observe(el); });

    const neuralWrap = document.getElementById('neuralWrap');
    if (neuralWrap) obs.observe(neuralWrap);
    const mainQuote = document.getElementById('mainQuote');
    if (mainQuote) obs.observe(mainQuote);

    // Skill chips stagger
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.skill-chip').forEach((chip, i) => {
            setTimeout(() => chip.classList.add('visible'), i * 40);
          });
          skillObs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    const skillsSec = document.getElementById('skills');
    if (skillsSec) skillObs.observe(skillsSec);

    return () => {
      obs.disconnect();
      skillObs.disconnect();
    };
  }, []);
}
