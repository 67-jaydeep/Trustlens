SECTION H — LIMITATIONS & EDGE CASES
TRUSTLENS Phase 1 Research
Q41. What content types are unsuitable for trust analysis?

Short Answer
Content that lacks sufficient linguistic or structural information is unsuitable for trust analysis.

Explanation
Examples include:

very short text (tweets, headlines alone),

poetry or abstract writing,

pure code snippets,

memes or image-only content,

highly technical data tables.

These formats do not expose enough trust-related signals.

Design Implication for TRUSTLENS
The system should reject or warn on unsuitable inputs rather than produce misleading scores.

Known Limitation
Rejecting content may frustrate users expecting universal coverage.

Q42. How does satire or parody affect trust signals?

Short Answer
Satire and parody intentionally mimic low-trust signals while aiming to entertain, not deceive.

Explanation
Satirical content often uses:

exaggerated emotion,

absurd claims,

sensational framing.

These patterns overlap heavily with misinformation signals.

Design Implication for TRUSTLENS
Satire is treated as a known false-positive category and documented explicitly.

Known Limitation
Automatically distinguishing satire from misinformation is unreliable without context.

Q43. How do cultural and linguistic differences impact analysis?

Short Answer
Trust signals are culturally and linguistically dependent, especially emotional expression and framing norms.

Explanation

Emotional intensity varies by culture

Sensationalism thresholds differ

Idioms and tone may be misinterpreted

English-centric heuristics do not generalize globally.

Design Implication for TRUSTLENS
The MVP is explicitly English-first with documented cultural limitations.

Known Limitation
Non-English or culturally distinct content may be mis-scored.

Q44. How does legitimate emotional journalism affect scoring?

Short Answer
Legitimate emotional journalism may score higher risk despite being responsible and accurate.

Explanation
Topics such as:

war,

disasters,

social injustice,

often require emotional language to convey human impact.

Design Implication for TRUSTLENS
Emotion signals are contextualized and never treated as standalone indicators.

Known Limitation
Contextual appropriateness cannot be fully inferred algorithmically.

Q45. How should extremely short or long content be handled?

Short Answer
Both extremes require special handling to avoid unstable or misleading analysis.

Explanation

Short content lacks signal density → high variance

Long content may dilute signals → averaging hides risk

Uniform analysis produces unreliable results.

Design Implication for TRUSTLENS
Input length thresholds and normalization logic are required.

Known Limitation
Thresholds are heuristic and imperfect.