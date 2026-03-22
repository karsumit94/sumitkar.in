import type { LucideIcon } from "lucide-react";
import { Bot, Database, Package, Wrench } from "lucide-react";

export interface AiCapability {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
}

export const aiCapabilities: AiCapability[] = [
  {
    title: "LLM Integration",
    description:
      "Embedded large language models into backend workflows using LangChain and Gemini — powering AI-native features at enterprise scale.",
    color: "var(--blue-glow)",
    icon: Package,
  },
  {
    title: "RAG Pipelines",
    description:
      "Built retrieval-augmented generation systems that deliver context-aware, grounded AI responses — not hallucinations.",
    color: "var(--cyan)",
    icon: Database,
  },
  {
    title: "Agent Systems",
    description:
      "Designed A2A interfaces and Agent UI components for cross-system orchestration via Backstage, using LangGraph.",
    color: "var(--magenta)",
    icon: Bot,
  },
  {
    title: "AI-Powered Automation",
    description:
      "Wired AI workflows into CI/CD and operational pipelines — turning intelligence into leverage, not just features.",
    color: "var(--electric)",
    icon: Wrench,
  },
];
