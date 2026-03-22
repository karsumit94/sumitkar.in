import type { MouseEvent, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackgroundEffects } from "./BackgroundEffects";
import { CustomCursor } from "./CustomCursor";

interface BaseLayoutProps {
  children: ReactNode;
  onNavClick?: (e: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export function BaseLayout({ children, onNavClick }: BaseLayoutProps) {
  return (
    <>
      <CustomCursor />
      <BackgroundEffects />
      <Navbar onNavClick={onNavClick} />
      <main className="w-full relative z-10 flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
