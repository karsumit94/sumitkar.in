import type { Route } from "./+types/home";
import { BaseLayout } from "../components/BaseLayout";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { AiSection } from "../components/sections/AiSection";
import { Experience } from "../components/sections/Experience";
import { Projects } from "../components/sections/Projects";
import { Publication } from "../components/sections/Publication";
import { Chaos } from "../components/sections/Chaos";
import { Quote } from "../components/sections/Quote";
import { Contact } from "../components/sections/Contact";
import { useScrollObserver } from "../hooks/useScrollObserver";
import { useParallax } from "../hooks/useParallax";
import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  HOME_META_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  homePageJsonLd,
  organizationJsonLd,
  personJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "../utils/seo";

export function meta(_: Route.MetaArgs) {
  return [
    { title: HOME_META_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: HOME_META_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:site_name", content: "Sumit Kar" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:image", content: DEFAULT_OG_IMAGE },
    { property: "og:image:alt", content: "Sumit Kar website social preview" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: HOME_META_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    { name: "twitter:image:alt", content: "Sumit Kar website social preview" },
    { tagName: "link", rel: "canonical", href: SITE_URL },
    { name: "keywords", content: "Sumit Kar, Staff Engineer, AI Systems Architect, Backend Systems, System Design, Distributed Systems, RAG, Microservices" },
  ];
}

export default function Home() {
  useScrollObserver();
  useParallax();

  useEffect(() => {
    // Konami code Easter Egg
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let ki = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === konami[ki]) ki++;
      else ki = 0;
      if (ki === konami.length) {
        ki = 0;
        document.documentElement.style.setProperty('--bg', '#0a0020');
        document.documentElement.style.setProperty('--blue-glow', '#b400ff');
        document.documentElement.style.setProperty('--cyan', '#ff00a8');
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;font-family:var(--font-mono);font-size:18px;color:#b400ff;text-align:center;pointer-events:none;text-shadow:0 0 20px #b400ff;';
        banner.textContent = '// AI MODE UNLOCKED //';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 3000);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(websiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homePageJsonLd()),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <AiSection />
      <Experience />
      <Projects />
      <Publication />
      <Chaos />
      <Quote />
      <Contact />
    </BaseLayout>
  );
}
