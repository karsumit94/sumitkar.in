import type { ExperienceItem } from "../../../data/experience";

interface ExperienceTimelineItemProps {
  item: ExperienceItem;
}

export function ExperienceTimelineItem({
  item,
}: ExperienceTimelineItemProps) {
  const dotClassName = item.dotTone
    ? `timeline-dot ${item.dotTone}`
    : "timeline-dot";

  return (
    <div className="timeline-item">
      <div className={dotClassName}></div>
      <div className="exp-meta">
        <div className="exp-period">
          {item.period}
          <br />
          {item.duration} · {item.location}
        </div>
      </div>
      <div className="exp-body">
        <div className="exp-company">
          <img
            src={item.logo}
            alt={item.company}
            className="exp-logo"
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
          />
          {item.company}
        </div>
        <div className="exp-title">{item.role}</div>
        <ul className="exp-points">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="exp-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="exp-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
