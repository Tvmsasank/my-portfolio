import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitBranch,
  ShieldCheck,
  Server,
  Cloud,
  CheckCircle2,
  Activity,
  Zap,
  ArrowRight,
  Terminal,
  RefreshCw,
} from "lucide-react";

interface PipelineNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  status: "success" | "active" | "standby";
  details: {
    service: string;
    protocol: string;
    metric: string;
    description: string;
  };
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "github",
    title: "GitHub Actions",
    subtitle: "CI Pipeline Trigger",
    icon: GitBranch,
    color: "from-blue-500 to-indigo-600",
    status: "success",
    details: {
      service: "GitHub CI/CD Runner",
      protocol: "Webhook on push: [main]",
      metric: "Build duration: 1m 42s",
      description:
        "Automated checkout, dependency resolution, lint validation, and unit test execution on isolated runners.",
    },
  },
  {
    id: "oidc",
    title: "IAM OIDC Trust",
    subtitle: "Secretless Auth",
    icon: ShieldCheck,
    color: "from-sky-400 to-cyan-500",
    status: "success",
    details: {
      service: "AWS IAM & STS AssumeRole",
      protocol: "OpenID Connect (OIDC)",
      metric: "Token Expiry: 1 Hour (Temporary)",
      description:
        "Eliminates long-lived access keys by exchanging GitHub identity tokens for ephemeral AWS credentials via strict trust policies.",
    },
  },
  {
    id: "s3",
    title: "Amazon S3",
    subtitle: "Artifact Repository",
    icon: Cloud,
    color: "from-amber-500 to-orange-500",
    status: "success",
    details: {
      service: "S3 Versioned Storage",
      protocol: "SHA-256 Checksum Verified",
      metric: "Artifact size: 42.8 MB",
      description:
        "Immutable build artifact packaging tagged with Git commit SHA, providing complete release traceability and rollback capability.",
    },
  },
  {
    id: "ec2",
    title: "EC2 & Nginx",
    subtitle: "Production Deployment",
    icon: Server,
    color: "from-emerald-400 to-teal-500",
    status: "success",
    details: {
      service: "Amazon Linux EC2 + Systemd",
      protocol: "HTTPS / Reverse Proxy",
      metric: "Health check: 200 OK (0 downtime)",
      description:
        "Automated deployment script validates Nginx configuration, executes atomic symlink release, and reloads services without drop.",
    },
  },
];

export function CloudPipelineWidget() {
  const [activeNode, setActiveNode] = useState<string>("oidc");
  const currentNode = PIPELINE_NODES.find((n) => n.id === activeNode) || PIPELINE_NODES[0];

  return (
    <div className="w-full rounded-2xl border border-border/80 bg-[#081222]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(14,165,233,0.12)] overflow-hidden transition-all duration-500">
      {/* Telemetry Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-white/[0.02] border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono-label text-[11px] font-semibold text-emerald-400 tracking-wider">
              SYSTEM HEALTHY
            </span>
          </div>
          <span className="text-muted-foreground/40 text-xs">|</span>
          <span className="font-mono-label text-[10px] text-muted-foreground tracking-wide">
            AWS ap-south-1 · Commit <code className="text-primary font-bold">#5f70044</code>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono-label text-muted-foreground">
          <span className="flex items-center gap-1 text-sky-400/90">
            <Activity size={12} /> Latency: 24ms
          </span>
          <span className="hidden sm:inline text-muted-foreground/30">•</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={12} /> Uptime: 99.98%
          </span>
        </div>
      </div>

      {/* Main Interactive Flow */}
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono-label text-[10px] tracking-[0.25em] text-primary uppercase flex items-center gap-1.5">
            <Zap size={12} /> Interactive Cloud CI/CD Architecture Flow
          </span>
          <span className="text-muted-foreground text-[10px] font-mono-label hidden sm:inline">
            Click any node to inspect telemetry
          </span>
        </div>

        {/* Nodes Grid / Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative mb-6">
          {PIPELINE_NODES.map((node, index) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node.id)}
                className={`relative text-left p-4 rounded-xl border transition-all duration-300 group cursor-pointer ${
                  isSelected
                    ? "bg-primary/[0.12] border-primary shadow-[0_0_20px_rgba(59,130,246,0.25)] scale-[1.02]"
                    : "bg-white/[0.02] border-border/60 hover:border-primary/50 hover:bg-white/[0.04]"
                }`}
              >
                {/* Connector Arrow (Desktop) */}
                {index < PIPELINE_NODES.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-muted-foreground/50 pointer-events-none">
                    <ArrowRight size={12} />
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${node.color} text-white shadow-sm`}
                  >
                    <Icon size={16} />
                  </div>
                  <span
                    className={`font-mono-label text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? "bg-primary text-white font-semibold"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    Active
                  </span>
                </div>

                <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {node.title}
                </h4>
                <p className="font-mono-label text-[10px] text-muted-foreground tracking-tight">
                  {node.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Node Inspector Drawer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-primary/30 bg-primary/[0.03] p-4 sm:p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-primary flex-shrink-0" />
                <span className="font-mono-label text-xs font-semibold text-foreground">
                  {currentNode.details.service}
                </span>
                <span className="font-mono-label text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {currentNode.details.protocol}
                </span>
              </div>
              <div className="font-mono-label text-[11px] text-emerald-400 flex items-center gap-1.5">
                <RefreshCw size={11} className="animate-spin" />
                {currentNode.details.metric}
              </div>
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {currentNode.details.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CloudPipelineWidget;
