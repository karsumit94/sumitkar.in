import { Button } from "../ui/Button";

const HERO_NAME_STYLE = {
  fontFamily: "var(--font-display)",
  background:
    "linear-gradient(135deg, #fff 0%, #a8c8ff 40%, var(--blue-glow) 70%, var(--magenta) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 800,
  letterSpacing: "-0.04em",
} as const;

export function Hero() {
  return (
    <section id="hero-new" className="hero-section">
      <h1 className="sr-only">
        Sumit Kar | Staff Engineer for AI Systems and Backend Scale
      </h1>
      <div className="hero-mobile-stage md:hidden">
        <div className="hero-mobile-stars" />
        <div className="hero-mobile-copy">
          <div className="mb-2">
            <span className="hero-mono-tag">
              {"// Staff Engineer · AI Systems Architect"}
            </span>
          </div>
          <p
            style={{
              ...HERO_NAME_STYLE,
              lineHeight: 0.9,
              fontSize: "clamp(2.75rem, 10vw, 4rem)",
              margin: 0,
            }}
          >
            Sumit Kar
          </p>
          <p
            className="mt-3 text-sm text-[rgba(200,216,240,0.65)] font-light leading-relaxed"
            style={{ fontFamily: "var(--font-body)", maxWidth: "280px" }}
          >
            Building resilient backend systems and orchestrating AI-native
            architectures at enterprise scale.
          </p>
          <div className="flex justify-center gap-3 mt-4 hero-mobile-cta">
            <Button
              href="#contact"
              className="hero-cta-sm"
              style={{ width: "auto", flex: "none" }}
            >
              Init Contact
            </Button>
          </div>
        </div>

        <div className="hero-mobile-visual">
          <div className="hero-mobile-panel">
            <div className="hero-panel-glow" />
            <div className="hero-mobile-panel-content">
              <h2 className="hero-role-title">
                Staff Engineer{" "}
                <div className="text-[rgba(255,255,255,0.55)] text-[0.72em]">
                  @ UKG
                </div>
              </h2>
            </div>
          </div>
          <img
            src="/images/me.png"
            alt="Sumit Kar"
            className="block ml-auto pointer-events-none relative hero-portrait-mobile"
            width={400}
            height={600}
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hidden md:flex flex-1 relative z-10 items-stretch">
        <div className="hero-desktop-shell">
          <div className="hero-desktop-stars" />
          <div className="hero-desktop-stage">
            <div className="hero-center-beacon" />
            <div className="hero-copy-block">
              <div className="hero-title-wrap">
                <div className="hero-top-kicker">
                  <span className="hero-mono-tag">
                    {"// Staff Engineer · AI Systems Architect"}
                  </span>
                </div>
                <p className="hero-display-title" style={HERO_NAME_STYLE}>
                  Sumit Kar
                </p>
              </div>

              <div className="hero-info-panel">
                <div className="hero-panel-glow" />
                <div className="hero-info-content">
                  <h2 className="hero-role-title">
                    Staff Engineer
                    <span className="hero-role-company">
                      <span className="hero-role-at" aria-hidden="true">
                        @
                      </span>
                      <span>UKG</span>
                    </span>
                  </h2>
                  <p className="hero-role-copy">
                    Building resilient backend systems and orchestrating
                    AI-native architectures at enterprise scale.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Button href="#contact" className="hero-panel-button">
                      Init Contact
                    </Button>
                  </div>
                </div>

                <div className="hero-scroll-desktop hero-scroll-hint">
                  <div className="flex flex-col items-center gap-1">
                    <div className="scroll-chevron" />
                    <span className="hero-scroll-label">Scroll</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-portrait-column">
              <div className="hero-portrait-glow" />
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="hero-orbit hero-orbit-three" />
              <img
                src="/images/me.png"
                alt="Sumit Kar"
                className="hero-portrait-desktop"
                width={400}
                height={600}
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
