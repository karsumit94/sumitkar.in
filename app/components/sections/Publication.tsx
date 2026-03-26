import { SectionHeader } from "../ui/SectionHeader";

export function Publication() {
  return (
    <section id="books">
      <div className="layout-container section-frame publication-frame">
        <SectionHeader
          label="Published Work"
          title="Digital Bharat"
          accent="AI & Computing"
        />

        <div className="publication-grid">
          <a href="/books/digital-bharat" className="publication-cover-link">
            <div className="publication-cover-shell">
              <img
                src="/books/Digital-Bharat-Book-Front-Cover.jpg"
                alt="Digital Bharat book cover"
                className="publication-cover-image"
                width={1294}
                height={2000}
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>

          <div className="publication-copy">
            <p className="publication-text">
              A practical exploration of AI, computing, and the systems thinking
              required to build digital infrastructure that scales beyond demos.
            </p>
            <p className="publication-text">
              The book is available as an interactive flip-book reader on the
              site, as a downloadable PDF, and in physical edition via Amazon
              and Flipkart.
            </p>

            <div className="publication-actions">
              <a href="/books/digital-bharat" className="publication-action-primary">
                Open Reader
              </a>
              <a
                href="/books/Digital-Bharat.pdf"
                download
                className="publication-action-secondary"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
