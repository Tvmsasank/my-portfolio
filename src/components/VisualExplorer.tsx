import { motion } from "motion/react";
import {
  ExternalLink,
  Award,
  Zap,
  Clock,
  RotateCcw,
  ShieldCheck,
  Server,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  Terminal as TerminalIcon,
  Layers,
  ChevronRight,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function VisualExplorer() {
  return (
    <div className="space-y-12 py-4">
      {/* ── 1. FEATURED ENTERPRISE PROJECT ───────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="relative bg-[#14213D]/75 backdrop-blur-xl border border-[#F4EDE0]/15 p-6 sm:p-9 rounded-lg overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FF6B5B] via-[#ffa196] to-[#F4EDE0]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B5B]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#F4EDE0]/10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] bg-[#FF6B5B]/15 text-[#FF6B5B] border border-[#FF6B5B]/30 uppercase font-semibold rounded-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF6B5B] animate-pulse" />
                Featured Enterprise DevOps
              </span>
              <span className="font-mono text-[11px] text-[#a4b3c9] hidden sm:inline">
                · {FEATURED_PROJECT.period}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#F4EDE0] bg-[#0d1627] px-3 py-1 border border-[#F4EDE0]/15 rounded-sm">
              {FEATURED_PROJECT.role}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#F4EDE0] mb-2">
            {FEATURED_PROJECT.title}
          </h2>
          <p className="text-sm sm:text-base text-[#d8cebc] leading-relaxed mb-6 font-medium">
            {FEATURED_PROJECT.subheading}
          </p>

          {/* 4 Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {FEATURED_PROJECT.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 bg-[#0d1627]/90 border border-[#F4EDE0]/15 hover:border-[#FF6B5B]/60 transition-colors rounded-sm"
              >
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#a4b3c9] block mb-1">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-display text-[#F4EDE0] block mb-1">
                  {m.after}
                </span>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F4EDE0]/10 mt-2">
                  <span className="text-[#a4b3c9] line-through text-[10px]">{m.before}</span>
                  <span className="font-mono text-[10px] text-[#FF6B5B] font-semibold">{m.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Engineered Solution */}
          <div className="grid md:grid-cols-12 gap-6 mb-6 pt-6 border-t border-[#F4EDE0]/10">
            <div className="md:col-span-5 bg-[#0d1627]/90 p-5 border border-[#F4EDE0]/10 rounded-sm">
              <span className="font-mono text-xs uppercase text-[#FF6B5B] tracking-wider font-semibold block mb-3">
                🎯 The Challenge
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#d8cebc] leading-relaxed">
                {FEATURED_PROJECT.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#FF6B5B] font-bold mt-0.5">✕</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-7 bg-[#0d1627]/90 p-5 border border-[#F4EDE0]/10 rounded-sm">
              <span className="font-mono text-xs uppercase text-[#F4EDE0] tracking-wider font-semibold block mb-3">
                💡 Engineered Solutions
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#d8cebc] leading-relaxed">
                {FEATURED_PROJECT.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#FF6B5B] font-bold mt-0.5">✔</span>
                    <span>
                      <strong className="text-[#F4EDE0]">{s.title}:</strong> {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[#F4EDE0]/10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#a4b3c9] mr-2">
              Tech Stack:
            </span>
            {FEATURED_PROJECT.stack.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 font-mono text-[10px] bg-[#0d1627] text-[#F4EDE0] border border-[#F4EDE0]/15 rounded-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 2. AWS CERTIFICATIONS ─────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F4EDE0]/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
              Credentials
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F4EDE0] flex items-center gap-2">
              <Award className="text-[#FF6B5B]" size={22} />
              AWS Certifications ({CERTIFICATIONS.length})
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[#a4b3c9] hidden sm:inline">
            Verified on Google Drive
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.badgeId}
              className="p-5 bg-[#14213D]/70 border border-[#F4EDE0]/15 hover:border-[#FF6B5B]/60 transition-all rounded-lg group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF6B5B] via-[#ffa196] to-[#F4EDE0] opacity-60 group-hover:opacity-100" />
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF6B5B] bg-[#FF6B5B]/15 px-2.5 py-1 border border-[#FF6B5B]/30 rounded-sm font-semibold">
                    {cert.issuer}
                  </span>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-[#F4EDE0] hover:text-[#FF6B5B] flex items-center gap-1 group-hover:underline"
                  >
                    <span>View Credential</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <h4 className="text-base font-semibold text-[#F4EDE0] mb-2 group-hover:text-[#FF6B5B] transition-colors">
                  {cert.title}
                </h4>
                <p className="text-xs text-[#d8cebc] leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F4EDE0]/10 flex items-center justify-between text-[11px] font-mono text-[#a4b3c9]">
                <span>Status: Verified</span>
                <span className="text-[#FF6B5B] font-bold">100% Validated</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 3. EXPERIENCE (ICFAI GROUP) ────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F4EDE0]/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
              Employment
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F4EDE0]">
              Professional Experience
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[#FF6B5B] bg-[#FF6B5B]/15 px-3 py-1 border border-[#FF6B5B]/30 rounded-sm font-semibold">
            {EXPERIENCE.period}
          </span>
        </div>

        <div className="p-6 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded-lg">
          <div className="mb-6 pb-4 border-b border-[#F4EDE0]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-lg font-bold text-[#F4EDE0]">{EXPERIENCE.role}</h4>
              <p className="text-sm text-[#FF6B5B]">{EXPERIENCE.company} · {EXPERIENCE.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.projects.map((proj) => (
              <div key={proj.name} className="p-4 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h5 className="text-sm font-semibold text-[#F4EDE0]">{proj.name}</h5>
                  <span className="font-mono text-[10px] text-[#a4b3c9]">{proj.period}</span>
                </div>
                <p className="text-[11px] font-mono text-[#FF6B5B]/90 mb-3">{proj.stack}</p>
                <ul className="space-y-1.5 text-xs text-[#d8cebc]">
                  {proj.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF6B5B] font-bold mt-0.5">◆</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 4. UPSKILLING (AWS CI/CD & JENKINS) ────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="space-y-6"
      >
        <div className="pb-3 border-b border-[#F4EDE0]/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
            Hands-On Mastery
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F4EDE0]">
            Continuous UpSkilling Journey
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {UPSKILLING.map((item) => (
            <div
              key={item.title}
              className="p-6 bg-[#14213D]/70 border border-[#F4EDE0]/15 hover:border-[#FF6B5B]/50 transition-all rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#FF6B5B] uppercase tracking-widest font-semibold">{item.tagline}</span>
                  <span className="font-mono text-sm font-bold text-[#F4EDE0]">{item.number}</span>
                </div>
                <h4 className="text-base font-bold text-[#F4EDE0] mb-3">{item.title}</h4>
                <p className="text-xs text-[#d8cebc] mb-4 italic leading-relaxed border-l-2 border-[#FF6B5B]/60 pl-3">
                  {item.headline}
                </p>
                <ul className="space-y-2 text-xs text-[#a4b3c9] mb-6">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF6B5B] font-bold flex-shrink-0">–</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F4EDE0]/10">
                {item.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 font-mono text-[9px] bg-[#0d1627] text-[#F4EDE0] border border-[#F4EDE0]/15 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 5. OTHER PROJECTS ──────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="space-y-6"
      >
        <div className="pb-3 border-b border-[#F4EDE0]/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
            Work Portfolio
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F4EDE0]">
            Other Selected Projects
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="p-5 bg-[#14213D]/70 border border-[#F4EDE0]/15 hover:border-[#FF6B5B]/50 transition-all rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-[#FF6B5B] tracking-wider uppercase font-semibold">{p.type}</span>
                  <span className="font-mono text-[10px] text-[#a4b3c9]">{p.period}</span>
                </div>
                <h4 className="text-base font-semibold text-[#F4EDE0] mb-3 flex items-center justify-between">
                  <span>{p.title}</span>
                  {p.url && (
                    <a
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FF6B5B] hover:text-[#ffa196] transition-colors"
                      aria-label={`Visit ${p.title}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#d8cebc] mb-4">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF6B5B] text-[8px] mt-1">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F4EDE0]/10">
                {p.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 font-mono text-[9px] bg-[#0d1627] text-[#F4EDE0]/90 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 6. SKILLS & EDUCATION ──────────────────────────────── */}
      <div className="grid md:grid-cols-12 gap-6">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="md:col-span-8 p-6 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded-lg space-y-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
            Capabilities
          </span>
          <h3 className="text-xl font-bold font-display text-[#F4EDE0] mb-4">
            Technical Arsenal
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {SKILLS.map((cat) => (
              <div key={cat.cat} className="p-3.5 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF6B5B] font-semibold block mb-2">
                  {cat.cat}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 text-xs bg-[#14213D] text-[#F4EDE0] border border-[#F4EDE0]/15 rounded-sm hover:border-[#FF6B5B]/50 hover:text-[#FF6B5B] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="md:col-span-4 p-6 bg-[#14213D]/70 border border-[#F4EDE0]/15 rounded-lg space-y-4 flex flex-col justify-between"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
              Education
            </span>
            <h3 className="text-xl font-bold font-display text-[#F4EDE0] mb-4">
              Academic Background
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="p-3.5 bg-[#0d1627]/90 border border-[#F4EDE0]/10 rounded-sm">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="text-sm font-semibold text-[#F4EDE0] mb-1">{edu.degree}</h4>
                  <p className="text-xs text-[#d8cebc] mb-2">{edu.institution}</p>
                  <div className="flex items-baseline gap-2 pt-2 border-t border-[#F4EDE0]/10">
                    <span className="font-mono text-[10px] text-[#a4b3c9]">CGPA:</span>
                    <span className="font-mono text-sm font-bold text-[#FF6B5B]">{edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* ── 7. CONTACT CHANNELS ────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="p-6 sm:p-8 bg-[#14213D]/80 border border-[#F4EDE0]/15 rounded-lg relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F4EDE0]/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6B5B] block mb-1 font-semibold">
              Get in Touch
            </span>
            <h3 className="text-2xl font-bold font-display text-[#F4EDE0]">
              Let&apos;s Connect &amp; Collaborate
            </h3>
            <p className="text-sm text-[#d8cebc] mt-1">
              Based in {CONTACT.location} · {CONTACT.availability}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] bg-[#FF6B5B]/15 text-[#FF6B5B] border border-[#FF6B5B]/30 rounded-sm whitespace-nowrap font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#FF6B5B] animate-pulse" />
            Open for Roles
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="p-3.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-3 text-[#F4EDE0] transition-all rounded-sm hover:-translate-y-0.5"
          >
            <Mail size={16} className="text-[#FF6B5B] flex-shrink-0" />
            <div className="min-w-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block">Email</span>
              <span className="text-xs truncate block">{CONTACT.email}</span>
            </div>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`}
            className="p-3.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-3 text-[#F4EDE0] transition-all rounded-sm hover:-translate-y-0.5"
          >
            <Phone size={16} className="text-[#FF6B5B] flex-shrink-0" />
            <div className="min-w-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block">Phone</span>
              <span className="text-xs truncate block">{CONTACT.phone}</span>
            </div>
          </a>

          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-3 text-[#F4EDE0] transition-all rounded-sm hover:-translate-y-0.5"
          >
            <Github size={16} className="text-[#FF6B5B] flex-shrink-0" />
            <div className="min-w-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block">GitHub</span>
              <span className="text-xs truncate block">@{CONTACT.githubUser}</span>
            </div>
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 bg-[#0d1627] border border-[#F4EDE0]/15 hover:border-[#FF6B5B] flex items-center gap-3 text-[#F4EDE0] transition-all rounded-sm hover:-translate-y-0.5"
          >
            <Linkedin size={16} className="text-[#FF6B5B] flex-shrink-0" />
            <div className="min-w-0">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a4b3c9] block">LinkedIn</span>
              <span className="text-xs truncate block">/in/{CONTACT.linkedinUser}</span>
            </div>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
