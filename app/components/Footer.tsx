export function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/images/SumitKar.in.png" alt="Sumit Kar" className="site-logo" style={{ height: '24px', marginBottom: '16px', opacity: 0.6 }} />
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} · Engineered with intent.</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '8px' }}>
        v1.0.0 · <span style={{ color: 'var(--cyan)' }}>SYSTEM ONLINE</span>
      </div>
    </footer>
  );
}
