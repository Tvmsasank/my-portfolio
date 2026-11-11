import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const BOOT_LINES = [
  "INITIALIZING DEV ENVIRONMENT",
  "LOADING USER PROFILE",
  "MOUNTING PROJECT WORKSPACE",
  "CHECKING CLOUD TOOLCHAIN",
  "SYSTEM READY",
];

type Props = { onComplete: () => void };

export function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const id = window.setTimeout(onComplete, 250);
      return () => window.clearTimeout(id);
    }

    const ids: number[] = [];
    BOOT_LINES.forEach((_, index) => {
      ids.push(window.setTimeout(() => setVisibleLines(index + 1), 360 + index * 390));
    });
    ids.push(window.setTimeout(onComplete, 2600));
    return () => ids.forEach(window.clearTimeout);
  }, [onComplete, reduceMotion]);

  const finish = () => {
    setSkipped(true);
    onComplete();
  };

  if (skipped) return null;

  return (
    <motion.section
      className="boot-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Portfolio startup sequence"
    >
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-content">
        <div className="boot-mark"><span className="boot-mark-dot" /> DEV ENVIRONMENT <span className="boot-version">v1.0</span></div>
        <h1 className="boot-title">A different way<br /><em>to explore</em> my work.</h1>
        <div className="boot-console" aria-live="polite">
          <div className="boot-console-bar"><span /><span /><span /><small>startup.log</small></div>
          <div className="boot-console-body">
            {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
              <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={index === BOOT_LINES.length - 1 ? "boot-success" : ""}>
                <span className="boot-time">[{`0${index + 1}`}.00]</span> {line}
                {index === BOOT_LINES.length - 1 && <span className="boot-check"> ✓</span>}
              </motion.p>
            ))}
            {visibleLines < BOOT_LINES.length && <span className="terminal-cursor" />}
          </div>
        </div>
        <div className="boot-footer">
          <span>PREPARING INTERACTIVE PORTFOLIO</span>
          <button type="button" onClick={finish}>SKIP INTRO ↗</button>
        </div>
      </div>
    </motion.section>
  );
}
