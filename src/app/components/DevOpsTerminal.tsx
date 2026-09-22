import React, { useState } from "react";
import { Terminal, Copy, Check, Code2, Layers, Cpu } from "lucide-react";

interface Snippet {
  id: string;
  label: string;
  filename: string;
  icon: React.ElementType;
  language: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "oidc-iac",
    label: "GitHub Actions (OIDC)",
    filename: ".github/workflows/deploy-pipeline.yml",
    icon: Layers,
    language: "yaml",
    code: `name: CloudOps AWS EC2 CI/CD
on:
  push:
    branches: [ main ]

permissions:
  id-token: write   # Required for secretless AWS IAM OIDC federation
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsOIDCRole
          aws-region: ap-south-1
          audience: sts.amazonaws.com

      - name: Package & Push Artifact to S3
        run: |
          ZIP_NAME="release-\${GITHUB_SHA::8}.zip"
          zip -r "\${ZIP_NAME}" . -x "*.git*"
          aws s3 cp "\${ZIP_NAME}" s3://cloudops-artifacts-prod/builds/
          echo "DEPLOY_ARTIFACT=\${ZIP_NAME}" >> $GITHUB_ENV`,
  },
  {
    id: "bash-deploy",
    label: "Bash Automation",
    filename: "scripts/deploy_production.sh",
    icon: Terminal,
    language: "bash",
    code: `#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/my-portfolio"
BACKUP_DIR="/var/backups/my-portfolio"
RELEASE_TAG=$(date +%Y%m%d_%H%M%S)

echo "==> Step 1: Performing snapshot backup..."
mkdir -p "\${BACKUP_DIR}"
tar -czf "\${BACKUP_DIR}/backup_\${RELEASE_TAG}.tar.gz" -C "\${APP_DIR}" .

echo "==> Step 2: Fetching verified release artifact from S3..."
aws s3 cp "s3://cloudops-artifacts-prod/builds/\${DEPLOY_ARTIFACT}" /tmp/artifact.zip

echo "==> Step 3: Unpacking and setting secure permissions..."
unzip -q -o /tmp/artifact.zip -d "\${APP_DIR}"
chown -R nginx:nginx "\${APP_DIR}"
chmod -R 755 "\${APP_DIR}"

echo "==> Step 4: Validating Nginx reverse proxy configuration..."
nginx -t

echo "==> Step 5: Reloading service with zero downtime..."
systemctl reload nginx
echo "Deployment successful: version \${RELEASE_TAG} live."`,
  },
  {
    id: "terraform-iac",
    label: "Terraform (IaC)",
    filename: "infra/modules/iam_oidc/main.tf",
    icon: Code2,
    language: "hcl",
    code: `# IAM Role trusted strictly by this GitHub repository
resource "aws_iam_role" "github_oidc" {
  name = "GitHubActionsOIDCRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
        StringLike = {
          "token.actions.githubusercontent.com:sub" = "repo:Tvmsasank/my-portfolio:ref:refs/heads/main"
        }
      }
    }]
  })
}`,
  },
];

export function DevOpsTerminal() {
  const [activeTab, setActiveTab] = useState<string>("oidc-iac");
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  function copyCode() {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lines = currentSnippet.code.split("\n");

  return (
    <div className="w-full rounded-2xl border border-border/70 bg-[#070f1d] shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0a1526] border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono-label text-[11px] text-muted-foreground/70 hidden sm:inline">
            devops-terminal@venkatamani:~/{currentSnippet.filename}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {SNIPPETS.map((snippet) => {
            const Icon = snippet.icon;
            const isActive = activeTab === snippet.id;
            return (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setActiveTab(snippet.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-label transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/40 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon size={12} />
                <span>{snippet.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={copyCode}
            aria-label="Copy snippet"
            className="ml-2 p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
            title="Copy snippet"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 overflow-x-auto max-h-[380px] bg-[#050b14]/90">
        <pre className="leading-relaxed text-[12px] sm:text-[13px]">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row group hover:bg-white/[0.03]">
                <span className="table-cell pr-4 text-right select-none text-muted-foreground/35 text-[11px]">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono">
                  {line.startsWith("#") || line.startsWith("//") ? (
                    <span className="text-muted-foreground/60 italic">{line}</span>
                  ) : line.includes(":") && !line.includes("http") ? (
                    <span>
                      <span className="text-sky-400">{line.split(":")[0]}</span>:
                      <span className="text-slate-200">
                        {line.slice(line.indexOf(":") + 1)}
                      </span>
                    </span>
                  ) : line.includes("echo") || line.includes("aws") || line.includes("systemctl") ? (
                    <span className="text-emerald-400 font-medium">{line}</span>
                  ) : (
                    <span className="text-slate-300">{line}</span>
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Terminal Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#091322] border-t border-border/40 text-[10px] text-muted-foreground/60">
        <span>Encoding: UTF-8</span>
        <span className="flex items-center gap-1.5 text-sky-400">
          <Cpu size={11} /> Infrastructure as Code (IaC) & Automation
        </span>
      </div>
    </div>
  );
}

export default DevOpsTerminal;
