import { SectionHeader } from "../ui/SectionHeader";
import { experienceItems } from "../../data/experience";
import { ExperienceTimelineItem } from "./experience/ExperienceTimelineItem";

export function Experience() {
  return (
    <section id="experience">
      <div className="layout-container section-frame exp-inner">
        <SectionHeader 
          label="Career Trajectory" 
          title="The" 
          accent="Journey" 
        />
        <div className="timeline">
          {experienceItems.map((item) => (
            <ExperienceTimelineItem key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
