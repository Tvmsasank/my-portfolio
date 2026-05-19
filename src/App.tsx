import { useState, useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Award,
} from "lucide-react";

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ── Scroll-triggered section wrapper ─────────────────────────────────────────

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Sri Aditya Enterprises",
    type: "Business Website",
    period: "Jan 2026",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "AWS S3", "CloudFront", "Route 53", "ACM"],
    bullets: [
      "Responsive SPA built with React, Vite, TypeScript, and Tailwind CSS",
      "WhatsApp API integration for direct customer engagement",
      "Deployed on AWS S3 (static hosting), CloudFront CDN, Route 53 DNS, ACM SSL",
    ],
    url: "sriadityaenterprises.com",
  },
  {
    title: "AWS Serverless Math App",
    type: "Cloud Architecture",
    period: "Feb 2025",
    stack: ["AWS Lambda", "API Gateway", "DynamoDB", "Amplify"],
    bullets: [
      "Serverless compute pipeline via Lambda, API Gateway, and DynamoDB",
      "REST API architecture triggering Lambda functions for math computations",
    ],
    url: null,
  },
  {
    title: "AWS 3-Tier Architecture",
    type: "Infrastructure Design",
    period: "Nov 2024",
    stack: ["EC2", "RDS", "VPC", "Load Balancer", "IAM", "Auto Scaling"],
    bullets: [
      "Scalable 3-tier design with EC2, RDS, Load Balancer, and VPC",
      "High availability via Auto Scaling and Multi-AZ RDS deployment",
      "Security hardened with IAM roles, Security Groups, and subnet isolation",
    ],
    url: null,
  },
  {
    title: "Sarcasm Detection — ML",
    type: "Machine Learning",
    period: "Apr – Aug 2024",
    stack: ["Python", "SVM", "Random Forest", "NLP"],
    bullets: [
      "SVM and Random Forest classifiers for text-based sarcasm detection",
      "Full pipeline: data preprocessing, feature extraction, and model evaluation",
    ],
    url: null,
  },
];

const SKILLS = [
  {
    cat: "Cloud / AWS",
    items: ["S3", "EC2", "RDS", "Lambda", "API Gateway", "CloudFront", "Route 53", "IAM"],
  },
  { cat: "Languages", items: ["C", "C#", "JavaScript"] },
  { cat: "DevOps", items: ["Git", "GitHub", "Docker", "Linux"] },
  { cat: "Frameworks", items: ["ASP.NET MVC"] },
  { cat: "Databases", items: ["MS SQL Server"] },
  { cat: "Tools", items: ["Visual Studio 2022", "VSCode"] },
];

