SECTION F — SCORING & INTERPRETATION
TRUSTLENS Phase 1 Research
Q31. What does a trust score actually represent?

Short Answer
A trust score represents the aggregate presence of observable trust-risk patterns, not factual correctness or intent.

Explanation
The score answers:

“How many known risk indicators does this content exhibit, and how strongly?”

It does not answer:

whether the content is true,

whether the author is honest,

whether the content should be censored.

Design Implication for TRUSTLENS
Scores are explicitly framed as risk indicators, always paired with explanations.

Known Limitation
Users may still overinterpret numeric scores.

Q32. Should trust be represented as a number, category, or explanation?

Short Answer
Trust should be represented primarily through explanations, with numbers or categories as secondary aids.

Explanation
Numbers are:

quick to scan,

easy to compare,

but prone to false precision.

Explanations:

encourage critical thinking,

provide transparency,

reduce blind reliance.

Design Implication for TRUSTLENS
UI emphasizes signal explanations before overall score.

Known Limitation
Some users prefer simple metrics over detailed analysis.

Q33. How can TRUSTLENS avoid false precision in scoring?

Short Answer
By using coarse-grained scoring, bounded ranges, and qualitative descriptors.

Explanation
False precision arises from:

overly specific numbers,

hidden weighting,

implied certainty.

Mitigation strategies include:

rounded scores,

risk bands (Low / Medium / High),

confidence disclaimers.

Design Implication for TRUSTLENS
Scores are intentionally approximate and contextual.

Known Limitation
Coarse scores may feel less “scientific” to some users.

Q34. How should conflicting signal results be interpreted?

Short Answer
Conflicting signals indicate mixed trust characteristics, not system failure.

Explanation
Example:

High emotional tone (risk)

High source density (trust)

This suggests content that is emotionally framed but well-referenced.

Design Implication for TRUSTLENS
Conflicts are surfaced explicitly, not averaged away.

Known Limitation
Users may struggle to interpret nuanced outputs.

Q35. Why should explanations take priority over numeric scores?

Short Answer
Because explanations convey reasoning, while numbers convey authority.

Explanation
Numbers without context:

discourage questioning,

imply objectivity,

shift responsibility to the system.

Explanations:

empower users,

reveal assumptions,

support ethical use.

Design Implication for TRUSTLENS
Every score must be traceable to individual signals and text features.

Known Limitation
Detailed explanations increase cognitive load.