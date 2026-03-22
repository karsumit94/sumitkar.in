import type { AboutStat } from "../../../data/about";

interface AboutStatCardProps {
  stat: AboutStat;
}

export function AboutStatCard({ stat }: AboutStatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-num">
        {stat.value}
        {stat.suffix ? <sub>{stat.suffix}</sub> : null}
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-desc">{stat.description}</div>
    </div>
  );
}
