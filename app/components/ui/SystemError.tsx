import { Button } from "./Button";
import { BackgroundEffects } from "../BackgroundEffects";
import { CustomCursor } from "../CustomCursor";

interface SystemErrorProps {
  status: string | number;
  message: string;
  details?: string;
  stack?: string;
}

export function SystemError({ status, message, details, stack }: SystemErrorProps) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-8 md:p-16 bg-[var(--bg)] relative overflow-hidden">
      <CustomCursor />
      <BackgroundEffects />

      <div className="max-w-4xl w-full relative z-10 my-auto">
        <div className="border border-[rgba(255,45,158,0.25)] bg-[rgba(6,12,26,0.8)] backdrop-blur-2xl rounded-[32px] p-10 md:p-20 shadow-[0_0_80px_rgba(255,45,158,0.12)] relative overflow-hidden">
          {/* Diagnostic Header */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--magenta)] to-transparent opacity-40"></div>

          <div className="flex flex-col items-center text-center py-6 md:py-10">
            <br />
            <div className="font-mono text-[var(--magenta)] text-[10px] md:text-xs mb-10 tracking-[0.4em] uppercase opacity-80 decoration-dotted underline underline-offset-8">
              {"// CRITICAL_SYSTEM_FAILURE_DETECTED //"}
            </div>

            <h1 className="font-display text-[clamp(5rem,15vw,10rem)] font-black leading-none mb-4 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {status}
            </h1>

            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-8 uppercase tracking-tight">
              {message}
            </h2>

            <p className="text-[rgba(200,216,240,0.6)] font-light text-base md:text-xl mb-12 max-w-xl leading-relaxed">
              {details}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button href="/" variant="primary" className="hero-cta-sm md:px-10 md:py-5">Init Home Sequence</Button>
              <Button href="#" onClick={() => window.location.reload()} variant="secondary" className="hero-cta-sm md:px-10 md:py-5">Retry Diagnostic</Button>
            </div>

            <br />
          </div>

          {stack && (
            <div className="mt-16 pt-10 border-t border-[rgba(255,255,255,0.06)]">
              <div className="font-mono text-[10px] text-[var(--muted)] mb-4 tracking-[0.2em] uppercase">Diagnostic Stack Trace</div>
              <pre className="bg-black/40 p-6 rounded-xl overflow-x-auto text-[11px] font-mono text-[rgba(200,216,240,0.35)] leading-loose border border-white/5 whitespace-pre-wrap break-all">
                <code>{stack}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-between items-center px-8">
          <div className="font-mono text-[10px] text-[var(--muted)] tracking-[0.3em] uppercase">SYSTEM_STATE: UNSTABLE</div>
          <div className="font-mono text-[10px] text-[var(--magenta)] tracking-[0.3em] animate-pulse uppercase">CONNECTION_LOST_NODE_404</div>
        </div>
      </div>
    </div>
  );
}
