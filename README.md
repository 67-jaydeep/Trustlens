# TRUSTLENS

An explainable Trust & Misinformation Intelligence Platform  
Built with zero budget. Designed with production-level discipline.

---

##  Project Overview

TRUSTLENS is a research-driven, solo-built MVP that analyzes
observable trust-risk patterns in online content.

Instead of attempting to determine factual truth,
TRUSTLENS evaluates structural, linguistic, and sourcing signals
that may indicate elevated trust risk.

The system is intentionally:

- Explainable
- Conservative
- Ethical
- Transparent
- Free-tier deployable

---

##  Problem Statement

The internet is increasingly flooded with:

- AI-generated content
- Sensationalized headlines
- Selective sourcing
- Manipulative framing
- Low-transparency publishing

Most existing tools:

- Claim to detect "fake news"
- Use black-box AI
- Provide unexplained confidence scores
- Rely on paid APIs or proprietary datasets

There is a need for a transparent system that:

- Does not claim truth
- Does not make political judgments
- Does not rely on paid AI services
- Explains exactly how risk is evaluated

TRUSTLENS addresses that gap.

---

##  Core Philosophy

TRUSTLENS does not determine truth.

It evaluates trust risk patterns.

Key distinctions:

- Trust ≠ Truth
- Risk ≠ Verdict
- Signal ≠ Accusation

Human judgment remains essential.

---

##  What TRUSTLENS Does

TRUSTLENS:

- Accepts text or public URLs
- Extracts and normalizes content
- Executes independent trust signals
- Aggregates signals conservatively
- Generates a human-readable trust report
- Stores analysis history per user

Each trust signal:

- Produces a normalized value (0.0 – 1.0)
- Provides explanation
- Includes limitations
- Operates independently

Final output is a risk band:

- LOW
- MEDIUM
- HIGH

---

##  What TRUSTLENS Does NOT Do

TRUSTLENS does NOT:

- Claim factual correctness
- Detect "fake news"
- Classify political bias
- Perform AI authorship detection
- Use paid AI APIs
- Enforce censorship
- Replace human fact-checking

This restraint is intentional.

---

## Trust Signals (v1)

TRUSTLENS v1 uses seven explainable trust-risk signals:

1. Emotional Language Density
2. Sensational Headline Patterns
3. Claim-to-Source Ratio
4. Readability vs Persuasion Imbalance
5. Content Originality Heuristics
6. AI-Likeness Risk Pattern
7. Structural Transparency

See: `/trust-signals/v1.md`

---

## System Architecture

TRUSTLENS is an asynchronous API-first system.

Flow:

User → Frontend → Backend API → Job Queue → Signal Workers → MongoDB → Aggregation → Trust Report

Core technologies:

- Frontend: React (Vite), Tailwind, TanStack Query
- Backend: Node.js, Express.js
- Database: MongoDB Atlas (Free Tier)
- Background Jobs: In-memory queue (Redis optional)
- Deployment: Vercel (frontend) + Render (backend)

See detailed architecture: `/docs/architecture.md`

---

## Aggregation Model

Signals are grouped to prevent double-counting:

- Framing & Emotion
- Evidence & Accountability
- Production & Scale
- Persuasion Style

Aggregation is:

- Conservative
- Weighted transparently
- Conflict-aware

See: `/docs/aggregation-logic.md`

---

## Database Design

MongoDB collections:

- users
- analysis_jobs
- signal_results
- aggregated_results

Signal results are immutable for auditability.

See: `/docs/database-schema.md`

---

## API Design

Key endpoints:

POST /api/analyze  
GET /api/analysis/:jobId  
GET /api/history  

Full contracts: `/docs/api-contracts.md`

---

## Project Phases

Phase 0 — Scope & Constraints ✅  
Phase 1 — Research & Trust Signal Foundations ✅  
Phase 2 — System Architecture & Design ✅  
Phase 3 — Backend Implementation (In Progress)  
Phase 4 — Validation & Edge Cases  
Phase 5 — Documentation & Presentation  

---

## Zero-Budget Commitment

This project is intentionally built with:

- No paid APIs
- No commercial AI services
- No paid infrastructure
- Free-tier deployment only

All design decisions respect this constraint.

---

## Ethical Boundaries

TRUSTLENS explicitly:

- Avoids authoritative verdicts
- Communicates uncertainty
- Surfaces limitations
- Documents scope boundaries

It is an advisory tool, not an enforcement mechanism.

---

## Why This Project Exists

TRUSTLENS demonstrates:

- Senior-level backend system design
- Asynchronous architecture
- Clear scoping discipline
- Explainable heuristics
- Ethical AI restraint
- Production-style documentation

This is not a demo app.
It is a system-thinking exercise executed end-to-end.

---

## Author

Solo-built as a long-term system design project.

---

## License

MIT License
