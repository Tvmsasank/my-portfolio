export interface MetricItem {
  label: string;
  before: string;
  after: string;
  badge: string;
}

export interface FeaturedProject {
  title: string;
  subheading: string;
  role: string;
  period: string;
  type: string;
  stack: string[];
  metrics: MetricItem[];
  challenges: string[];
  solutions: { title: string; desc: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  period: string;
  stack: string[];
  bullets: string[];
  url?: string | null;
}

export interface ExperienceRole {
  company: string;
  location: string;
  role: string;
  period: string;
  projects: {
    name: string;
    period: string;
    stack: string;
    bullets: string[];
  }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  link: string;
  badgeId: string;
  description: string;
}

export interface UpSkillingItem {
  number: string;
  title: string;
  tagline: string;
  headline: string;
  bullets: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
}

export interface SkillCategory {
  cat: string;
  items: string[];
}

export const FEATURED_PROJECT: FeaturedProject = {
  title: "Enterprise Blue-Green CI/CD Pipeline for .NET & IIS",
  subheading: "Zero-Downtime Automated Deployment, Instant Rollback & Infrastructure Hardening",
  role: "Lead DevOps / Backend Engineer (Solo Initiator)",
  period: "Latest Enterprise Work",
  type: "Enterprise CI/CD & Infrastructure",
  stack: [
    "GitLab CI/CD",
    ".NET 9",
    "Windows Server 2022",
    "IIS 10",
    "PowerShell",
    "Robocopy",
    "URL Authorization",
  ],
  metrics: [
    { label: "Deployment Time", before: "10–15 Mins", after: "< 45 Seconds", badge: "95% Faster" },
    { label: "Production Downtime", before: "5–10 Mins outage", after: "Zero Downtime", badge: "0 ms Outage" },
    { label: "Emergency Rollback", before: "20+ Mins manual", after: "< 1 Second", badge: "Instant 1-Click" },
    { label: "Security Isolation", before: "Open / Unrestricted", after: "Strict Lockdown", badge: "URL Auth Rules" },
  ],
  challenges: [
    "Production releases were performed manually via file copying, leading to service downtime, file-lock collisions, and high risk during updates.",
    "Publishing large .NET enterprise applications with 40,000+ files created massive network overhead (10–15 min builds) when passing artifacts over HTTP.",
    "Pre-production testing lacked secure isolation on the same server, risking accidental access to unreleased features by regular domain users.",
  ],
  solutions: [
    {
      title: "Multi-Tenant Port 80 Architecture",
      desc: "Designed an isolated Blue-Green hosting model under IIS Default Web Site (/App live and /App_Standby preview) eliminating port bindings or IP collisions.",
    },
    {
      title: "High-Velocity Pipeline (< 45 Seconds)",
      desc: "Merged local compilation and silent delta synchronization using PowerShell and Robocopy, bypassing artifact upload bottlenecks.",
    },
    {
      title: "Automated Zero-Downtime Cutover",
      desc: "Built atomic switching scripts that swap virtual application physical paths and reassign application pools in milliseconds.",
    },
    {
      title: "Instant 1-Click Rollback",
      desc: "Developed an emergency reversal mechanism that restores the previous verified slot in under 1 second.",
    },
    {
      title: "Strict Standby Lockdown",
      desc: "Implemented native IIS URL Authorization rules combined with Basic Authentication to restrict preview environments strictly to designated tester credentials.",
    },
    {
      title: "Centralized CI Governance",
      desc: "Isolated CI/CD definitions in a private administrator repository, enforcing strict branch workflow rules to block unwanted pipelines from developer feature branches.",
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "sri-aditya-enterprises",
    title: "Sri Aditya Enterprises",
    type: "Business Website",
    period: "Jan 2026",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "AWS S3", "CloudFront", "Route 53", "ACM", "Terraform", "GitHub Actions"],
    bullets: [
      "Responsive SPA built with React, Vite, TypeScript, and Tailwind CSS",
      "WhatsApp API integration for direct customer engagement",
      "Deployed on AWS S3 (static hosting), CloudFront CDN, Route 53 DNS, ACM SSL",
      "Automated deployments using GitHub Actions and managed AWS infrastructure using Terraform (IaC)",
    ],
    url: "sriadityaenterprises.com",
  },
  {
    id: "aws-serverless-math-app",
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
    id: "aws-3-tier-architecture",
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
    id: "sarcasm-detection-ml",
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

export const EXPERIENCE: ExperienceRole = {
  company: "ICFAI Group",
  location: "Hyderabad, India",
  role: "Software Developer",
  period: "Sep 2025 — Present",
  projects: [
    {
      name: "CloudOps AI Platform",
      period: "Jun 2026 — Jul 2026",
      stack: "Python · FastAPI · AWS · Docker · Terraform · MySQL · AI",
      bullets: [
        "Designed and developed a cloud-native AI platform using Python, FastAPI, AWS, Docker, and MySQL.",
        "Built an asynchronous image processing pipeline with Amazon S3, Amazon SQS, and scalable Ubuntu EC2 AI workers.",
        "Implemented AI-powered image similarity detection using OpenCLIP embeddings with automated result storage in MySQL.",
        "Provisioned AWS infrastructure including VPC, Subnets, Route Tables, Security Groups, API Gateway, EC2, ECR, S3, and SQS.",
        "Developed secure HTTP APIs integrating frontend uploads with automated backend AI processing.",
      ],
    },
    {
      name: "Refund Note Management System",
      period: "Apr 2026 — May 2026",
      stack: "ASP.NET MVC · C# · ADO.NET · SQL Server · JavaScript · Bootstrap",
      bullets: [
        "Developed a secure Refund Note Management System using ASP.NET MVC, C#, ADO.NET, SQL Server, JavaScript, and Bootstrap.",
        "Implemented AES-encrypted search, multi-database integration, dynamic refund note generation, PDF generation, and remarks management.",
        "Designed a complete attachment management module supporting upload, preview, download, replacement, deletion, and secure file storage linked with unique Refund Note numbers.",
      ],
    },
    {
      name: "IRCTC Clone",
      period: "Mar 2026 — Apr 2026",
      stack: "ASP.NET MVC · C# · ADO.NET · SQL Server · JavaScript · Bootstrap",
      bullets: [
        "Engineered end-to-end railway reservation workflows including train search, quota-based seat availability, and dynamic fare calculation.",
        "Integrated dynamic PNR generation, payment simulation, cancellation with refund processing, and secure booking status tracking.",
      ],
    },
    {
      name: "AI-Powered University Question Paper Generator & Classifier",
      period: "Sep 2025 — Mar 2026",
      stack: "Python · FastAPI · PyTorch · HuggingFace · Docker · MySQL",
      bullets: [
        "Built an automated question paper generator adhering strictly to university blueprints, syllabus weightages, and cognitive difficulty tiers.",
        "Designed Bloom’s Taxonomy–based learning outcome classification with configurable similarity thresholds.",
        "Developed responsive admin UI with CKEditor integration and image-supported question uploads.",
      ],
    },
  ],
};

export const UPSKILLING: UpSkillingItem[] = [
  {
    number: "1.",
    title: "CloudOps Deployment Platform — AWS CI/CD",
    tagline: "End-to-End AWS DevOps & CI/CD",
    headline: "Built an end-to-end AWS DevOps deployment platform integrating GitHub, Linux, AWS infrastructure, IAM, S3, and GitHub Actions CI/CD.",
    bullets: [
      "Provisioned and configured an Amazon Linux EC2 environment with SSH, Nginx, Linux users, permissions, services, and deployment directories.",
      "Configured AWS IAM roles and EC2 instance profiles to securely access AWS services without embedding long-lived credentials on the server.",
      "Implemented Amazon S3 as a versioned deployment artifact repository for storing application ZIP packages.",
      "Built Bash-based deployment automation with backup handling, Linux permission management, Nginx configuration validation, service reloads, and application health checks.",
      "Developed GitHub Actions workflows for automated source checkout, artifact packaging, AWS authentication, S3 uploads, and deployment artifact verification.",
      "Implemented GitHub Actions OIDC federation with AWS IAM, eliminating the need to store long-lived AWS access keys in GitHub.",
      "Restricted AWS OIDC trust policies to the specific GitHub repository and main branch using repository and owner identity claims.",
      "Implemented Git commit SHA-based artifact versioning to establish traceability between source commits, CI/CD runs, and deployment packages.",
      "Prepared the application for AWS CodeDeploy using an AppSpec deployment specification and CodeDeploy agent, establishing a foundation for automated EC2 deployments.",
    ],
    stack: [
      "AWS EC2",
      "Amazon S3",
      "AWS IAM",
      "GitHub Actions",
      "OIDC Federation",
      "Bash Scripting",
      "Nginx",
      "AWS CodeDeploy",
      "Linux",
    ],
  },
  {
    number: "2.",
    title: "Jenkins CI/CD Pipeline with Maven",
    tagline: "Hands-on DevOps Practice",
    headline: "Created a freestyle Jenkins CI/CD pipeline integrated with Maven.",
    bullets: [
      "Installed required Jenkins plugins and connected GitHub repository.",
      "Configured Jenkins inside Docker container and managed workspace execution using bash shell.",
      "Configured Maven goals for clean, build, package, and artifact generation (.jar).",
      "Executed Maven test phase and generated Surefire test reports.",
      "Added execute shell scripts to run generated Java artifacts from Jenkins workspace.",
      "Published JUnit reports and validated pipeline builds multiple times for reporting accuracy.",
    ],
    stack: [
      "Jenkins",
      "Docker",
      "Maven",
      "GitHub",
      "Bash Shell",
      "JUnit",
      "Surefire Reports",
      "Java",
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "AWS SimuLearn: Cloud Practitioner",
    issuer: "Amazon Web Services",
    link: "https://drive.google.com/file/d/1Lv66trIUmbu9EpK5dKhIqA-d6vKK_rpA/view?usp=drive_link",
    badgeId: "AWS-SIM-CP",
    description: "Hands-on simulated cloud practitioner training and validation on core AWS architecture and services.",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    link: "https://drive.google.com/file/d/1RQyQcSBaOCrfJq9nTjPioBIhu2rOennC/view?usp=drive_link",
    badgeId: "AWS-CPE-01",
    description: "Comprehensive foundation in AWS cloud concepts, security best practices, core services, and pricing.",
  },
  {
    title: "AWS Solutions Architect - Fundamentals of Architecting on AWS",
    issuer: "Amazon Web Services",
    link: "https://drive.google.com/file/d/1GMhUlLgNEfgMZYcnFACncIJMcv9d3-U1/view?usp=drive_link",
    badgeId: "AWS-SA-FUND",
    description: "Architectural principles, high availability, decoupled systems, resilience, and scalable cloud design.",
  },
  {
    title: "AWS DevOps Certificate",
    issuer: "Amazon Web Services",
    link: "https://drive.google.com/file/d/1jGDuMcJ_HnjEEUB6f46VuHrTVvHoFCoh/view?usp=drive_link",
    badgeId: "AWS-DEVOPS-CERT",
    description: "DevOps practices, CI/CD pipeline automation, infrastructure provisioning, and continuous monitoring.",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "RG Kedia College of Commerce",
    period: "2022 – 2024",
    cgpa: "7.67",
  },
  {
    degree: "Bachelor of Science (MECs)",
    institution: "Nrupatunga Degree & PG College",
    period: "2019 – 2022",
    cgpa: "8.24",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    cat: "Cloud / AWS",
    items: ["S3", "EC2", "Lambda", "API Gateway", "CloudFront", "Route 53", "IAM", "VPC", "SNS", "CloudWatch", "ECR", "ECS"],
  },
  { cat: "Languages", items: ["C", "C#", "JavaScript", "Python", "PowerShell", "SQL", "HTML/CSS"] },
  { cat: "DevOps & CI/CD", items: ["Git", "GitHub Actions", "GitLab CI/CD", "Docker", "Linux", "Terraform", "Jenkins", "Maven", "IIS 10", "Robocopy"] },
  { cat: "Frameworks & Backend", items: [".NET 9", "ASP.NET MVC", "FastAPI", "React", "TypeScript", "Tailwind CSS"] },
  { cat: "Databases & Storage", items: ["SQL Server", "MySQL", "DynamoDB", "Amazon S3", "Amazon SQS"] },
  { cat: "Tools & Environments", items: ["Visual Studio 2022", "VS Code", "Postman", "Windows Server 2022", "Ubuntu Linux"] },
];

export const CONTACT = {
  name: "Venkatamani Sasank",
  title: "AWS Cloud & DevOps Engineer | .NET Developer",
  email: "shashank.manikanta@gmail.com",
  phone: "+91-9000485456",
  github: "https://github.com/Tvmsasank",
  githubUser: "Tvmsasank",
  linkedin: "https://linkedin.com/in/venkatamani-sasank",
  linkedinUser: "venkatamani-sasank",
  location: "Hyderabad, India",
  availability: "Available Immediately for DevOps / Cloud / Backend Roles",
};
