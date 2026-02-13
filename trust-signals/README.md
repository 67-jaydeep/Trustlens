# Trust Signals — TRUSTLENS

Status: Active  
Current Version: v1  

---

## What Are Trust Signals?

Trust signals are observable, explainable content patterns used by TRUSTLENS
to evaluate trust risk in online content.

They are NOT:
- Truth detectors
- Fact-checking systems
- Political classifiers
- AI authorship detectors
- Censorship tools

Trust signals highlight structural and behavioral risk patterns
that may warrant closer human scrutiny.

---

## Why Trust Signals Exist

The internet contains:
- AI-generated content
- Sensational framing
- Selective sourcing
- Manipulative narratives

Determining truth programmatically is unreliable and often unethical.

Instead, TRUSTLENS evaluates:

- Emotional framing
- Evidence patterns
- Production signals
- Structural transparency

This approach prioritizes explainability over authority.

---

## Core Design Principles

All trust signals:

1. Are content-internal (no external paid APIs)
2. Are explainable in plain language
3. Operate independently
4. Produce a numeric risk value (0.0 – 1.0)
5. Include limitations
6. Never claim factual correctness

---

## Signal Lifecycle

For each analysis:

1. Content is normalized.
2. Each trust signal runs independently.
3. Each signal produces:
   - value
   - explanation
   - limitations
4. Signals are aggregated conservatively.
5. Final output is a risk band (LOW / MEDIUM / HIGH).

---

## Versioning Policy

Trust signals are versioned immutably.

- v1 → Current MVP signal set
- Future updates → v2, v3, etc.
- Older versions are never overwritten

This ensures reproducibility of past analyses.

---

## Current Version

See: `v1.md`
