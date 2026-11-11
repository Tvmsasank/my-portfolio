import { useState } from "react";
import {
  ExternalLink,
  Award,
  Zap,
  Clock,
  RotateCcw,
  ShieldCheck,
  Server,
  Terminal as TerminalIcon,
  CheckCircle2,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  FEATURED_PROJECT,
  PROJECTS,
  EXPERIENCE,
  UPSKILLING,
  CERTIFICATIONS,
  EDUCATION,
  SKILLS,
  CONTACT,
} from "../data/portfolioData";

export function ProjectsOutput() {
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured");

  return (
    <div className="my-3 space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-[#F4EDE0]/10 pb-2">
        <button
          onClick={() => setActiveTab("featured")}
          className={`px-3 py-1 text-[11px] font-mono tracking-wider transition-colors rounded-sm ${
            activeTab === "featured"
              ? "bg-[#FF6B5B] text-[#14213D] font-bold shadow-[0_0_12px_rgba(255,107,91,0.3)]"
              : "text-[#d8cebc] hover:text-[#F4EDE0]"
          }`}
        >
          ★ FEATURED ENTERPRISE
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1 text-[11px] font-mono tracking-wider transition-colors rounded-sm ${
            activeTab === "all"
              ? "bg-[#FF6B5B] text-[#14213D] font-bold shadow-[0_0_12px_rgba(255,107,91,0.3)]"
              : "text-[#d8cebc] hover:text-[#F4EDE0]"
          }`}
        >
          ALL PROJECTS ({PROJECTS.length})
        </button>
      </div>

      {activeTab === "featured" ? (
        <div className="p-4 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FF6B5B] via-[#ffa196] to-[#F4EDE0]" />
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[9px] tracking-widest text-[#FF6B5B] bg-[#FF6B5B]/15 px-2 py-0.5 border border-[#FF6B5B]/30 uppercase flex items-center gap-1.5 font-semibold rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5B] animate-pulse" />
              Blue-Green Zero-Downtime Pipeline
            </span>
            <span className="font-mono text-[10px] text-[#F4EDE0]/80">{FEATURED_PROJECT.role}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#F4EDE0] mb-1">
            {FEATURED_PROJECT.title}
          </h3>
          <p className="text-xs text-[#d8cebc] mb-4 leading-relaxed">
            {FEATURED_PROJECT.subheading}
          </p>

          {/* 4 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {FEATURED_PROJECT.metrics.map((m) => (
              <div key={m.label} className="p-2.5 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#a4b3c9] block mb-1">
                  {m.label}
                </span>
                <span className="text-sm font-bold text-[#F4EDE0] block">{m.after}</span>
                <span className="text-[10px] text-[#FF6B5B] font-mono font-semibold">{m.badge}</span>
              </div>
            ))}
          </div>

          {/* Key Engineering Solutions */}
          <div className="border-t border-[#F4EDE0]/10 pt-3 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF6B5B] block mb-2 font-semibold">
              💡 Engineered Capabilities:
            </span>
            <ul className="space-y-1.5 text-[#d8cebc]">
              {FEATURED_PROJECT.solutions.slice(0, 4).map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#FF6B5B] font-bold flex-shrink-0">›</span>
                  <span>
                    <strong className="text-[#F4EDE0]">{s.title}:</strong> {s.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F4EDE0]/10">
            {FEATURED_PROJECT.stack.map((s) => (
              <span key={s} className="px-2 py-0.5 font-mono text-[9px] bg-[#0d1627] text-[#F4EDE0] border border-[#F4EDE0]/15 rounded-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {PROJECTS.map((p) => (
            <div key={p.id} className="p-3.5 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded flex flex-col justify-between hover:border-[#FF6B5B]/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[9px] text-[#FF6B5B] tracking-wider uppercase font-semibold">{p.type}</span>
                  <span className="font-mono text-[9px] text-[#a4b3c9]">{p.period}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#F4EDE0] mb-2 flex items-center justify-between">
                  <span>{p.title}</span>
                  {p.url && (
                    <a href={`https://${p.url}`} target="_blank" rel="noreferrer" className="text-[#FF6B5B] hover:text-[#ffa196]">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </h4>
                <ul className="space-y-1 text-[#d8cebc] text-[11px] mb-3">
                  {p.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#FF6B5B] font-bold">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-[#F4EDE0]/10">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="px-1.5 py-0.5 font-mono text-[9px] bg-[#0d1627] text-[#F4EDE0]/90 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CertificationsOutput() {
  return (
    <div className="my-3 space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-[#F4EDE0]/10 pb-2">
        <span className="font-mono text-xs text-[#FF6B5B] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
          <Award size={14} className="text-[#FF6B5B]" />
          AWS Verified Credentials ({CERTIFICATIONS.length})
        </span>
        <span className="font-mono text-[10px] text-[#a4b3c9]">Click link to verify on Google Drive</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.badgeId}
            className="p-3.5 bg-[#14213D]/75 border border-[#F4EDE0]/15 hover:border-[#FF6B5B]/60 transition-all rounded group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6B5B]/5 rounded-full blur-xl" />
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF6B5B] font-semibold bg-[#FF6B5B]/15 px-2 py-0.5 border border-[#FF6B5B]/30 rounded-sm">
                {cert.issuer}
              </span>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-[#F4EDE0] hover:text-[#FF6B5B] flex items-center gap-1 bg-[#0d1627] px-2 py-0.5 border border-[#F4EDE0]/15 group-hover:border-[#FF6B5B]/50 transition-colors rounded-sm"
              >
                <span>Verify</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#F4EDE0] mb-1 group-hover:text-[#FF6B5B] transition-colors">
              {cert.title}
            </h4>
            <p className="text-[11px] text-[#d8cebc] leading-relaxed">
              {cert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceOutput() {
  return (
    <div className="my-3 space-y-3 font-sans">
      <div className="p-3 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#F4EDE0]">{EXPERIENCE.role}</h3>
          <span className="text-xs text-[#FF6B5B]">{EXPERIENCE.company} &nbsp;·&nbsp; {EXPERIENCE.location}</span>
        </div>
        <span className="font-mono text-[10px] text-[#FF6B5B] bg-[#FF6B5B]/15 px-2.5 py-1 border border-[#FF6B5B]/30 rounded-sm font-semibold">
          {EXPERIENCE.period}
        </span>
      </div>

      <div className="space-y-3">
        {EXPERIENCE.projects.map((proj) => (
          <div key={proj.name} className="p-3 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-xs font-semibold text-[#F4EDE0]">{proj.name}</h4>
              <span className="font-mono text-[9px] text-[#a4b3c9]">{proj.period}</span>
            </div>
            <p className="text-[10px] font-mono text-[#FF6B5B]/90 mb-2">{proj.stack}</p>
            <ul className="space-y-1 text-[#d8cebc] text-[11px]">
              {proj.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#FF6B5B] font-bold">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UpSkillingOutput() {
  return (
    <div className="my-3 space-y-3 font-sans">
      <div className="border-b border-[#F4EDE0]/10 pb-2">
        <span className="font-mono text-xs text-[#FF6B5B] uppercase tracking-widest font-semibold">
          Continuous UpSkilling &amp; Hands-On Lab Work
        </span>
      </div>

      {UPSKILLING.map((item) => (
        <div key={item.title} className="p-3.5 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#FF6B5B] uppercase tracking-wider font-semibold">{item.tagline}</span>
            <span className="font-mono text-[10px] text-[#F4EDE0] font-bold">{item.number}</span>
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-[#F4EDE0] mb-2">{item.title}</h4>
          <p className="text-[11px] text-[#d8cebc] mb-2 italic border-l border-[#FF6B5B]/50 pl-2">{item.headline}</p>
          <ul className="space-y-1 text-[#d8cebc] text-[11px] mb-3">
            {item.bullets.slice(0, 4).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#FF6B5B] font-bold">–</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1 pt-2 border-t border-[#F4EDE0]/10">
            {item.stack.map((s) => (
              <span key={s} className="px-1.5 py-0.5 font-mono text-[9px] bg-[#0d1627] text-[#F4EDE0] rounded-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsOutput() {
  return (
    <div className="my-3 space-y-3 font-sans">
      <div className="border-b border-[#F4EDE0]/10 pb-2">
        <span className="font-mono text-xs text-[#FF6B5B] uppercase tracking-widest font-semibold">
          Technical Arsenal ({SKILLS.reduce((acc, cat) => acc + cat.items.length, 0)} Skills)
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {SKILLS.map((cat) => (
          <div key={cat.cat} className="p-3 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF6B5B] font-semibold block mb-2">
              {cat.cat}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 text-[11px] bg-[#0d1627] text-[#F4EDE0] border border-[#F4EDE0]/15 rounded-sm hover:border-[#FF6B5B]/60 hover:text-[#FF6B5B] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AwsInfraOutput() {
  return (
    <div className="my-3 p-4 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-[#F4EDE0]/10 pb-2">
        <span className="text-[#FF6B5B] font-bold flex items-center gap-2">
          <Server size={14} /> AWS CLOUD ARCHITECTURE (ap-south-1)
        </span>
        <span className="text-[10px] text-[#F4EDE0] flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B5B] animate-pulse" /> HIGH AVAILABILITY
        </span>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="p-3 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[540px] text-[11px]">
          <div className="p-2 bg-[#14213D] border border-[#FF6B5B]/40 rounded text-center">
            <span className="text-[9px] text-[#a4b3c9] block">DNS</span>
            <span className="text-[#F4EDE0] font-bold">Route 53</span>
          </div>
          <ArrowRight size={14} className="text-[#FF6B5B]" />
          <div className="p-2 bg-[#14213D] border border-[#FF6B5B]/40 rounded text-center">
            <span className="text-[9px] text-[#a4b3c9] block">EDGE CDN</span>
            <span className="text-[#F4EDE0] font-bold">CloudFront</span>
          </div>
          <ArrowRight size={14} className="text-[#FF6B5B]" />
          <div className="p-2 bg-[#14213D] border border-[#FF6B5B]/40 rounded text-center">
            <span className="text-[9px] text-[#a4b3c9] block">GATEWAY</span>
            <span className="text-[#F4EDE0] font-bold">API Gateway / ALB</span>
          </div>
          <ArrowRight size={14} className="text-[#FF6B5B]" />
          <div className="p-2 bg-[#14213D] border border-[#FF6B5B] rounded text-center">
            <span className="text-[9px] text-[#FF6B5B] block font-semibold">COMPUTE</span>
            <span className="text-[#F4EDE0] font-bold">EC2 + Docker</span>
          </div>
          <ArrowRight size={14} className="text-[#FF6B5B]" />
          <div className="p-2 bg-[#14213D] border border-[#FF6B5B]/40 rounded text-center">
            <span className="text-[9px] text-[#a4b3c9] block">DATA</span>
            <span className="text-[#F4EDE0] font-bold">S3 · SQS · RDS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-2 bg-[#0d1627] border border-[#F4EDE0]/10 rounded">
          <span className="text-[#a4b3c9] block">VPC Security:</span>
          <span className="text-[#F4EDE0] font-semibold">Subnet Isolation + SGs</span>
        </div>
        <div className="p-2 bg-[#0d1627] border border-[#F4EDE0]/10 rounded">
          <span className="text-[#a4b3c9] block">Authentication:</span>
          <span className="text-[#F4EDE0] font-semibold">IAM Roles + OIDC</span>
        </div>
        <div className="p-2 bg-[#0d1627] border border-[#F4EDE0]/10 rounded">
          <span className="text-[#a4b3c9] block">Artifact Storage:</span>
          <span className="text-[#F4EDE0] font-semibold">Amazon S3 Versioning</span>
        </div>
        <div className="p-2 bg-[#0d1627] border border-[#F4EDE0]/10 rounded">
          <span className="text-[#a4b3c9] block">Queueing:</span>
          <span className="text-[#F4EDE0] font-semibold">Amazon SQS FIFO/Std</span>
        </div>
      </div>
    </div>
  );
}

export function DockerPsOutput() {
  const containers = [
    { id: "a8f93e1b20c4", image: "cloudops/api:latest", name: "cloudops-ai-fastapi", status: "Up 14 days", port: "0.0.0.0:8000->8000" },
    { id: "b1c48d2e99a1", image: "mysql:8.0-debian", name: "cloudops-mysql-db", status: "Up 14 days", port: "3306/tcp" },
    { id: "c7d8102f44b2", image: "gitlab/gitlab-runner:v16", name: "iis-blue-green-runner", status: "Up 3 weeks", port: "internal" },
    { id: "d9e031a57c18", image: "openclip/worker:v2", name: "sqs-image-worker", status: "Up 5 days", port: "worker-mode" },
  ];

  return (
    <div className="my-3 p-3 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded font-mono text-[11px] space-y-2">
      <div className="flex items-center justify-between text-xs text-[#FF6B5B] border-b border-[#F4EDE0]/10 pb-1.5 font-bold">
        <span>🐳 DOCKER DAEMON — CONTAINER WORKBENCH</span>
        <span className="text-[#F4EDE0] text-[10px]">ALL 4 CONTAINERS RUNNING</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px]">
          <thead>
            <tr className="text-[#a4b3c9] border-b border-[#F4EDE0]/10">
              <th className="py-1">CONTAINER ID</th>
              <th className="py-1">IMAGE</th>
              <th className="py-1">NAMES</th>
              <th className="py-1">STATUS</th>
              <th className="py-1">PORTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4EDE0]/10">
            {containers.map((c) => (
              <tr key={c.id} className="hover:bg-[#FF6B5B]/5">
                <td className="py-1.5 text-[#FF6B5B] font-mono">{c.id}</td>
                <td className="py-1.5 text-[#F4EDE0]">{c.image}</td>
                <td className="py-1.5 text-[#F4EDE0] font-bold">{c.name}</td>
                <td className="py-1.5 text-[#a4b3c9]">{c.status}</td>
                <td className="py-1.5 text-[#FF6B5B]">{c.port}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EducationOutput() {
  return (
    <div className="my-3 space-y-3 font-sans">
      <div className="border-b border-[#F4EDE0]/10 pb-2">
        <span className="font-mono text-xs text-[#FF6B5B] uppercase tracking-widest font-semibold">
          Academic Background
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {EDUCATION.map((edu) => (
          <div key={edu.degree} className="p-3.5 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block mb-1">
              {edu.period}
            </span>
            <h4 className="text-sm font-semibold text-[#F4EDE0] mb-1">{edu.degree}</h4>
            <p className="text-xs text-[#d8cebc] mb-3">{edu.institution}</p>
            <div className="flex items-baseline gap-2 pt-2 border-t border-[#F4EDE0]/10">
              <span className="font-mono text-[10px] text-[#a4b3c9] uppercase">CGPA:</span>
              <span className="font-mono text-base font-bold text-[#FF6B5B]">{edu.cgpa}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactOutput() {
  return (
    <div className="my-3 p-4 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded font-sans space-y-3">
      <div className="border-b border-[#F4EDE0]/10 pb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#F4EDE0]">{CONTACT.name}</h3>
          <p className="text-xs text-[#FF6B5B]">{CONTACT.title}</p>
        </div>
        <span className="text-[10px] font-mono text-[#FF6B5B] bg-[#FF6B5B]/15 px-2 py-0.5 border border-[#FF6B5B]/30 rounded-sm font-semibold">
          Available Immediately
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-xs">
        <a
          href={`mailto:${CONTACT.email}`}
          className="p-2.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-2.5 text-[#F4EDE0] transition-colors rounded"
        >
          <Mail size={14} className="text-[#FF6B5B] flex-shrink-0" />
          <span className="truncate">{CONTACT.email}</span>
        </a>
        <a
          href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`}
          className="p-2.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-2.5 text-[#F4EDE0] transition-colors rounded"
        >
          <Phone size={14} className="text-[#FF6B5B] flex-shrink-0" />
          <span>{CONTACT.phone}</span>
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-2.5 text-[#F4EDE0] transition-colors rounded"
        >
          <Github size={14} className="text-[#FF6B5B] flex-shrink-0" />
          <span>github.com/{CONTACT.githubUser}</span>
        </a>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-2.5 text-[#F4EDE0] transition-colors rounded"
        >
          <Linkedin size={14} className="text-[#FF6B5B] flex-shrink-0" />
          <span>linkedin.com/in/{CONTACT.linkedinUser}</span>
        </a>
      </div>

      <div className="text-[10px] font-mono text-[#a4b3c9] flex items-center gap-1.5 pt-1">
        <MapPin size={11} className="text-[#FF6B5B]" />
        <span>{CONTACT.location} · Open to On-site / Hybrid / Remote DevOps roles</span>
      </div>
    </div>
  );
}
