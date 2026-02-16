export const structuralTransparencySignal = (text) => {
  let score = 0;
  const lower = text.toLowerCase();

  const indicators = [
    "by ",
    "author",
    "published",
    "updated",
    "source:",
    "references",
    "http://",
    "https://"
  ];

  indicators.forEach((indicator) => {
    if (lower.includes(indicator)) {
      score += 1;
    }
  });

  const maxScore = indicators.length;
  const normalized = 1 - score / maxScore;

  return {
    value: Number(normalized.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      score > 0
        ? "Content includes structural transparency indicators."
        : "Content lacks clear authorship or sourcing indicators.",
    limitations:
      "Some legitimate content may omit visible structural markers."
  };
};
