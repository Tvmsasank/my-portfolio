import { useEffect, useRef } from "react";

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    let W = 0;
    let H = 0;
    let animId: number;
    let isVisible = true;
    const m = { x: -999, y: -999 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Point = { x: number; y: number; vx: number; vy: number; radius: number };
    let pts: Point[] = [];

    const handleResize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      W = cv.width = r.width;
      H = cv.height = r.height;
      const count = Math.min(75, Math.max(30, Math.floor(W / 18)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.5 + 1.2,
      }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
    };

    const handleMouseLeave = () => {
      m.x = -999;
      m.y = -999;
    };

    const parent = cv.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !reduceMotion) {
        cancelAnimationFrame(animId);
        draw();
      }
    });
    if (parent) observer.observe(parent);

    const draw = () => {
      cx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Interaction with cursor
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const distToCursor = Math.hypot(dx, dy);

        if (distToCursor < 170) {
          // Attract lightly towards cursor
          p.x += dx * 0.015;
          p.y += dy * 0.015;

          // Elastic line to cursor
          cx.strokeStyle = "#22D3EE";
          cx.globalAlpha = (1 - distToCursor / 170) * 0.85;
          cx.lineWidth = 1.2;
          cx.beginPath();
          cx.moveTo(p.x, p.y);
          cx.lineTo(m.x, m.y);
          cx.stroke();
        }

        // Draw node
        cx.fillStyle = "#22D3EE";
        cx.globalAlpha = 0.75;
        cx.beginPath();
        cx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        cx.fill();
      }

      // Inter-particle web connections
      cx.strokeStyle = "#22D3EE";
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 115) {
            cx.globalAlpha = (1 - d / 115) * 0.28;
            cx.lineWidth = 0.8;
            cx.beginPath();
            cx.moveTo(pts[i].x, pts[i].y);
            cx.lineTo(pts[j].x, pts[j].y);
            cx.stroke();
          }
        }
      }

      if (isVisible && !reduceMotion) {
        animId = requestAnimationFrame(draw);
      }
    };

    if (!reduceMotion) {
      draw();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}
