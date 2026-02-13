# Aggregation Logic & Risk Bands

Status: Frozen  
Phase: 2  

---

## Objective

Aggregate independent trust signals into a conservative,
interpretable risk summary.

---

## Step 1 — Normalization

Each signal produces value between:

0.0 → No observable risk  
1.0 → High observable risk  

---

## Step 2 — Signal Grouping

Group A — Framing & Emotion
- Emotional Language Density
- Sensational Headline

Group B — Evidence & Accountability
- Claim-to-Source Ratio
- Structural Transparency

Group C — Production & Scale
- Content Originality
- AI-Likeness Risk

Group D — Persuasion Style
- Readability vs Persuasion

---

## Step 3 — Within-Group Aggregation

Within each group:
Use maximum value (not sum).

Prevents double-counting correlated signals.

---

## Step 4 — Cross-Group Aggregation

Weighted average:

Framing → 30%  
Evidence → 35%  
Production → 20%  
Persuasion → 15%

---

## Risk Bands

LOW → 0.0 – 0.3  
MEDIUM → 0.31 – 0.6  
HIGH → 0.61 – 1.0  

---

## Conflict Detection

If signals contradict:
Surface conflict in report.

Example:
High emotional framing + High transparency

---

## Important

Aggregation does NOT:
- Determine truth
- Override signal explanations
- Hide failed signals

Human interpretation remains essential.
