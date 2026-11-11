import { useEffect, useRef } from "react";

interface Props {
  scanlines?: boolean;
}

export function CyberBackground({ scanlines = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes in Coral (#FF6B5B) and Cream (#F4EDE0)
    const particleCount = Math.min(48, Math.floor(width / 32));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCoral = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        color: isCoral ? "255, 107, 91" : "244, 237, 224",
        alpha: Math.random() * 0.45 + 0.2,
      });
    }

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cream Perspective Grid
      ctx.save();
      ctx.strokeStyle = "rgba(244, 237, 224, 0.038)";
      ctx.lineWidth = 1;

      gridOffset = (gridOffset + 0.15) % 40;
      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Particles & Connections
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.strokeStyle = `rgba(255, 107, 91, ${(1 - dist / 115) * 0.14})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0d1627]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Deep Navy (#14213D), Warm Cream (#F4EDE0), and Vibrant Coral (#FF6B5B) radial lighting */}
      <div className="absolute -top-32 left-1/4 w-[650px] h-[500px] rounded-full bg-[#14213D] blur-[150px] opacity-90" />
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-[#FF6B5B]/[0.08] blur-[160px]" />
      <div className="absolute -bottom-24 left-1/3 w-[700px] h-[450px] rounded-full bg-[#F4EDE0]/[0.04] blur-[170px]" />

      {scanlines && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(244,237,220,0) 50%, rgba(13, 22, 39, 0.8) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      )}
    </div>
  );
}
