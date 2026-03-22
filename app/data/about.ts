export interface AboutStat {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export const aboutStats: AboutStat[] = [
  {
    value: "10",
    suffix: "+",
    label: "Years Engineering",
    description: "Building production systems at scale across four industry leaders.",
  },
  {
    value: "4",
    label: "Companies · Staff → SWE III",
    description: "UKG, Zuora, Cisco, BroadSoft — from startup energy to enterprise scale.",
  },
  {
    value: "∞",
    label: "AI Integrations Built",
    description: "LLMs, RAG pipelines, agent systems woven into real production workflows.",
  },
  {
    value: "0",
    label: "Undetected Outages Goal",
    description: "Chaos engineering, Gremlin testing, load testing — resilience by design.",
  },
];

export const aboutTags = [
  "Java",
  "NestJS",
  "LangChain",
  "RAG",
  "Kubernetes",
  "Kafka",
  "Spring Boot",
  "LangGraph",
  "Gremlin",
  "k6",
  "Docker",
  "Gemini",
];
