export type TerminalCommand = { command: string; description: string };
export const COMMANDS: TerminalCommand[] = [
  { command: "whoami", description: "Developer profile" },
  { command: "ls projects/", description: "List all case studies" },
  { command: "open cloudops", description: "CloudOps AI Platform" },
  { command: "open bluegreen", description: "Blue-Green CI/CD" },
  { command: "open irctc", description: "Railway reservation system" },
  { command: "cat skills.txt", description: "Technical toolkit" },
  { command: "show experience", description: "Career timeline" },
  { command: "show education", description: "Education & certificates" },
  { command: "contact", description: "Contact channels" },
  { command: "help", description: "Command reference" },
];

export const PROJECT_DIRECTORIES = [
  "cloudops-ai-platform/",
  "blue-green-cicd-dotnet-iis/",
  "refund-note-management/",
  "irctc-reservation-system/",
  "icfai-rag-chatbot/",
  "sri-aditya-enterprises/",
  "jenkins-maven-pipeline/",
  "aws-3-tier-architecture/",
  "university-question-system/",
  "aws-serverless-math-app/",
  "sarcasm-detection-ml/",
];
