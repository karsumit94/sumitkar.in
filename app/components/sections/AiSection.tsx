import { SectionHeader } from "../ui/SectionHeader";
import { aiCapabilities } from "../../data/ai";
import { AiCapabilityCard } from "./ai/AiCapabilityCard";

export function AiSection() {
  return (
    <section id="ai-section">
      <div className="layout-container section-frame">
        <SectionHeader 
          label="Intelligence Layer" 
          title="AI &" 
          accent="Product Thinking" 
        />
        <div className="ai-grid">
          <div className="ai-cards">
            {aiCapabilities.map((capability) => (
              <AiCapabilityCard key={capability.title} capability={capability} />
            ))}
          </div>
          <div className="neural-wrap" id="neuralWrap">
            <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
              <defs>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g stroke="rgba(0,212,255,0.15)" strokeWidth="1" fill="none">
                <line x1="50" y1="70" x2="160" y2="70" className="nn-line" />
                <line x1="50" y1="70" x2="160" y2="130" className="nn-line" />
                <line x1="50" y1="70" x2="160" y2="190" className="nn-line" />
                <line x1="50" y1="130" x2="160" y2="70" className="nn-line" />
                <line x1="50" y1="130" x2="160" y2="130" className="nn-line" />
                <line x1="50" y1="130" x2="160" y2="190" className="nn-line" />
                <line x1="50" y1="190" x2="160" y2="70" className="nn-line" />
                <line x1="50" y1="190" x2="160" y2="130" className="nn-line" />
                <line x1="50" y1="190" x2="160" y2="190" className="nn-line" />
                <line x1="50" y1="250" x2="160" y2="130" className="nn-line" />
                <line x1="50" y1="250" x2="160" y2="190" className="nn-line" />
                <line x1="50" y1="250" x2="160" y2="250" className="nn-line" />
                <line x1="160" y1="70" x2="270" y2="100" className="nn-line" />
                <line x1="160" y1="70" x2="270" y2="220" className="nn-line" />
                <line x1="160" y1="130" x2="270" y2="100" className="nn-line" />
                <line x1="160" y1="130" x2="270" y2="220" className="nn-line" />
                <line x1="160" y1="190" x2="270" y2="100" className="nn-line" />
                <line x1="160" y1="190" x2="270" y2="220" className="nn-line" />
                <line x1="160" y1="250" x2="270" y2="100" className="nn-line" />
                <line x1="160" y1="250" x2="270" y2="220" className="nn-line" />
              </g>
              <g filter="url(#glow2)">
                <circle cx="50" cy="70" r="10" fill="#061020" stroke="#4f8eff" strokeWidth="2" />
                <circle cx="50" cy="130" r="10" fill="#061020" stroke="#4f8eff" strokeWidth="2" />
                <circle cx="50" cy="190" r="10" fill="#061020" stroke="#4f8eff" strokeWidth="2" />
                <circle cx="50" cy="250" r="10" fill="#061020" stroke="#4f8eff" strokeWidth="2" />
                <circle cx="160" cy="70" r="12" fill="#061020" stroke="#00d4ff" strokeWidth="2" />
                <circle cx="160" cy="130" r="12" fill="#061020" stroke="#00d4ff" strokeWidth="2" />
                <circle cx="160" cy="190" r="12" fill="#061020" stroke="#00d4ff" strokeWidth="2" />
                <circle cx="160" cy="250" r="12" fill="#061020" stroke="#00d4ff" strokeWidth="2" />
                <circle cx="270" cy="100" r="14" fill="#061020" stroke="#ff2d9e" strokeWidth="2" />
                <circle cx="270" cy="220" r="14" fill="#061020" stroke="#00ffd5" strokeWidth="2" />
              </g>
              <circle cx="160" cy="130" r="8" fill="#00d4ff" opacity="0" className="node-pulse" />
              <circle cx="270" cy="100" r="9" fill="#ff2d9e" opacity="0" className="node-pulse2" />
              <text x="10" y="73" fill="#5a7090" fontFamily="monospace" fontSize="8">IN</text>
              <text x="148" y="73" fill="#5a7090" fontFamily="monospace" fontSize="8">H1</text>
              <text x="256" y="103" fill="#ff2d9e" fontFamily="monospace" fontSize="7">LLM</text>
              <text x="252" y="223" fill="#00ffd5" fontFamily="monospace" fontSize="7">RAG</text>
              <circle r="4" fill="#00d4ff" opacity="0.9" filter="url(#glow2)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M50,130 L160,130 L270,100" />
              </circle>
              <circle r="4" fill="#ff2d9e" opacity="0.9" filter="url(#glow2)">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.2s" path="M50,190 L160,250 L270,220" />
              </circle>
              <circle r="3" fill="#00ffd5" opacity="0.8" filter="url(#glow2)">
                <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path="M50,70 L160,70 L270,100" />
              </circle>
            </svg>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>INFERENCE ENGINE · ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
