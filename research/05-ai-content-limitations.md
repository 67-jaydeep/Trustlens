SECTION E — AI-GENERATED CONTENT RESEARCH
TRUSTLENS Phase 1 Research
Q26. Why is reliable AI-generated content detection fundamentally unsolved?

Short Answer
Because AI-generated and human-written text share overlapping linguistic patterns, and both continuously evolve.

Explanation
Reliable detection is undermined by:

shared training data between humans and models,

rapid model improvements,

human-AI collaborative writing,

prompt engineering and post-editing.

No static rule or model can reliably distinguish authorship across domains.

Design Implication for TRUSTLENS
TRUSTLENS does not attempt authorship attribution.

Known Limitation
AI-assisted content may still influence trust signals indirectly.

Q27. What are the known failure modes of AI-detection tools?

Short Answer
AI-detection tools produce high false positives and false negatives, especially for fluent human writing and edited AI output.

Explanation
Common failures include:

mislabeling non-native English writers,

flagging professional journalism as AI,

failing on paraphrased AI text,

confidence inflation without explanation.

These failures reduce trust in the detector itself.

Design Implication for TRUSTLENS
TRUSTLENS avoids binary AI detection and never presents confidence as certainty.

Known Limitation
Users may expect definitive AI detection due to market messaging.

Q28. What observable patterns are associated with AI-assisted writing?

Short Answer
AI-assisted writing often exhibits high fluency with low specificity and limited experiential markers.

Explanation
Common patterns include:

generic transitions,

balanced but shallow arguments,

lack of concrete personal detail,

repetitive sentence structures,

polished grammar without stylistic irregularities.

These patterns are not exclusive to AI but may indicate risk at scale.

Design Implication for TRUSTLENS
Such patterns contribute to an AI-likeness risk signal, not authorship claims.

Known Limitation
Skilled human writers may exhibit similar patterns.

Q29. Why should TRUSTLENS avoid claiming AI authorship detection?

Short Answer
Because such claims cannot be reliably justified and create false authority.

Explanation
Authorship detection:

overstates system capability,

misleads users,

risks reputational harm,

violates explainability principles.

Claiming uncertainty is more ethical than claiming certainty.

Design Implication for TRUSTLENS
Outputs use cautious language: “exhibits AI-like patterns”.

Known Limitation
This conservative stance may reduce perceived decisiveness.

Q30. How can AI-likeness be framed as a risk signal instead of fact?

Short Answer
By treating AI-likeness as a pattern-based indicator that increases scrutiny, not a label of origin.

Explanation
AI-likeness contributes to trust risk when combined with:

low sourcing,

high fluency,

repetitive structure,

engagement-optimized framing.

It signals scale and impersonality, not deception.

Design Implication for TRUSTLENS
AI-likeness is one input among many, always accompanied by explanation.

Known Limitation
Risk framing may still be misunderstood by users.