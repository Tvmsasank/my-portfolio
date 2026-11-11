export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  period: string;
  status: string;
  summary: string;
  problem: string;
  implementation: string[];
  architecture: string[];
  stack: string[];
  outcomes: string[];
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    id: "cloudops",
    number: "01",
    title: "CloudOps AI Platform",
    category: "Cloud engineering · AI workload platform",
    period: "Jun 2026 — Jul 2026",
    status: "Completed",
    summary: "A cloud-native AI image-processing platform built around asynchronous workloads, secure AWS infrastructure and an automated deployment workflow.",
    problem: "Image analysis is resource-intensive. The platform needed to accept uploads through an API, queue work independently of the request cycle, process images on dedicated workers and persist similarity results.",
    implementation: [
      "Designed and developed the platform backend using Python and FastAPI, with MySQL for application and processing metadata.",
      "Built an asynchronous image-processing flow using Amazon S3 for image storage, Amazon SQS for work dispatch and Ubuntu EC2 AI workers for processing.",
      "Integrated OpenCLIP embeddings to support image similarity detection and stored processing results in MySQL.",
      "Created secure HTTP APIs connecting frontend uploads with the backend processing workflow.",
      "Provisioned the AWS network and application resources, including VPC, subnets, route tables, security groups, API Gateway, EC2, ECR, S3 and SQS."
    ],
    architecture: ["Client / Upload UI", "FastAPI service", "Amazon S3", "Amazon SQS", "EC2 AI workers", "OpenCLIP embeddings", "MySQL results store"],
    stack: ["Python", "FastAPI", "AWS VPC", "EC2", "S3", "SQS", "ECR", "API Gateway", "Docker", "MySQL", "OpenCLIP"],
    outcomes: ["Decoupled upload requests from AI processing with a queue-based workflow.", "Separated API, object storage and worker responsibilities.", "Established an AWS foundation for scaling background image-processing workers."],
  },
  {
    id: "bluegreen",
    number: "02",
    title: "Enterprise Blue-Green CI/CD for .NET & IIS",
    category: "Release engineering · Windows infrastructure",
    period: "2026 · Proof of concept",
    status: "PoC implementation",
    summary: "A two-slot deployment approach for .NET applications hosted on IIS, using a Linux GitLab server and a Windows runner on the IIS host. The goal is to validate releases in an isolated slot before switching traffic.",
    problem: "Manual publishing to IIS can involve file-copy downtime, locked files and risky releases. The PoC explores how to separate deployment from traffic switching and keep a previous application slot available for recovery.",
    implementation: [
      "Separated GitLab CE on Ubuntu from the Windows 11 IIS host; installed and registered GitLab Runner on the Windows publishing server.",
      "Designed Blue and Green application directories / IIS application slots on the same Windows host, with the public application entry point kept separate from the inactive deployment slot.",
      "Used GitLab CI/CD YAML and PowerShell to automate build, publish, copy and deployment validation steps.",
      "Planned IIS URL Rewrite / ARR routing for controlled traffic switching between the two application slots.",
      "Kept production inspection and runner setup separate from live-site changes while preparing the proof of concept."
    ],
    architecture: ["GitLab CE · Ubuntu", "GitLab CI pipeline", "Windows GitLab Runner", ".NET build / publish", "IIS Blue slot", "IIS Green slot", "ARR / URL Rewrite routing"],
    stack: ["GitLab CI/CD", "Ubuntu", "Windows", "GitLab Runner", "IIS", ".NET MVC", "PowerShell", "Robocopy", "ARR", "URL Rewrite"],
    outcomes: ["Defined a repeatable build-and-publish workflow for the two-server setup.", "Separated the inactive deployment slot from the live application entry point.", "Designed a controlled switch and rollback approach; production performance metrics are intentionally not claimed here."],
  },
  {
    id: "refund",
    number: "03",
    title: "Refund Note Management System",
    category: "Business application · .NET MVC",
    period: "Apr 2026 — May 2026",
    status: "Developed at ICFAI Group",
    summary: "An internal workflow application for searching, generating and managing refund notes and their supporting attachments.",
    problem: "Refund-note operations require secure lookup, consistent document generation, remarks tracking and reliable handling of supporting files across records.",
    implementation: [
      "Developed the application using ASP.NET MVC, C#, ADO.NET and SQL Server.",
      "Implemented AES-encrypted search, multi-database integration and dynamic refund-note generation.",
      "Added PDF generation and remarks management to support the document workflow.",
      "Built attachment upload, preview, download, replacement and deletion features, linking stored files to unique Refund Note numbers."
    ],
    architecture: ["ASP.NET MVC UI", "C# application layer", "ADO.NET data access", "SQL Server / connected databases", "Document & attachment storage", "PDF output"],
    stack: ["C#", "ASP.NET MVC", "ADO.NET", "SQL Server", "JavaScript", "Bootstrap", "AES", "PDF generation"],
    outcomes: ["Centralized refund-note operations in one application.", "Added a managed attachment lifecycle tied to refund-note identifiers.", "Supported document output and remarks tracking within the workflow."],
  },
  {
    id: "irctc",
    number: "04",
    title: "IRCTC Reservation System Clone",
    category: "Full-stack application · Transaction processing",
    period: "Sep 2025 — Mar 2026 · Ongoing enhancements",
    status: "Feature-rich application",
    summary: "A railway reservation application built with ASP.NET Core MVC, ADO.NET and SQL Server, with a focus on booking correctness, seat allocation and real-time availability.",
    problem: "A booking system must keep seat counts consistent under concurrent requests, apply quota and fare rules correctly, and move a passenger through reservation, payment and ticket delivery without leaving partial records.",
    implementation: [
      "Built train search, station autocomplete, route-aware search and administrative CRUD for trains, routes, schedules and classes.",
      "Implemented transaction-safe booking with a single SQL commit pattern and rollback-safe failure handling.",
      "Developed CNF / RAC / WL passenger allocation and quota handling for General, Tatkal, Ladies and Senior Citizen categories.",
      "Added fare calculation, dynamic pricing logic, GST handling, PNR generation and checkout processing through ADO.NET and stored procedures.",
      "Strengthened seat-allocation concurrency using SQL locking with UPDLOCK and HOLDLOCK in the confirmed-seat query path.",
      "Integrated OTP verification, PDF ticket generation, email delivery and SignalR group broadcasts for live train availability."
    ],
    architecture: ["ASP.NET Core MVC", "BookingService", "FareService", "PassengerAllocationService", "ADO.NET / stored procedures", "SQL Server transaction + locks", "SignalR TrainHub", "PDF + email delivery"],
    stack: ["C#", "ASP.NET Core MVC", "ADO.NET", "SQL Server", "Stored Procedures", "SignalR", "JavaScript", "jQuery", "iTextSharp"],
    outcomes: ["Implemented a transaction-oriented booking flow with rollback handling.", "Separated fare calculation and passenger allocation into dedicated services.", "Added live availability updates through train-specific SignalR groups.", "Built the foundation for a seat-lock and payment-timeout workflow as a next enhancement."],
  },
  {
    id: "rag",
    number: "05",
    title: "ICFAI University RAG Chatbot",
    category: "AI engineering · Retrieval-augmented generation",
    period: "2025 — 2026",
    status: "Built and iterated",
    summary: "A university information assistant using document chunking, semantic embeddings, vector retrieval and a locally hosted language model.",
    problem: "University information needs to be searchable by meaning, not just exact keyword matches. The system needs to retrieve relevant source chunks before generating an answer.",
    implementation: [
      "Built the API layer using FastAPI and Uvicorn.",
      "Prepared source text through chunking and generated 384-dimensional embeddings using sentence-transformers/all-MiniLM-L6-v2.",
      "Used FAISS for vector indexing in an earlier iteration and explored SQL Server 2025 VECTOR storage and similarity search.",
      "Connected a local Ollama model for response generation after retrieval.",
      "Created ingestion and ONNX export workflows for local embedding inference experiments."
    ],
    architecture: ["University source documents", "Chunking / ingestion", "MiniLM embeddings · 384 dimensions", "FAISS / SQL Server VECTOR", "Similarity retrieval", "Ollama local LLM", "FastAPI response"],
    stack: ["Python", "FastAPI", "Uvicorn", "Sentence Transformers", "MiniLM", "FAISS", "SQL Server 2025", "ONNX", "Ollama"],
    outcomes: ["Created a semantic retrieval pipeline over university content.", "Explored both FAISS and SQL Server 2025 vector capabilities.", "Kept model inference local during the Ollama-based generation stage."],
  },
  {
    id: "sriaditya",
    number: "06",
    title: "Sri Aditya Enterprises",
    category: "Business website · AWS hosting",
    period: "Jan 2026",
    status: "Deployed",
    summary: "A responsive single-page business website built with React and TypeScript, deployed using AWS static hosting and edge delivery services.",
    problem: "The business needed a responsive web presence with a direct customer contact path and a deployment setup that could be maintained through source control.",
    implementation: [
      "Built the SPA using React, TypeScript, Vite and Tailwind CSS.",
      "Added WhatsApp-based customer engagement.",
      "Hosted static assets in Amazon S3 and delivered the site through CloudFront.",
      "Configured Route 53 DNS and AWS Certificate Manager for HTTPS.",
      "Used GitHub Actions for deployment automation and Terraform for infrastructure-as-code management."
    ],
    architecture: ["React + TypeScript", "GitHub repository", "GitHub Actions", "Amazon S3", "CloudFront", "Route 53", "AWS Certificate Manager"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "AWS S3", "CloudFront", "Route 53", "ACM", "Terraform", "GitHub Actions"],
    outcomes: ["Published a responsive business website on AWS.", "Added CDN delivery, DNS configuration and HTTPS.", "Introduced repeatable deployment and infrastructure management workflows."],
    link: { label: "Visit website", href: "https://sriadityaenterprises.com" },
  },
  {
    id: "jenkins",
    number: "07",
    title: "Jenkins CI/CD Pipeline with Maven",
    category: "DevOps practice · Build automation",
    period: "2026",
    status: "Hands-on implementation",
    summary: "A Jenkins freestyle pipeline connected to GitHub and Maven, covering build, test, packaging and execution of a Java artifact.",
    problem: "A useful CI pipeline should make build and test results repeatable and expose enough output to diagnose failed and successful runs.",
    implementation: [
      "Ran Jenkins in a Docker container and configured the required plugins and GitHub repository connection.",
      "Configured Maven goals for clean, build, package and JAR artifact generation.",
      "Executed the Maven test phase and reviewed Surefire test reports.",
      "Added shell execution steps to run the generated artifact from the Jenkins workspace.",
      "Published JUnit reports and compared failed and successful build logs to understand pipeline behaviour."
    ],
    architecture: ["GitHub source", "Jenkins job", "Docker-hosted Jenkins", "Maven build + tests", "Surefire / JUnit reports", "JAR artifact"],
    stack: ["Jenkins", "Docker", "Maven", "GitHub", "Bash", "Java", "JUnit", "Surefire"],
    outcomes: ["Automated the Java build and package lifecycle.", "Made test reports available for build review.", "Practised failure analysis using console output and build comparisons."],
  },
  {
    id: "aws3tier",
    number: "08",
    title: "AWS 3-Tier Architecture",
    category: "Cloud architecture · Infrastructure design",
    period: "Nov 2024",
    status: "Architecture project",
    summary: "A reference architecture separating presentation, application and data layers across an AWS VPC.",
    problem: "A production-oriented web architecture needs network segmentation, controlled access to data services and a path to scale application capacity.",
    implementation: [
      "Designed a VPC with public and private subnet boundaries.",
      "Placed application compute on EC2 and the relational data tier on Amazon RDS.",
      "Included a load balancer and Auto Scaling for application availability and capacity management.",
      "Applied IAM roles and security groups to define service access boundaries; the original project notes describe Multi-AZ RDS as part of the design."
    ],
    architecture: ["Route 53 / entry point", "Load Balancer", "Public subnet", "Private application subnet · EC2", "Private data subnet · RDS", "IAM + Security Groups"],
    stack: ["AWS VPC", "EC2", "RDS", "Elastic Load Balancing", "Auto Scaling", "IAM", "Security Groups"],
    outcomes: ["Documented a segmented three-tier AWS layout.", "Separated application compute from the relational data layer.", "Included scaling and Multi-AZ design considerations."],
  },
  {
    id: "question-system",
    number: "09",
    title: "AI-Powered University Question System",
    category: "Academic application · Semantic similarity",
    period: "Sep 2025 — Dec 2025",
    status: "Developed",
    summary: "An academic question-management application using vector embeddings to identify duplicate or rephrased questions and classify questions against Bloom's Taxonomy learning outcomes.",
    problem: "Question banks can contain repeated questions phrased differently. Managing duplicates and mapping questions to learning outcomes requires more than exact string matching.",
    implementation: [
      "Built the application using ASP.NET MVC, C#, SQL Server and vector embedding workflows.",
      "Implemented semantic similarity detection for duplicate and rephrased university questions.",
      "Added Bloom's Taxonomy-based learning outcome classification with configurable similarity thresholds.",
      "Developed an admin interface with CKEditor integration and support for image-based question uploads."
    ],
    architecture: ["Admin question editor", "ASP.NET MVC / C#", "Embedding generation", "Vector similarity comparison", "Threshold-based classification", "SQL Server"],
    stack: ["C#", "ASP.NET MVC", "SQL Server", "Vector Embeddings", "Local ONNX Model", "CKEditor"],
    outcomes: ["Enabled semantic comparison beyond exact text matching.", "Supported duplicate and rephrased-question detection.", "Added configurable learning-outcome classification workflows."],
  },
  {
    id: "serverless-math",
    number: "10",
    title: "AWS Serverless Math App",
    category: "Cloud architecture · Serverless API",
    period: "Feb 2025",
    status: "Architecture project",
    summary: "A small serverless application using API Gateway and Lambda for request handling, with DynamoDB as the data layer and Amplify for frontend hosting/deployment.",
    problem: "The exercise explored an API-driven application without maintaining always-on application servers.",
    implementation: [
      "Designed API Gateway endpoints to receive application requests.",
      "Used AWS Lambda functions to execute math operations from API requests.",
      "Included DynamoDB in the architecture for persistence and AWS Amplify for the frontend layer."
    ],
    architecture: ["Frontend · Amplify", "API Gateway", "AWS Lambda", "DynamoDB"],
    stack: ["AWS Lambda", "API Gateway", "DynamoDB", "Amplify"],
    outcomes: ["Practised event-driven API execution using managed serverless services.", "Separated frontend delivery, API routing, compute and persistence."],
  },
  {
    id: "sarcasm-ml",
    number: "11",
    title: "Sarcasm Detection — Machine Learning",
    category: "Machine learning · NLP",
    period: "Apr 2024 — Aug 2024",
    status: "Academic project",
    summary: "A text classification project exploring sarcasm detection using traditional machine-learning classifiers and an NLP preprocessing pipeline.",
    problem: "Sarcasm can invert the literal meaning of a sentence, making it difficult to classify using surface-level sentiment alone.",
    implementation: [
      "Prepared text data through preprocessing and feature extraction.",
      "Built and compared Support Vector Machine and Random Forest classifiers.",
      "Evaluated model behaviour as part of the classification workflow."
    ],
    architecture: ["Text dataset", "Preprocessing", "Feature extraction", "SVM classifier", "Random Forest", "Model evaluation"],
    stack: ["Python", "NLP", "SVM", "Random Forest", "Text preprocessing"],
    outcomes: ["Built a complete baseline text-classification workflow.", "Compared two supervised learning approaches for sarcasm detection."],
  }
];

