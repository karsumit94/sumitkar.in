import type { AiCapability } from "../../../data/ai";

interface AiCapabilityCardProps {
  capability: AiCapability;
}

export function AiCapabilityCard({ capability }: AiCapabilityCardProps) {
  const Icon = capability.icon;

  return (
    <div className="ai-card">
      <div className="ai-card-icon" style={{ color: capability.color }}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <div className="ai-card-title">{capability.title}</div>
        <div className="ai-card-desc">{capability.description}</div>
      </div>
    </div>
  );
}
