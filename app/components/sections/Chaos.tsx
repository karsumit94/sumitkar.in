export function Chaos() {
  return (
    <section id="chaos">
      <div className="chaos-inner">
        <div className="section-label" style={{ justifyContent: 'center' }}>Resilience Engineering</div>
        <h2 className="section-title" style={{ marginBottom: '24px' }}>Chaos <span className="accent">by Design</span></h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 300, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Systems break in production. The question is: <em style={{ color: 'var(--text)', fontStyle: 'normal' }}>did you design for it?</em> Chaos engineering means engineering for failure — deliberately, methodically, calmly.
        </p>
        <div className="chaos-metrics">
          <div className="metric-block">
            <div className="metric-val">99.9%</div>
            <div className="metric-label">Uptime Target</div>
          </div>
          <div className="metric-block">
            <div className="metric-val">4</div>
            <div className="metric-label">Testing Tools</div>
          </div>
          <div className="metric-block">
            <div className="metric-val">0</div>
            <div className="metric-label">Panic Incidents</div>
          </div>
        </div>
        <div className="chaos-tools">
          <div className="chaos-tool">Gremlin</div>
          <div className="chaos-tool">k6</div>
          <div className="chaos-tool">Gatling</div>
          <div className="chaos-tool">JMeter</div>
          <div className="chaos-tool">Lighthouse</div>
        </div>
      </div>
    </section>
  );
}
