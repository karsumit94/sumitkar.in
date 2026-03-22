import { SectionHeader } from "../ui/SectionHeader";
import { aboutStats, aboutTags } from "../../data/about";
import { AboutStatCard } from "./about/AboutStatCard";

export function About() {
  return (
    <section id="about">
      <div className="layout-container section-frame">
        <SectionHeader 
          label="System Overview" 
          title="The" 
          accent="Architect" 
        />
        <div className="about-grid">
          {aboutStats.map((stat) => (
            <AboutStatCard key={`${stat.label}-${stat.value}`} stat={stat} />
          ))}
        </div>
        <div className="about-bio">
          <div>
            <p className="bio-text">
              Staff Engineer at <strong>UKG</strong>, architecting backend systems with <strong>NestJS, TypeScript</strong> and weaving <strong>AI/LLM intelligence</strong> into enterprise workflows. Deep expertise in microservices, cloud-native design, and making distributed systems fail gracefully.
            </p>
            <p className="bio-text" style={{ marginTop: '16px' }}>
              Passionate about <strong>RAG pipelines</strong>, agent systems, and the intersection of <strong>backend engineering and AI</strong>. Author. Mentor. System thinker.
            </p>
          </div>
          <div>
            <div className="bio-tags">
              {aboutTags.map((tag) => (
                <span key={tag} className="bio-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
