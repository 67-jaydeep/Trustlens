export const claimSourceRatioSignal = (text) => {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const lower = text.toLowerCase();

  const sourceIndicators = [
    "according to",
    "source:",
    "reported by",
    "study",
    "research",
    "published",
    "http://",
    "https://"
  ];

  let sourceCount = 0;

  sourceIndicators.forEach((indicator) => {
    if (lower.includes(indicator)) {
      sourceCount++;
    }
  });

  const claimCount = sentences.length;

  if (claimCount === 0) {
    return {
      value: 0,
      confidence: "LOW",
      explanation: "Insufficient content for claim analysis.",
      limitations: "Very short content cannot be evaluated reliably."
    };
  }

  const ratio = sourceCount / claimCount;
  const normalized = 1 - Math.min(ratio, 1);

  return {
    value: Number(normalized.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      sourceCount > 0
        ? "Content includes some sourcing indicators."
        : "Content makes claims without visible sourcing.",
    limitations:
      "Not all legitimate claims require explicit citation."
  };
};
