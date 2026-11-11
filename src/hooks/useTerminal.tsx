import React, { useCallback, useMemo, useState } from "react";
import { COMMANDS, PROJECT_DIRECTORIES } from "../data/commands";
import {
  ProjectsOutput,
  CertificationsOutput,
  ExperienceOutput,
  UpSkillingOutput,
  SkillsOutput,
  AwsInfraOutput,
  DockerPsOutput,
  EducationOutput,
  ContactOutput,
} from "../components/TerminalOutputs";
import { sounds } from "../utils/soundEffects";

export type OutputBlock = {
  id: number;
  command: string;
  lines: string[];
  tone?: "normal" | "accent" | "error" | "success";
  customContent?: React.ReactNode;
};

function resolveCommand(raw: string): {
  lines: string[];
  tone?: OutputBlock["tone"];
  customContent?: React.ReactNode;
} {
  const command = raw.trim().replace(/\s+/g, " ");
  const lower = command.toLowerCase();

  if (!command) return { lines: [] };

  // Help
  if (lower === "help" || lower === "help --all" || lower === "?") {
    return {
      tone: "accent",
      lines: [
        "═══════════════════════════════════════════════════════════════════",
        "  VENKATAMANI SASANK — CLOUDOPS COMMAND CENTER REFERENCE",
        "═══════════════════════════════════════════════════════════════════",
        "  projects              Explore Enterprise Blue-Green & selected projects",
        "  certs                 View 4 verified AWS certifications with Drive links",
        "  experience            Software Developer experience at ICFAI Group",
        "  upskilling            Hands-on AWS CI/CD and Jenkins pipeline deep dives",
        "  skills                Full technical stack (AWS, DevOps, .NET, Languages)",
        "  aws infra --show      Interactive AWS architecture topology",
        "  docker ps             DevOps container workbench status",
        "  education             MCA (7.67 CGPA) and B.Sc (8.24 CGPA) background",
        "  contact               Get in touch (Email, Phone, LinkedIn, GitHub)",
        "  whoami                Developer summary & profile",
        "  clear                 Clear terminal session output",
        "  history               Display session command history",
        "",
        "TIP: Click any quick command chip below or type short aliases (e.g. 'certs', 'projects')!",
      ],
    };
  }

  // Whoami
  if (lower === "whoami") {
    return {
      tone: "accent",
      lines: [
        "VENKATAMANI SASANK",
        "AWS Cloud & DevOps Engineer | .NET Developer",
        "Software Developer — ICFAI Group · Hyderabad, India",
        "",
        "Specialized in: Zero-Downtime Blue-Green Pipelines, AWS Infrastructure Automation,",
        ".NET Backends, Docker Containerization, and Cloud Security Hardening.",
        "Available immediately for DevOps / Cloud Engineering roles.",
      ],
    };
  }

  // Projects
  if (
    lower === "projects" ||
    lower === "ls projects/" ||
    lower === "ls projects" ||
    lower === "ls" ||
    lower.startsWith("cat projects") ||
    lower.startsWith("open project")
  ) {
    return {
      tone: "accent",
      lines: ["Mounting verified project repositories..."],
      customContent: <ProjectsOutput />,
    };
  }

  // Certifications
  if (
    lower === "certs" ||
    lower === "certifications" ||
    lower === "cat certs.txt" ||
    lower === "aws certs"
  ) {
    return {
      tone: "success",
      lines: ["Fetching verified AWS certifications from Amazon Web Services..."],
      customContent: <CertificationsOutput />,
    };
  }

  // Experience
  if (
    lower === "experience" ||
    lower === "./experience.sh" ||
    lower === "cat experience.txt" ||
    lower === "work"
  ) {
    return {
      tone: "accent",
      lines: ["Querying ICFAI Group employment records & project deliverables..."],
      customContent: <ExperienceOutput />,
    };
  }

  // UpSkilling
  if (
    lower === "upskilling" ||
    lower === "cat upskilling.txt" ||
    lower === "learning" ||
    lower === "labs"
  ) {
    return {
      tone: "accent",
      lines: ["Loading continuous learning & hands-on DevOps lab files..."],
      customContent: <UpSkillingOutput />,
    };
  }

  // Skills
  if (lower === "skills" || lower === "cat skills.txt" || lower === "stack") {
    return {
      tone: "accent",
      lines: ["Compiling technical capabilities & tools inventory..."],
      customContent: <SkillsOutput />,
    };
  }

  // AWS Architecture
  if (
    lower === "aws" ||
    lower === "aws infra" ||
    lower === "aws infra --show" ||
    lower === "cloud"
  ) {
    return {
      tone: "accent",
      lines: ["Querying AWS Cloud Topology (Region: ap-south-1)..."],
      customContent: <AwsInfraOutput />,
    };
  }

  // Docker
  if (lower === "docker" || lower === "docker ps" || lower === "containers") {
    return {
      tone: "success",
      lines: ["Inspecting local Docker daemon sockets..."],
      customContent: <DockerPsOutput />,
    };
  }

  // Education
  if (
    lower === "education" ||
    lower === "cat education.txt" ||
    lower === "degrees" ||
    lower === "academics"
  ) {
    return {
      tone: "accent",
      lines: ["Fetching academic qualifications & degree records..."],
      customContent: <EducationOutput />,
    };
  }

  // Contact
  if (
    lower === "contact" ||
    lower === "contact --open" ||
    lower === "email" ||
    lower === "socials"
  ) {
    return {
      tone: "accent",
      lines: ["Opening communication channels..."],
      customContent: <ContactOutput />,
    };
  }

  // System shell commands
  if (lower === "pwd") return { lines: ["/home/sasank/portfolio"] };
  if (lower === "date") return { lines: [new Date().toUTCString()] };
  if (lower === "uname -a") {
    return {
      lines: [
        "Linux sasank-dev-box 6.5.0-cloudops #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
      ],
    };
  }
  if (lower === "matrix") {
    return {
      tone: "success",
      lines: [
        "Wake up, Neo...",
        "The Matrix has you.",
        "Follow the white rabbit.",
        "Knock, knock, Neo.",
      ],
    };
  }

  return {
    tone: "error",
    lines: [
      `zsh: command not found: ${command}`,
      "Type `help` to display available commands, or click any shortcut below.",
    ],
  };
}

export function useTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<OutputBlock[]>([]);
  const [nextId, setNextId] = useState(1);

  const suggestions = useMemo(() => COMMANDS, []);

  const execute = useCallback((raw: string) => {
    const command = raw.trim();
    if (!command) return;

    if (command.toLowerCase() === "clear") {
      sounds.playExecute();
      setOutputs([]);
      setInput("");
      setHistory((current) => [...current, command]);
      setHistoryIndex(-1);
      return;
    }

    const result = resolveCommand(command);
    if (result.tone === "error") {
      sounds.playError();
    } else {
      sounds.playSuccess();
    }

    setOutputs((current) => [...current, { id: nextId, command, ...result }]);
    setNextId((id) => id + 1);
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput("");
  }, [nextId]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      sounds.playKey();
      if (event.key === "Enter") {
        event.preventDefault();
        execute(input);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!history.length) return;
        const index =
          historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(index);
        setInput(history[index]);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex < 0) return;
        const index = historyIndex + 1;
        if (index >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(index);
          setInput(history[index]);
        }
      } else if (event.key === "Tab") {
        event.preventDefault();
        const match = COMMANDS.find((item) =>
          item.command.startsWith(input.trim())
        );
        if (match) setInput(match.command);
      }
    },
    [execute, history, historyIndex, input]
  );

  return { input, setInput, outputs, suggestions, execute, onKeyDown, history };
}
