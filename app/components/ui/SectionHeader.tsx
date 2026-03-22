
interface SectionHeaderProps {
  label: string;
  title: string;
  accent?: string;
}

export function SectionHeader({ label, title, accent }: SectionHeaderProps) {
  return (
    <>
      <div className="section-label">{label}</div>
      <h2 className="section-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
    </>
  );
}
