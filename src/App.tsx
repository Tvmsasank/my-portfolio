import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown, ArrowUpRight, BriefcaseBusiness, Cloud, Code2,
  Github, Linkedin, Mail, MapPin, Network, Server, ShieldCheck,
  Terminal as TerminalIcon, Workflow, ChevronDown, ExternalLink
} from "lucide-react";
import { BootSequence } from "./components/BootSequence";
import { TerminalShell } from "./components/TerminalShell";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, PROJECTS, SKILL_GROUPS } from "./data/portfolio";
import "./styles/terminal.css";
import "./styles/portfolio-sections.css";

const NAV = ["Projects", "Experience", "Skills", "Education", "Contact"];

function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><div className="section-kicker"><span>{index}</span><i />{eyebrow}</div><h2>{title}<span className="blue-period">.</span></h2>{copy && <p>{copy}</p>}</div>;
}

function AppContent() {
  const [activeProject, setActiveProject] = useState<string | null>("cloudops");

  const normalizeProjectId = (id: string): string => {
    if (id === "exam-gen" || id === "university-question-system" || id === "question") return "question-system";
    if (id === "blue-green" || id === "bluegreen-cicd") return "bluegreen";
    return id;
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProject = (rawId: string) => {
    const id = normalizeProjectId(rawId);
    setActiveProject(id);
    setTimeout(() => {
      document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleTerminalProjectSelect = (rawId: string) => {
    const id = normalizeProjectId(rawId);
    if (PROJECTS.some((project) => project.id === id)) {
      setActiveProject(id);
    }
  };

  return (
    <div className="portfolio-root">
      <TerminalShell
        onProjectSelect={handleTerminalProjectSelect}
        onBrowseProjects={() => scrollToSection("projects")}
      />
      <nav className="portfolio-nav" aria-label="Main navigation">
        <a className="nav-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span>V.</span> VENKATAMANI SASANK</a>
        <div className="nav-links">{NAV.map((item) => <button key={item} onClick={() => scrollToSection(item.toLowerCase())}>{item}</button>)}</div>
        <a className="nav-contact" href="mailto:shashank.manikanta@gmail.com">LET'S TALK <ArrowUpRight size={13} /></a>
      </nav>

      <main className="portfolio-content">
        <section className="about-section content-section" id="about">
          <SectionHeading index="01" eyebrow="PROFILE" title="Engineering across code and cloud" copy="I work across application development and cloud delivery — building backend systems, automating deployments and learning how reliable infrastructure is designed and operated." />
          <div className="about-grid">
            <div className="about-copy"><p className="about-lead">I'm <strong>Venkatamani Sasank</strong>, a Software Developer at ICFAI Group with a strong focus on AWS Cloud, DevOps and .NET engineering.</p><p>My work spans ASP.NET MVC applications, SQL Server data workflows, CI/CD pipelines, AWS infrastructure and AI-enabled systems. I enjoy understanding the full path from a developer's commit to a working application in an environment.</p><p>This portfolio is designed as an interactive workspace: use the terminal above, or browse the project case studies below for the implementation details.</p><div className="about-tags"><span>APPLICATION DEVELOPMENT</span><span>CLOUD INFRASTRUCTURE</span><span>DELIVERY AUTOMATION</span></div></div>
            <div className="profile-facts"><div><span>BASE</span><strong><MapPin size={14} /> Hyderabad, India</strong></div><div><span>ROLE</span><strong>Software Developer</strong></div><div><span>FOCUS</span><strong>AWS Cloud · DevOps · .NET</strong></div><div><span>WORK MODE</span><strong>Build / Automate / Improve</strong></div></div>
          </div>
        </section>

        <section className="projects-section content-section" id="projects">
          <SectionHeading index="02" eyebrow="SELECTED WORK" title="Projects, with the engineering left in" copy="Not just project names. Open a case study to see the problem, the system design, the implementation work and the technologies involved." />
          <div className="project-list">
            {PROJECTS.map((project) => {
              const open = activeProject === project.id;
              return (
                <article className={`project-card ${open ? "is-open" : ""}`} key={project.id} id={`project-${project.id}`}>
                  <button className="project-summary" onClick={() => setActiveProject(open ? null : project.id)} aria-expanded={open}>
                    <span className="project-number">{project.number}</span>
                    <span className="project-title-wrap"><small>{project.category}</small><strong>{project.title}</strong><em>{project.period}</em></span>
                    <span className="project-status">{project.status}</span>
                    <span className="project-toggle"><ChevronDown size={17} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="project-detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="project-summary-copy">{project.summary}</p>
                        <div className="project-detail-grid">
                          <div className="detail-block"><span className="detail-label">THE PROBLEM / CONTEXT</span><p>{project.problem}</p></div>
                          <div className="detail-block"><span className="detail-label">SYSTEM FLOW</span><div className="architecture-flow">{project.architecture.map((node, i) => <div className="architecture-node" key={node}><span>{String(i + 1).padStart(2, "0")}</span>{node}{i < project.architecture.length - 1 && <i />}</div>)}</div></div>
                        </div>
                        <div className="detail-block implementation-block"><span className="detail-label">IMPLEMENTATION DETAILS</span><ul>{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul></div>
                        <div className="detail-block"><span className="detail-label">ENGINEERING OUTCOMES</span><ul className="outcome-list">{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div>
                        <div className="project-bottom"><div className="tech-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.link && <a className="project-link" href={project.link.href} target="_blank" rel="noreferrer">{project.link.label} <ExternalLink size={13} /></a>}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </section>

        <section className="experience-section content-section" id="experience">
          <SectionHeading index="03" eyebrow="CAREER" title="Where I build and contribute" copy="Professional experience and the application work carried out alongside cloud and DevOps initiatives." />
          <div className="experience-timeline">{EXPERIENCE.map((job) => <article className="experience-card" key={job.company}><div className="experience-marker"><BriefcaseBusiness size={16} /></div><div className="experience-top"><div><span className="detail-label">{job.period}</span><h3>{job.role}</h3><p>{job.company} <span>·</span> {job.location}</p></div><span className="experience-current">CURRENT ROLE</span></div><p className="experience-description">{job.description}</p><ul>{job.highlights.map((line) => <li key={line}>{line}</li>)}</ul><div className="experience-project-links"><button onClick={() => scrollToProject("cloudops")}>CloudOps AI Platform <ArrowUpRight size={12} /></button><button onClick={() => scrollToProject("refund")}>Refund Note Management <ArrowUpRight size={12} /></button><button onClick={() => scrollToProject("irctc")}>IRCTC Clone <ArrowUpRight size={12} /></button><button onClick={() => scrollToProject("question-system")}>AI-Powered University Question System <ArrowUpRight size={12} /></button></div></article>)}</div>
        </section>

        <section className="skills-section content-section" id="skills">
          <SectionHeading index="04" eyebrow="TECHNICAL TOOLKIT" title="Tools I work with" copy="Grouped by the engineering problems they help me solve, rather than a wall of disconnected logos." />
          <div className="skills-grid">{SKILL_GROUPS.map((group, i) => <article className="skill-card" key={group.title}><div className="skill-card-top"><span>0{i + 1}</span>{i === 0 ? <Cloud /> : i === 1 ? <Workflow /> : i === 2 ? <Code2 /> : i === 3 ? <Network /> : <TerminalIcon />}</div><h3>{group.title}</h3><p>{group.note}</p><div className="skill-pills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
        </section>

        <section className="architecture-section content-section" id="approach">
          <SectionHeading index="05" eyebrow="ENGINEERING APPROACH" title="From commit to running service" copy="The common thread across my work is connecting application code with the infrastructure and delivery process around it." />
          <div className="delivery-rail"><div><span>01 / SOURCE</span><Github /><strong>Version control</strong><small>Git · GitHub · GitLab</small></div><i /><div><span>02 / BUILD</span><Code2 /><strong>Build & validate</strong><small>.NET · Maven · Tests</small></div><i /><div><span>03 / PACKAGE</span><Server /><strong>Artifact & image</strong><small>ZIP · JAR · Docker</small></div><i /><div><span>04 / DEPLOY</span><Workflow /><strong>Release automation</strong><small>Actions · Jenkins · GitLab CI</small></div><i /><div><span>05 / OPERATE</span><ShieldCheck /><strong>Run & verify</strong><small>Linux · IIS · AWS</small></div></div>
        </section>

        <section className="education-section content-section" id="education">
          <SectionHeading index="06" eyebrow="BACKGROUND" title="Education & certifications" />
          <div className="education-grid"><div className="education-column"><h3>EDUCATION</h3>{EDUCATION.map((item) => <article className="education-card" key={item.degree}>{item.period && <span>{item.period}</span>}<strong>{item.degree}</strong>{item.institution && <p>{item.institution}</p>}{item.result && <em>{item.result}</em>}</article>)}</div><div className="cert-column"><h3>CERTIFICATES / AWS</h3>{CERTIFICATIONS.map((cert, i) => <a className="cert-card" href={cert.href} target="_blank" rel="noreferrer" key={cert.title}><span className="cert-index">0{i + 1}</span><span className="cert-copy"><strong>{cert.title}</strong><small>{cert.issuer} · {cert.description}</small></span><ArrowUpRight size={15} /></a>)}</div></div>
        </section>

        <section className="contact-section content-section" id="contact">
          <div className="contact-grid"><div><div className="section-kicker"><span>07</span><i />CONTACT</div><h2>Have a system<br /><em>to build?</em></h2><p>I'm interested in opportunities around AWS Cloud, DevOps engineering and .NET application development.</p></div><div className="contact-links"><a href="mailto:shashank.manikanta@gmail.com"><Mail /><span><small>EMAIL</small><strong>shashank.manikanta@gmail.com</strong></span><ArrowUpRight /></a><a href="https://github.com/Tvmsasank" target="_blank" rel="noreferrer"><Github /><span><small>GITHUB</small><strong>github.com/Tvmsasank</strong></span><ArrowUpRight /></a><a href="https://linkedin.com/in/venkatamani-sasank" target="_blank" rel="noreferrer"><Linkedin /><span><small>LINKEDIN</small><strong>venkatamani-sasank</strong></span><ArrowUpRight /></a><div className="contact-location"><MapPin /><span><small>LOCATION</small><strong>Hyderabad, India</strong></span></div></div></div>
        </section>
      </main>
      <footer className="portfolio-end"><span>© 2026 VENKATAMANI SASANK</span><span>BUILT WITH REACT / TYPESCRIPT / A LITTLE CURIOSITY</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP <ArrowDown size={12} /></button></footer>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  return !booted ? <BootSequence onComplete={() => setBooted(true)} /> : <AppContent />;
}
