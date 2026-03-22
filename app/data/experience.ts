export interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  dotTone?: "magenta" | "cyan" | "electric" | "forest";
  highlights: string[];
  tags: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    company: "UKG",
    logo: "/images/companies/UKG.png",
    role: "Staff Software Engineer",
    period: "Jun 2024 — Present",
    duration: "~2 yrs",
    location: "Delhi",
    highlights: [
      "Architected backend services with NestJS & TypeScript using SOLID principles and modular design.",
      "Integrated LLMs into workflows via LangChain, LangGraph, RAG, and Gemini — enabling AI-powered automation.",
      "Built A2A interfaces and Agent UI components for seamless cross-system Backstage integration.",
      "Managed Kubernetes deployments for fault-tolerant, high-availability services.",
      "Conducted chaos & resilience testing with Gremlin; load testing with k6, Gatling, Lighthouse.",
    ],
    tags: ["NestJS", "LangChain", "RAG", "Kubernetes", "Gremlin", "k6"],
  },
  {
    company: "Zuora",
    logo: "/images/companies/Zuora.png",
    role: "Software Engineer III",
    period: "Jun 2022 — Feb 2024",
    duration: "1yr 9mo",
    location: "Chennai",
    dotTone: "magenta",
    highlights: [
      "Optimized payment workflows, cutting onboarding time for new gateways significantly.",
      "Built and stress-tested REST APIs with JMeter for data integrity at scale.",
      "Monitored & optimized application performance metrics using Grafana.",
      "Championed knowledge sharing through internal tech talks and mentoring.",
    ],
    tags: ["Java", "Spring Boot", "Grafana", "JMeter", "REST"],
  },
  {
    company: "Cisco",
    logo: "/images/companies/Cisco.png",
    role: "Software Engineer",
    period: "May 2018 — Jun 2022",
    duration: "4yrs 2mo",
    location: "Chennai",
    dotTone: "cyan",
    highlights: [
      "Built a Network Testing Tool using Java, JavaScript, and WebRTC for infrastructure optimization.",
      "Contributed to microservices in Java, NodeJS, Python & Go across multiple product lines.",
      "Orchestrated multi-node Docker Swarm deployments; secured images with Ansible.",
      "Developed Python-based call quality threshold alerts for proactive monitoring.",
    ],
    tags: ["Java", "WebRTC", "Docker Swarm", "Python", "Go", "Angular"],
  },
  {
    company: "BroadSoft",
    logo: "/images/companies/Broadsoft.png",
    role: "Software Engineer",
    period: "Jul 2016 — May 2018",
    duration: "1yr 11mo",
    location: "Chennai",
    dotTone: "electric",
    highlights: [
      "Engineered Java REST APIs for MySQL & Elasticsearch data retrieval.",
      "Built a Device Provisioning Portal — improved dashboard load time by 110%.",
      "Deployed system components as microservices via Docker for elastic scalability.",
      "Validated stability with JUnit, Gatling, and JMeter across performance benchmarks.",
    ],
    tags: ["Java", "Elasticsearch", "Docker", "Gatling", "JUnit"],
  },
  {
    company: "Novatree eSolutions",
    logo: "/images/companies/Novatree.png",
    role: "Internship",
    period: "Jan 2016 — Apr 2016",
    duration: "4 mos",
    location: "Kolkata",
    dotTone: "forest",
    highlights: [
      "Created responsive websites using HTML5, CSS3, JavaScript, PHP (Laravel) and Drupal CMS.",
      "Enhanced MongoDB data processing efficiency by 25%.",
    ],
    tags: ["PHP", "Laravel", "Drupal", "MongoDB", "HTML5", "CSS3"],
  },
];
