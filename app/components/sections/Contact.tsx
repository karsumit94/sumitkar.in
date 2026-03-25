interface ContactProps {
    onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export function Contact({ onNavClick }: ContactProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (onNavClick) {
        onNavClick(e, targetId);
    } else if (targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="section-label" style={{ justifyContent: 'center' }}>Signal Detected</div>
        <h2 className="contact-title">Let&apos;s<br /><span className="line2">Connect.</span></h2>
        <p className="contact-sub">Staff Engineer. System thinker. Always open to interesting problems.</p>
        <div className="contact-links">
          <a href="mailto:hello@sumitkar.in" className="contact-link" onClick={(e) => handleNavClick(e, 'mailto:hello@sumitkar.in')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            hello@sumitkar.in
          </a>
          <a href="https://www.linkedin.com/in/timusrak" target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
          <a href="https://www.sumitkar.in" target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
            sumitkar.in
          </a>
        </div>
      </div>
    </section>
  );
}