const FLOATING_TECH = [
  "AWS",
  "Docker",
  "React",
  ".NET",
  "Linux",
  "CI/CD",
  "EC2",
  "Cloud",
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {

  const [showNavbarName, setShowNavbarName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbarName(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans text-foreground bg-[linear-gradient(to_bottom_right,#030712_0%,#07111f_20%,#0f172a_45%,#132238_70%,#1d4ed8_140%)]">      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        .font-display { font-family: "Playfair Display", Georgia, serif; }
        .font-mono-label { font-family: "JetBrains Mono", ui-monospace, monospace; }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/92 backdrop-blur-md border-b border-border"
            : ""
        }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4 overflow-hidden">
        <motion.button
          onClick={() => goto("hero")}
          initial={{ opacity: 0, y: -12 }}
          animate={{
            opacity: showNavbarName ? 1 : 0,
            y: showNavbarName ? 0 : -12,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`font-display text-sm tracking-[0.22em] uppercase text-primary hover:opacity-70 transition-opacity cursor-pointer ${showNavbarName ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          Venkatamani Sasank
        </motion.button>
          <nav className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((n) => (
              <button
                key={n}
                onClick={() => goto(n.toLowerCase())}
                className="font-mono-label text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"              >
                {n}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
        <div className="md:hidden bg-[#07111ff2] backdrop-blur-md border-b border-white/10 px-6 py-6 space-y-5">            
            {NAV_ITEMS.map((n) => (
              <button
                key={n}
                onClick={() => goto(n.toLowerCase())}
                className="block font-mono-label text-[11px] tracking-[0.22em] uppercase text-foreground w-full text-left"
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 text-center overflow-hidden pt-14 md:pt-20 pb-16 md:pb-20"        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(96,165,250,0.08) 1.5px, transparent 1.5px)",
              backgroundSize: "36px 36px",
            }}
          />
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] rounded-full bg-gradient-to-r from-blue-500/20 via-sky-400/10 to-white/10 blur-[160px]" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden max-md:-mt-10">              <motion.span
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="block font-mono-label text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.42em] text-primary uppercase mb-8 leading-relaxed"            >
              AWS DevOps &nbsp;·&nbsp; .NET Developer &nbsp;·&nbsp; Hyderabad
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, delay: 0.42, ease: "easeOut" }}
              className="font-display font-black text-[clamp(2.8rem,8vw,11rem)] leading-[0.88] tracking-[-0.03em] text-foreground mb-8"
            >
              Venkatamani
              <br />
              <em className="text-primary not-italic">Sasank</em>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.95, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto h-px bg-border origin-left mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.1 }}
              className="text-muted-foreground text-[15px] sm:text-lg md:text-xl max-w-[92%] sm:max-w-2xl md:max-w-3xl mx-auto leading-[1.85] mb-12 md:mb-14">
              
              </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.28 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full pointer-events-auto"            >
              <button
                onClick={() => goto("projects")}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.35)] hover:shadow-[0_0_55px_rgba(56,189,248,0.55)] text-primary-foreground font-mono-label text-[10px] tracking-[0.28em] uppercase hover:bg-gradient-to-r from-blue-600 to-sky-400/82 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                View Projects
              </button>
              <button
                onClick={() => goto("contact")}
                className="w-full sm:w-auto px-8 py-3.5 border border-border font-mono-label text-[10px] tracking-[0.28em] uppercase text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Get In Touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55 }}
              className="flex items-center justify-center gap-7 pointer-events-auto"
            >
              {[
                {
                  href: "https://github.com/Tvmsasank",
                  Icon: Github,
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/venkatamani-sasank",
                  Icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://mail.google.com/mail/?view=cm&fs=1&to=shashank.manikanta@gmail.com",
                  Icon: Mail,
                  label: "Email",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:-translate-y-0.5 transform"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.button
            onClick={() => goto("about")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors pointer-events-auto"
          >
            <span className="font-mono-label text-[9px] tracking-[0.42em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={14} />
            </motion.div>
          </motion.button>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 md:py-36 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] py-2 tracking-[0.38em] text-primary uppercase mb-12"
              >
                01 / About
              </motion.p>

              <div className="grid md:grid-cols-[260px_1fr] gap-14 md:gap-24 items-start">
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-4xl md:text-5xl leading-tight text-foreground"
                >
                  Career
                  <br />
                  Intentions
                </motion.h2>

                <div>
                  <motion.p
                    variants={fadeUp}
                    className="text-muted-foreground text-lg leading-relaxed mb-5"
                  >
                    Aspiring AWS DevOps Engineer with a background in .NET full
                    stack development, currently learning cloud infrastructure,
                    CI/CD, and automation tools.
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    className="text-muted-foreground leading-relaxed mb-9"
                  >
                    Eager to apply foundational AWS knowledge and collaborate on
                    building scalable, reliable systems while advancing in DevOps
                    practices.
                  </motion.p>
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap gap-2.5"
                  >
                    {[
                      "AWS Cloud",
                      "DevOps",
                      ".NET Development",
                      "CI/CD Pipelines",
                      "Infrastructure Automation",
                    ].map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1.5 border border-border/60 font-mono-label text-[9px] tracking-[0.14em] text-muted-foreground uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
        <section
          id="experience"
          className="py-28 md:py-36 px-6 border-t border-border"
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] tracking-[0.38em] text-primary uppercase mb-12"
              >
                02 / Experience
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-6xl text-foreground mb-14"
              >
                {"Where I've Worked"}
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="relative bg-card border border-border/60 p-8 md:p-12 overflow-hidden group hover:border-primary/25 transition-all duration-500"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-blue-600 to-sky-400" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <p className="font-mono-label text-[9px] tracking-[0.32em] text-primary/70 uppercase mb-2.5">
                        Current Position
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-foreground">
                        Software Developer
                      </h3>
                      <p className="text-sm text-primary/75 mt-1.5 tracking-wide">
                        ICFAI Group &nbsp;·&nbsp; Hyderabad
                      </p>
                    </div>
                    <span className="font-mono-label text-[11px] text-muted-foreground tracking-wider whitespace-nowrap pt-0.5">
                      Sep 2025 — Present
                    </span>
                  </div>

                  <p className="font-mono-label text-[10px] tracking-wider text-muted-foreground mb-8 pb-6 border-b border-border/40">
                    Project: IRCTC Clone &nbsp;·&nbsp; C# &nbsp;·&nbsp; ASP.NET
                    MVC &nbsp;·&nbsp; Visual Studio 2022
                  </p>

                  <ul className="space-y-4">
                    {[
                      "Developed a full-featured IRCTC Clone using ASP.NET MVC, C#, and SQL Server",
                      "Implemented booking logic (CNF/RAC/WL), pricing engine, and session handling",
                      "Designed admin panel with CRUD operations for Trains, Routes, and Schedules",
                      "Built responsive UI with Bootstrap, improving page load performance across devices",
                    ].map((pt, i) => (
                      <li key={i} className="flex items-start gap-3.5">
                        <span className="text-primary text-[9px] mt-1.5 flex-shrink-0">
                          ◆
                        </span>
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────── */}
        <section
          id="projects"
          className="py-28 md:py-36 px-6 border-t border-border"
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] tracking-[0.38em] text-primary uppercase mb-12"
              >
                03 / Projects
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-6xl text-foreground mb-14"
              >
                Selected Work
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.map((p) => (
                  <motion.article
                    key={p.title}
                    variants={fadeUp}
                    className="relative bg-white/[0.03] min-h-[340px] backdrop-blur-xl border border-white/10 p-8 overflow-hidden group hover:border-blue-400/40 transition-all duration-700 ease-out hover:shadow-[0_0_45px_rgba(59,130,246,0.12)] transition-all duration-500"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-blue-600 to-sky-400 opacity-25 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div>
                          <span className="block font-mono-label text-[9px] tracking-[0.32em] text-muted-foreground/70 uppercase mb-2">
                            {p.type}
                          </span>
                          <h3 className="font-display text-xl text-foreground">
                            {p.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                          <span className="font-mono-label text-[10px] text-muted-foreground">
                            {p.period}
                          </span>
                          {p.url && (
                            <a
                              href={`https://${p.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visit ${p.title}`}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6">
                        {p.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-primary/45 text-[7px] mt-[7px] flex-shrink-0">
                              ●
                            </span>
                            <span className="text-muted-foreground text-sm leading-relaxed">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 font-mono-label text-[9px] tracking-wide bg-secondary text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────── */}
        <section
          id="skills"
          className="py-28 md:py-36 px-6 border-t border-border"
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] tracking-[0.38em] text-primary uppercase mb-12"
              >
                04 / Skills
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-6xl text-foreground mb-14 drop-shadow-[0_0_18px_rgba(59,130,246,0.18)]"
              >
                Technical Arsenal
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {SKILLS.map((s) => (
                  <motion.div key={s.cat} variants={fadeUp}>
                    <span className="block font-mono-label text-[10px] tracking-[0.3em] text-primary uppercase mb-5">
                      {s.cat}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 border border-border/60 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-300 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── EDUCATION + CERTIFICATIONS ───────────────────────────────── */}
        <section className="py-28 md:py-36 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] tracking-[0.38em] text-primary uppercase mb-12"
              >
                05 / Education &amp; Certifications
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-6xl text-foreground mb-14"
              >
                Background
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={fadeUp}
                  className="relative bg-card border border-border/60 p-8 overflow-hidden group hover:border-primary/25 transition-all duration-500"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-blue-600 to-sky-400" />
                  <span className="block font-mono-label text-[9px] tracking-[0.3em] text-primary uppercase mb-6">
                    Academic
                  </span>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-1.5">
                        Master of Computer Applications
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        RG Kedia College of Commerce
                      </p>
                    </div>
                    <span className="font-mono-label text-[10px] text-muted-foreground whitespace-nowrap">
                      2022–2024
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 pt-5 border-t border-border/40">
                    <span className="font-mono-label text-[10px] text-muted-foreground uppercase tracking-widest">
                      CGPA
                    </span>
                    <span className="font-display text-4xl text-primary font-bold">
                      7.67
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="relative bg-card border border-border/60 p-8 overflow-hidden group hover:border-primary/25 transition-all duration-500"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-blue-600 to-sky-400" />
                  <span className="block font-mono-label text-[9px] tracking-[0.3em] text-primary uppercase mb-6">
                    Academic
                  </span>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-1.5">
                        Bachelor of Science ( MECs )
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Nrupatunga Degree & PG College
                      </p>
                    </div>
                    <span className="font-mono-label text-[10px] text-muted-foreground whitespace-nowrap">
                      2019-2022
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 pt-5 border-t border-border/40">
                    <span className="font-mono-label text-[10px] text-muted-foreground uppercase tracking-widest">
                      CGPA
                    </span>
                    <span className="font-display text-4xl text-primary font-bold">
                      8.24
                    </span>
                  </div>
                </motion.div>

                {/* Certification */}
                <div className="md:col-span-2 mt-10">
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-3xl md:text-5xl text-foreground mb-10"
                >
                  Certifications
                </motion.h2>
                </div>

                <motion.div
                  variants={fadeUp}
                  className="md:col-span-2 relative bg-card border border-border/60 p-8 overflow-hidden group hover:border-primary/25 transition-all duration-500"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-blue-600 to-sky-400/40" />
                  <span className="block font-mono-label text-[9px] tracking-[0.3em] text-primary uppercase mb-6">
                    Certification
                  </span>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-sky-400/6">
                      <Award size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground mb-2.5">
                        <a href="https://drive.google.com/file/d/1sJGl1r5sg6ZMADBotDmLTdOU0Ch4bJAl/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary trasnsition-colors duration-300"
                        >
                          AWS DevOps Certifications</a>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Certified in AWS cloud services, DevOps tooling, and
                        cloud-native infrastructure design and automation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section
          id="contact"
          className="py-28 md:py-44 px-6 border-t border-border relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/4 blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <motion.p
                variants={fadeUp}
                className="font-mono-label text-[10px] tracking-[0.38em] text-primary uppercase mb-12"
              >
                06 / Contact
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-[clamp(2.4rem,14vw,8.5rem)] text-foreground leading-[0.86] mb-5"
              >
                {"Let's"}
                <br />
                <em className="bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent not-italic">Connect</em>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="w-20 h-[3px] bg-gradient-to-r from-blue-600 to-sky-400 mb-10"
              />

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg max-w-md leading-relaxed mb-16"
              >
                Open to DevOps roles, cloud infrastructure projects, and
                meaningful collaborations. Based in Hyderabad, available
                immediately.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "shashank.manikanta@gmail.com",
                    href: "mailto:shashank.manikanta@gmail.com",
                  },
                  {
                    Icon: Phone,
                    label: "Phone",
                    value: "+91-9000485456",
                    href: "tel:+919000485456",
                  },
                  {
                    Icon: Github,
                    label: "GitHub",
                    value: "github.com/Tvmsasank",
                    href: "https://github.com/Tvmsasank",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    value: "venkatamani-sasank",
                    href: "https://linkedin.com/in/venkatamani-sasank",
                  },
                  {
                    Icon: MapPin,
                    label: "Location",
                    value: "Hyderabad, India",
                    href: null,
                  },
                ].map(({ Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-5 border border-border/60 group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-9 h-9 border border-border/60 group-hover:border-primary/40 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Icon
                        size={14}
                        className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono-label text-[9px] tracking-[0.32em] text-muted-foreground/55 uppercase mb-1.5">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-foreground hover:text-primary transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono-label text-[10px] text-muted-foreground tracking-wider">
            © 2026 Venkatamani Sasank
          </span>
          <span className="font-mono-label text-[10px] text-muted-foreground tracking-wider">
            Hyderabad &nbsp;·&nbsp; Available for DevOps Roles
          </span>
        </div>
      </footer>
    </div>
  );
}