export const EXPERIENCE = [
  {
    role: "Software Developer",
    company: "ICFAI Group",
    location: "Hyderabad, India",
    period: "Sep 2025 — Present",
    description: "Application development across internal business systems, backend workflows and cloud-oriented engineering initiatives.",
    highlights: [
      "Developed and enhanced .NET MVC applications using C#, ADO.NET, SQL Server and JavaScript.",
      "Worked on the CloudOps AI Platform using Python, FastAPI, AWS, Docker, MySQL and asynchronous S3/SQS processing.",
      "Built internal workflows including refund-note generation, encrypted search, PDF output and attachment management.",
      "Worked across application development, database integration, cloud infrastructure and delivery automation."
    ]
  }
];

export const SKILL_GROUPS = [
  { title: "Cloud & AWS", note: "Infrastructure, networking and managed services", skills: ["EC2", "VPC", "Subnets", "Route Tables", "IAM", "S3", "RDS", "Lambda", "API Gateway", "CloudFront", "Route 53", "SQS", "SNS", "ECR", "ECS", "CloudWatch", "ACM"] },
  { title: "DevOps & Delivery", note: "Build, release and infrastructure automation", skills: ["Linux", "Docker", "Docker Compose", "Jenkins", "GitLab CI/CD", "GitHub Actions", "Terraform", "Git", "PowerShell", "Bash", "IIS", "ARR", "URL Rewrite", "Robocopy", "Maven"] },
  { title: "Backend & .NET", note: "Application services and data access", skills: ["C#", ".NET", "ASP.NET MVC", "ASP.NET Core MVC", "ADO.NET", "REST APIs", "Python", "FastAPI", "Java"] },
  { title: "Databases & AI", note: "Persistence, retrieval and semantic search", skills: ["SQL Server", "SQL Server 2025 VECTOR", "MySQL", "PostgreSQL", "DynamoDB", "FAISS", "Sentence Transformers", "ONNX", "Ollama", "OpenCLIP"] },
  { title: "Frontend & Tools", note: "Interfaces and development workflow", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vite", "Tailwind CSS", "jQuery", "Visual Studio 2022", "VS Code"] },
];

export const CERTIFICATIONS = [
  { title: "AWS SimuLearn: Cloud Practitioner", issuer: "Amazon Web Services", href: "https://drive.google.com/file/d/1Lv66trIUmbu9EpK5dKhIqA-d6vKK_rpA/view?usp=drive_link", description: "Hands-on simulated cloud practitioner training covering foundational AWS architecture and services." },
  { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", href: "https://drive.google.com/file/d/1RQyQcSBaOCrfJq9nTjPioBIhu2rOennC/view?usp=drive_link", description: "Foundational AWS cloud concepts, security, core services and pricing." },
  { title: "AWS Solutions Architect — Fundamentals of Architecting on AWS", issuer: "Amazon Web Services", href: "https://drive.google.com/file/d/1GMhUlLgNEfgMZYcnFACncIJMcv9d3-U1/view?usp=drive_link", description: "Architecture fundamentals including availability, resilience, decoupling and scalable cloud design." },
  { title: "AWS DevOps Certificate", issuer: "Amazon Web Services", href: "https://drive.google.com/file/d/1jGDuMcJ_HnjEEUB6f46VuHrTVvHoFCoh/view?usp=drive_link", description: "DevOps practices, CI/CD automation, infrastructure provisioning and monitoring." },
];

export const EDUCATION = [
  { degree: "Master of Computer Applications (MCA)", institution: "RG Kedia College of Commerce", period: "2022 — 2024", result: "CGPA 7.67" },
  { degree: "Bachelor of Science (MECs)", institution: "Nrupatunga Degree & PG College", period: "2019 — 2022", result: "8.29" },
];
