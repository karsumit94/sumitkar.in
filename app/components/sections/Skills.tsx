import { BentoCard } from "../ui/BentoCard";
import { SectionHeader } from "../ui/SectionHeader";
import { skillCategories } from "../../data/skills";

export function Skills() {
  return (
    <section id="skills">
      <div className="layout-container section-frame skills-inner">
        <SectionHeader
          label="Telemetry Array"
          title="Tech"
          accent="Stack"
        />

        <div className="bento-grid">
          {skillCategories.map((cat, i) => (
            <BentoCard
              key={i}
              title={cat.title}
              glow={cat.glow}
              span={cat.span}
            >
              {cat.skills.map((skill, j) => (
                <div key={j} className="bento-skill">
                  <div className="bento-icon">
                    <img
                      src={`/images/skillsets/${skill.img}`}
                      alt={skill.name}
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bento-info">
                    <div className="bento-name">{skill.name}</div>
                    <div className="bento-metric">{skill.metric}</div>
                  </div>
                </div>
              ))}
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
