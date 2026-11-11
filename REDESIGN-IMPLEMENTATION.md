# Portfolio redesign — interactive terminal + full case studies

## What changed

- Replaced the terminal-only landing page with an interactive terminal plus complete portfolio sections below it.
- Standardized the displayed identity as **Venkatamani Sasank**. Removed the `kittu@...` and `sasank@dev-server` prompt strings.
- Kept the black / white / electric-blue visual direction and the startup sequence.
- Added detailed expandable case studies with context, architecture flow, implementation notes, outcomes and technology stacks.
- Added career experience, grouped technical skills, education, four AWS certificate links, engineering delivery flow and contact links.
- Added terminal commands for profile, projects, individual project deep-dives, skills, experience, education and contact.
- Retired the old unreferenced `src/app/app.tsx` screen with a compatibility placeholder; its relevant project/profile data has been moved into the new portfolio data model.
- Restored `.github/workflows/pages-deploy.yml` from the checked-out branch version; the deployment workflow is not intentionally removed.
- Retained the existing Vite `base: '/my-portfolio/'` configuration for GitHub Pages.
- Removed unverified Blue-Green deployment speed / zero-downtime / rollback metrics from the public content.

## Project case studies included

1. CloudOps AI Platform
2. Enterprise Blue-Green CI/CD for .NET & IIS
3. Refund Note Management System
4. IRCTC Reservation System Clone
5. ICFAI University RAG Chatbot
6. Sri Aditya Enterprises
7. Jenkins CI/CD Pipeline with Maven
8. AWS 3-Tier Architecture
9. AI-Powered University Question System
10. AWS Serverless Math App
11. Sarcasm Detection — Machine Learning

## Run locally

From the repository root:

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
```

TypeScript validation used during preparation:

```bash
tsc --noEmit
```

The TypeScript check passed. A production Vite build could not be completed in the preparation container because the uploaded `node_modules` contains Windows Rollup optional binaries but not the Linux Rollup binary required by that container. This is an environment/dependency-platform issue, not a reported application compile error. Run `npm install` on the Windows development machine before building.

## Before publishing

Please verify these details against your current records:

- Email address currently carried forward from the existing source: `shashank.manikanta@gmail.com`.
- LinkedIn URL currently carried forward: `https://linkedin.com/in/venkatamani-sasank`.
- Sri Aditya Enterprises public URL: `https://sriadityaenterprises.com`.
- MCA institution, period and CGPA are carried forward from the existing portfolio source.
- B.Sc. (MECs) is shown without institution/date because those details were not present in the source used for this update.
- ICFAI Group role dates are carried forward as `Sep 2025 — Present`.
- Blue-Green CI/CD is labelled as a PoC implementation. No unverified deployment-time, downtime or rollback metrics are claimed.

## Git safety

The source archive's checked-out branch was `feature/interactive-terminal-portfolio`. The `main` branch and GitHub Pages deployment were not changed by this local source edit. Review the diff, run the build on Windows, test desktop/mobile interactions, then commit and push the feature branch. Merge only after review.
