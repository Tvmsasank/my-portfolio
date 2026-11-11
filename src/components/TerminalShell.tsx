import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronRight, Command, Github, Linkedin, Mail, Terminal as TerminalIcon } from "lucide-react";
import { useTerminal } from "../hooks/useTerminal";

type Props = {
  onProjectSelect?: (id: string) => void;
  onBrowseProjects?: () => void;
};

export function TerminalShell({ onProjectSelect, onBrowseProjects }: Props) {
  const { input, setInput, outputs, suggestions, execute, onKeyDown } = useTerminal(onProjectSelect);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" }); }, [outputs]);
  const focusInput = () => inputRef.current?.focus();

  return (
    <section className="terminal-stage" id="top">
      <div className="terminal-stage-grid" aria-hidden="true" />
      <header className="site-strip">
        <a className="wordmark" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="wordmark-mark">V.</span> VENKATAMANI <span className="wordmark-slash">/</span> SASANK</a>
        <div className="site-strip-right"><span className="availability-dot" /> OPEN TO RELEVANT OPPORTUNITIES <span className="strip-separator">/</span> HYDERABAD, IN</div>
      </header>

      <div className="terminal-layout">
        <aside className="identity-rail">
          <div className="rail-index">ENGINEERING PORTFOLIO <span>2026 / 01</span></div>
          <p className="eyebrow">AWS CLOUD / DEVOPS / .NET</p>
          <h1 className="identity-title">Build.<br /><span>Ship.</span><br />Improve.</h1>
          <p className="identity-copy">I'm <strong>Venkatamani Sasank</strong> — a Software Developer working across AWS cloud, DevOps automation and .NET application engineering.</p>
          <div className="identity-rule" />
          <div className="identity-meta"><span>ENGINEERING FOCUS</span><strong>AWS CLOUD<br />CI/CD &amp; AUTOMATION<br />.NET SYSTEMS</strong></div>
          <div className="identity-links">
            <a href="https://github.com/Tvmsasank" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a href="https://linkedin.com/in/venkatamani-sasank" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href="mailto:shashank.manikanta@gmail.com" aria-label="Email"><Mail size={17} /></a>
          </div>
          <span className="rail-footnote">VENKATAMANI SASANK / 2026</span>
        </aside>

        <div className="terminal-column">
          <div className="terminal-intro-row"><div><span className="eyebrow">INTERACTIVE WORKSPACE</span><h2>Explore my engineering work<span className="blue-period">.</span></h2></div><span className="session-id">SESSION: VS-001</span></div>
          <div className="terminal-window" onClick={focusInput}>
            <div className="terminal-titlebar"><div className="window-controls"><i /><i /><i /></div><div className="terminal-window-title"><TerminalIcon size={13} /> venkatamani@portfolio: ~/workspace</div><span className="terminal-live"><b /> ONLINE</span></div>
            <div className="terminal-body" ref={outputRef} role="log" aria-live="polite" aria-label="Portfolio terminal output">
              <div className="terminal-welcome"><p className="terminal-muted">Welcome, <span className="terminal-blue">Venkatamani Sasank</span>.</p><p className="terminal-muted">This is an interactive index to my projects, skills and experience.</p><p className="terminal-help">Type <code>help</code> to explore commands, or use the shortcuts below.</p></div>
              <AnimatePresence initial={false}>{outputs.map((block) => <motion.div key={block.id} className="output-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}><div className="output-command"><span>venkatamani@portfolio</span>:<span className="terminal-path">~/workspace</span>$ {block.command}</div><div className={`output-lines output-${block.tone ?? "normal"}`}>{block.lines.map((line, index) => <div key={`${block.id}-${index}`} className={line === "" ? "output-blank" : ""}>{line || "\u00a0"}</div>)}</div></motion.div>)}</AnimatePresence>
              <form className="terminal-prompt" onSubmit={(event) => { event.preventDefault(); execute(input); }}><label htmlFor="terminal-command"><span>venkatamani@portfolio</span>:<span className="terminal-path">~/workspace</span>$</label><input id="terminal-command" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Enter a portfolio command" placeholder="type a command..." /><span className="prompt-cursor" aria-hidden="true" /></form>
            </div>
            <div className="terminal-statusbar"><span><i /> UTF-8</span><span>PORTFOLIO COMMAND INTERFACE</span><span>REACT / TYPESCRIPT</span></div>
          </div>
          <div className="command-area"><div className="command-area-heading"><span><Command size={13} /> QUICK COMMANDS</span><span>SELECT TO EXPLORE <ArrowUpRight size={12} /></span></div><div className="command-grid">{suggestions.map((item) => <button type="button" className="command-chip" key={item.command} onClick={(event) => { event.preventDefault(); execute(item.command); }}><span className="chip-prompt"><ChevronRight size={13} /></span><span className="chip-copy"><strong>{item.command}</strong><small>{item.description}</small></span><ArrowUpRight className="chip-arrow" size={13} /></button>)}</div></div>
          <footer className="terminal-footer"><span>THE TERMINAL IS A NAVIGATION LAYER — THE CASE STUDIES ARE BELOW.</span><button onClick={onBrowseProjects}>BROWSE FULL PROJECTS <ArrowUpRight size={12} /></button></footer>
        </div>
      </div>
    </section>
  );
}
