export interface Skill {
  name: string;
  img: string;
  metric: string;
}

export interface SkillCategory {
  title: string;
  glow: string;
  span: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "// Core Languages",
    glow: "var(--blue-glow)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "Java", img: "Java.png", metric: "SYS_CORE" },
      { name: "TypeScript", img: "TypeScript.png", metric: "FRONT_EDGE" },
      { name: "Python", img: "Python.png", metric: "INFERENCE" },
      { name: "NodeJS", img: "Node JS.png", metric: "RUNTIME" },
      { name: "Go", img: "GoLang.png", metric: "CONCURRENT" },
      { name: "JavaScript", img: "Javascript.png", metric: "ACTIVE" }
    ]
  },
  {
    title: "// AI / LLM Systems",
    glow: "var(--magenta)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "LangChain", img: "Lang Chain.png", metric: "ORCHESTRATOR" },
      { name: "LangGraph", img: "LangGraph.png", metric: "AGENT_STATE" },
      { name: "RAG", img: "Elastic.png", metric: "VECTOR_DB" },
      { name: "Gemini", img: "Gemini.png", metric: "MODEL" },
      { name: "LLMs", img: "ChatGPT.png", metric: "INTELLIGENCE" },
      { name: "Agents", img: "n8n.png", metric: "AUTONOMOUS" }
    ]
  },
  {
    title: "// Frameworks & APIs",
    glow: "var(--cyan)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "Spring Boot", img: "Spring Boot.png", metric: "ENTERPRISE" },
      { name: "NestJS", img: "Nest JS.png", metric: "MICROSERVICES" },
      { name: "Angular", img: "Angular JS.png", metric: "SPA_RENDER" },
      { name: "REST APIs", img: "Rest API.png", metric: "PROTOCOLS" },
      { name: "WebRTC", img: "WebRTC.png", metric: "REALTIME" }
    ]
  },
  {
    title: "// Infrastructure & DevOps",
    glow: "var(--electric)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "Docker", img: "docker.png", metric: "CONTAINER" },
      { name: "Kubernetes", img: "k8s.png", metric: "ORCHESTRATE" },
      { name: "Jenkins", img: "jenkins.png", metric: "PIPELINE" },
      { name: "GitHub Actions", img: "gha.png", metric: "CI/CD" },
      { name: "Ansible", img: "ansible.png", metric: "AUTOMATION" },
      { name: "Docker Swarm", img: "docker.png", metric: "SWARM" }
    ]
  },
  {
    title: "// Data & Messaging",
    glow: "var(--forest)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "Postgres", img: "postgres.png", metric: "RELATIONAL" },
      { name: "MongoDB", img: "MongoDB.png", metric: "DOCUMENT" },
      { name: "Elasticsearch", img: "Elastic.png", metric: "SEARCH_IDX" },
      { name: "Kafka", img: "Kafka.png", metric: "EVENT_BUS" },
      { name: "MySQL", img: "MySQL.png", metric: "LEGACY_DS" }
    ]
  },
  {
    title: "// Observability & Testing",
    glow: "var(--magenta)",
    span: "col-span-1 md:col-span-2",
    skills: [
      { name: "Grafana", img: "grafana.png", metric: "METRICS" },
      { name: "Gremlin", img: "gremlin.png", metric: "CHAOS_ENG" },
      { name: "k6", img: "k6.png", metric: "LOAD_TEST" },
      { name: "Gatling", img: "Gatling.png", metric: "LOAD_SIM" },
      { name: "JMeter", img: "jMeter.png", metric: "STRESS" },
      { name: "Lighthouse", img: "Lighthouse.png", metric: "PERF_AUDIT" }
    ]
  }
];
