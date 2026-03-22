import { SectionHeader } from "../ui/SectionHeader";
import { projectItems } from "../../data/projects";
import { ProjectCard } from "./projects/ProjectCard";

export function Projects() {
  return (
    <section id="projects">
      <SectionHeader 
        label="Impact Vectors" 
        title="Shipped." 
        accent="Scaled." 
      />
      <div className="projects-grid">
        {projectItems.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
