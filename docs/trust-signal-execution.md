# Trust Signal Execution Flow

Status: Frozen  
Phase: 2  

---

## Purpose

Define how trust signals execute safely, independently,
and asynchronously.

---

## Execution Steps

### 1. Content Submission

User submits:
- text OR
- public URL

Backend:
- validates input
- normalizes content
- creates analysis job

---

### 2. Content Normalization

If URL:
- Fetch content
- Strip HTML
- Extract readable text

Normalize:
- Remove extra whitespace
- Sentence segmentation
- Tokenization
- Metadata extraction (word count, etc.)

All signals use the same normalized text.

---

### 3. Job Registration

Analysis job stored with:
- Status: QUEUED
- Signal version: v1
- Signal list predefined

---

### 4. Signal Dispatch

Each signal runs independently:

- emotion_density
- sensational_headline
- claim_source_ratio
- readability_persuasion
- content_originality
- ai_likeness_risk
- structural_transparency

No cross-signal dependency.

---

### 5. Signal Contract

Each signal must return:

- signalId
- status (COMPLETED or FAILED)
- value (0.0 – 1.0)
- explanation
- limitations
- executionTimeMs

---

### 6. Failure Handling

If a signal fails:
- Error is captured
- Signal marked FAILED
- Other signals continue

System never aborts entire job for single-signal failure.

---

### 7. Completion Rules

If all signals complete → COMPLETED  
If some fail → PARTIAL  
If system-level failure → FAILED

---

## Key Principles

- Isolation
- Fault tolerance
- Explainability
- Versioning
- Deterministic outputs
