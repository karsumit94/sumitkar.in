import type { ProjectItem } from "../../../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <div className="project-card">
      <div className="project-icon" style={{ color: project.color }}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="project-title">{project.title}</div>
      <div className="project-impact">{project.impact}</div>
      <div className="project-desc">{project.description}</div>
    </div>
  );
}
