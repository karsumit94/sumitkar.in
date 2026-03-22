import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeftRight,
  Code2,
  LayoutGrid,
  Shield,
} from "lucide-react";

export interface ProjectItem {
  title: string;
  impact: string;
  description: string;
  color: string;
  icon: LucideIcon;
}

export const projectItems: ProjectItem[] = [
  {
    title: "Enterprise AI Workflows",
    impact: "LLM → Production · UKG",
    description:
      "Designed and shipped RAG pipelines and LangGraph-based agent systems that power real AI features in UKG's enterprise platform — not demos, real users.",
    color: "var(--cyan)",
    icon: Code2,
  },
  {
    title: "Payment Gateway Optimization",
    impact: "Onboarding Time ↓ · Zuora",
    description:
      "Streamlined payment processing workflows to dramatically cut gateway onboarding time, directly improving tenant experience at Zuora's SaaS platform.",
    color: "var(--blue-glow)",
    icon: LayoutGrid,
  },
  {
    title: "Network Testing Tool",
    impact: "WebRTC + Java · Cisco",
    description:
      "Built a comprehensive web-based network infrastructure testing tool with real-time WebRTC capabilities — giving teams visibility into call quality at scale.",
    color: "var(--magenta)",
    icon: Activity,
  },
  {
    title: "Dashboard Performance",
    impact: "+110% Load Speed · BroadSoft",
    description:
      "Overhauled a device provisioning portal's frontend performance — achieving 110% improvement in load time through targeted optimization strategies.",
    color: "var(--electric)",
    icon: LayoutGrid,
  },
  {
    title: "K8s Platform Engineering",
    impact: "Zero Downtime Deployments",
    description:
      "Managed Kubernetes-based service deployments with CI/CD automation via GitHub Actions — ensuring fault tolerance across all environments.",
    color: "var(--cyan)",
    icon: Shield,
  },
  {
    title: "Backstage A2A Integration",
    impact: "Cross-system Agent UI",
    description:
      "Developed A2A interfaces enabling seamless agent-to-agent communication through Backstage — a foundation for AI-native developer portals.",
    color: "var(--magenta)",
    icon: ArrowLeftRight,
  },
];
