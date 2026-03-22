export function Quote() {
  return (
    <section id="quote">
      <div className="quote-inner">
        <div className="quote-line"></div>
        <div className="quote-mark">&quot;</div>
        <blockquote id="mainQuote">
          Systems should <em>fail gracefully</em>.<br />
          Intelligence should <em>scale quietly</em>.
        </blockquote>
        <div className="quote-attr" style={{ marginTop: '24px' }}>— Sumit Kar · Staff Engineer · AI & Backend Systems</div>
      </div>
    </section>
  );
}
