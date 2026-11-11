import { useCallback, useMemo, useState, type KeyboardEvent } from "react";
import { COMMANDS, PROJECT_DIRECTORIES } from "../data/commands";
import { CERTIFICATIONS, EXPERIENCE, PROJECTS, SKILL_GROUPS } from "../data/portfolio";

export type OutputBlock = { id: number; command: string; lines: string[]; tone?: "normal" | "accent" | "error" | "success" };
type ProjectSelectCallback = (id: string) => void;

function resolveCommand(raw: string, onProjectSelect?: ProjectSelectCallback): { lines: string[]; tone?: OutputBlock["tone"] } {
  const command = raw.trim().replace(/\s+/g, " ");
  const lower = command.toLowerCase();
  if (!command) return { lines: [] };
  if (lower === "help" || lower === "help --all") return { tone: "accent", lines: ["PORTFOLIO COMMANDS", "  whoami                 Developer profile", "  ls projects/           List all project case studies", "  open <project>         Open a project case study below", "  cat skills.txt         Technical skills", "  show experience        Career timeline", "  show education         Education and certifications", "  contact                Contact channels", "  clear                  Clear terminal output", "  help                   Show this command reference", "", "PROJECT IDS: cloudops · bluegreen · refund · irctc · rag · sriaditya · jenkins · aws3tier"] };
  if (lower === "whoami") return { tone: "accent", lines: ["VENKATAMANI SASANK", "Software Developer — ICFAI Group", "AWS Cloud & DevOps Engineer | .NET Developer", "Hyderabad, India", "", "I build application systems and the delivery workflows around them.", "My work spans .NET, SQL Server, AWS, Linux, Docker and CI/CD automation."] };
  if (["ls projects", "ls projects/", "ls"].includes(lower)) return { tone: "accent", lines: ["PROJECT WORKSPACE", ...PROJECT_DIRECTORIES.map((name) => `  ${name}`), "", "Use `open <project-id>` for a project case study."] };
  if (lower.startsWith("open ")) {
    const id = lower.slice(5).trim().replace(/\/$/, "");
    const aliases: Record<string, string> = { "cloudops-ai-platform": "cloudops", "blue-green-cicd-dotnet-iis": "bluegreen", "refund-note-management": "refund", "irctc-reservation-system": "irctc", "irctc-clone": "irctc", "icfai-rag-chatbot": "rag", "sri-aditya-enterprises": "sriaditya", "jenkins-maven-pipeline": "jenkins", "aws-3-tier-architecture": "aws3tier", "university-question-system": "question-system", "exam-gen": "question-system", "ai-powered-university-question-system": "question-system", "question-system": "question-system", "serverless-math-app": "serverless-math", "sarcasm-detection": "sarcasm-ml" };
    const projectId = aliases[id] ?? id;
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return { tone: "error", lines: [`unknown project: ${id}`, "Try: open cloudops | bluegreen | refund | irctc | rag | sriaditya | jenkins | aws3tier | question-system"] };
    onProjectSelect?.(projectId);
    return { tone: "accent", lines: [`${project.number} / ${project.title.toUpperCase()}`, project.category, project.period, "", project.summary, "", "IMPLEMENTATION", ...project.implementation.map((line) => `  • ${line}`), "", "STACK", `  ${project.stack.join(" · ")}`, "", "The full case study is expanded in the Projects section below."] };
  }
  if (lower === "cat skills.txt" || lower === "skills") return { lines: ["TECHNICAL TOOLKIT", "", ...SKILL_GROUPS.flatMap((group) => [`${group.title.toUpperCase()}`, `  ${group.skills.join(" · ")}`, ""])] };
  if (lower === "show experience" || lower === "./experience.sh" || lower === "experience") { return { tone: "accent", lines: ["CAREER", ...EXPERIENCE.flatMap((job) => [job.role, `${job.company} · ${job.location}`, job.period, job.description, ...job.highlights.map((line) => `  • ${line}`), ""])] }; }
  if (lower === "show education" || lower === "education") { return { lines: ["EDUCATION", ...["Master of Computer Applications — RG Kedia College of Commerce (2022–2024), CGPA 7.67", "Bachelor of Science (MECs) — institution and dates not present in the source portfolio", "", "AWS CERTIFICATES", ...CERTIFICATIONS.map((cert) => `  ${cert.title} · ${cert.issuer}`)]] }; }
  if (lower === "contact" || lower === "contact --open") { return { tone: "accent", lines: ["CONTACT CHANNELS", "Email    shashank.manikanta@gmail.com", "GitHub   github.com/Tvmsasank", "LinkedIn linkedin.com/in/venkatamani-sasank", "Location Hyderabad, India", "", "Use the contact links in the page to open these channels."] }; }
  if (lower === "pwd") return { lines: ["/home/venkatamani/portfolio"] };
  if (lower === "clear") return { lines: [] };
  return { tone: "error", lines: [`command not found: ${command}`, "Type `help` to see available commands."] };
}

export function useTerminal(onProjectSelect?: ProjectSelectCallback) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<OutputBlock[]>([]);
  const [nextId, setNextId] = useState(1);
  const suggestions = useMemo(() => COMMANDS, []);
  const execute = useCallback((raw: string) => {
    const command = raw.trim();
    if (!command) return;
    if (command.toLowerCase() === "clear") { setOutputs([]); setInput(""); setHistory((current) => [...current, command]); setHistoryIndex(-1); return; }
    const result = resolveCommand(command, onProjectSelect);
    setOutputs((current) => [...current, { id: nextId, command, ...result }]);
    setNextId((id) => id + 1); setHistory((current) => [...current, command]); setHistoryIndex(-1); setInput("");
  }, [nextId, onProjectSelect]);
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { event.preventDefault(); execute(input); }
    else if (event.key === "ArrowUp") { event.preventDefault(); if (!history.length) return; const index = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(index); setInput(history[index]); }
    else if (event.key === "ArrowDown") { event.preventDefault(); if (historyIndex < 0) return; const index = historyIndex + 1; if (index >= history.length) { setHistoryIndex(-1); setInput(""); } else { setHistoryIndex(index); setInput(history[index]); } }
    else if (event.key === "Tab") { event.preventDefault(); const match = COMMANDS.find((item) => item.command.startsWith(input.trim())); if (match) setInput(match.command); }
  }, [execute, history, historyIndex, input]);
  return { input, setInput, outputs, suggestions, execute, onKeyDown, history };
}
