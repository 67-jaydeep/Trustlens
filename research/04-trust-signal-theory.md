SECTION D — TRUST SIGNAL THEORY
TRUSTLENS Phase 1 Research
Q19. What qualifies as a valid trust signal?

Short Answer
A valid trust signal is an observable, content-derived pattern that correlates with increased or decreased trust risk and can be explained without external authority.

Explanation
A trust signal must:

be derived from the content itself,

be consistently measurable,

have a defensible rationale,

avoid hidden assumptions.

Signals do not assert intent or truth — only risk patterns.

Design Implication for TRUSTLENS
Every signal must justify why it exists and what behavior it reflects.

Known Limitation
Correlation does not imply causation; signals indicate risk, not intent.

Q20. Why must trust signals be observable and measurable?

Short Answer
Because unobservable signals cannot be audited, debugged, or explained.

Explanation
Signals based on:

hidden models,

intuition,

external judgment,

cannot be defended in production systems. Observability ensures transparency and reproducibility.

Design Implication for TRUSTLENS
All signals are computed from text features, structure, or metadata.

Known Limitation
Some trust-relevant qualities (intent, deception) are not directly observable.

Q21. Why should trust signals be independent from each other?

Short Answer
Independence prevents compounding bias and allows modular reasoning.

Explanation
Independent signals:

isolate specific behaviors,

simplify debugging,

allow selective weighting,

support future extension.

This mirrors production monitoring systems, not monolithic scoring.

Design Implication for TRUSTLENS
Each signal runs as an isolated analyzer with its own explanation.

Known Limitation
Complete independence is theoretical; some overlap is unavoidable.

Q22. Which trust signals are likely to be correlated?

Short Answer
Signals derived from similar linguistic features may partially correlate.

Explanation
Examples:

Emotional language ↔ sensational headlines

Repetition ↔ simplicity

Fluency ↔ AI-likeness

Correlation is expected but must be acknowledged.

Design Implication for TRUSTLENS
Aggregation logic must avoid double-counting correlated risk.

Known Limitation
Perfect de-correlation is not achievable without ML.

Q23. How can double-counting risk be avoided?

Short Answer
By designing signals with narrow scope and aggregating conservatively.

Explanation
Risk mitigation strategies:

define precise signal boundaries,

cap individual signal contribution,

favor explanation over numeric accumulation.

Design Implication for TRUSTLENS
The final score is interpretable as composite risk, not sum of faults.

Known Limitation
Some overlap will still inflate perceived risk in edge cases.

Q24. Which types of signals are explainable without ML?

Short Answer
Rule-based, statistical, and pattern-based signals are explainable without ML.

Explanation
Examples include:

word density ratios,

structural markers,

citation presence,

repetition counts,

readability heuristics.

These signals align with system transparency goals.

Design Implication for TRUSTLENS
Signal design favors simplicity, clarity, and reproducibility.

Known Limitation
Complex semantic understanding is out of scope.

Q25. Which potential signals are out of scope due to constraints?

Short Answer
Signals requiring deep semantic understanding, external datasets, or trained models are out of scope.

Explanation
Out-of-scope signals include:

factual claim verification,

sentiment classification via ML,

author reputation scoring,

social network analysis.

These violate cost, explainability, or scope constraints.

Design Implication for TRUSTLENS
TRUSTLENS remains focused on content-internal heuristics.

Known Limitation
Some high-impact misinformation patterns require external context.