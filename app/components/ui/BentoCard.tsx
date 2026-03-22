import type { CSSProperties, ReactNode } from "react";

interface BentoCardProps {
  title: string;
  glow: string;
  span?: string;
  children?: ReactNode;
}

export function BentoCard({ title, glow, span = "", children }: BentoCardProps) {
  return (
    <div 
      className={`bento-card ${span}`} 
      style={{ '--glow-color': glow } as CSSProperties}
    >
      <div className="bento-header">
        <div className="bento-title">{title}</div>
        <div className="bento-status">
          <div 
            className="status-dot-small" 
            style={{ backgroundColor: glow }}
          ></div> 
          IDLE
        </div>
      </div>
      <div className="bento-skills">
        {children}
      </div>
    </div>
  );
}
