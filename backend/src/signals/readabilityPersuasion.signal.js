export const readabilityPersuasionSignal = (text) => {
  const words = text.split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(Boolean);

  const avgSentenceLength = words.length / (sentences.length || 1);

  const persuasiveWords = [
    "must",
    "should",
    "act now",
    "don't miss",
    "urgent",
    "immediately"
  ];

  let persuasiveCount = 0;
  const lower = text.toLowerCase();

  persuasiveWords.forEach((word) => {
    if (lower.includes(word)) {
      persuasiveCount++;
    }
  });

  const persuasionDensity = persuasiveCount / (sentences.length || 1);

  const normalized = Math.min(persuasionDensity * 2, 1);

  return {
    value: Number(normalized.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      persuasiveCount > 0
        ? "Content uses directive or persuasive language."
        : "Content appears informational rather than persuasive.",
    limitations:
      "Instructional content may contain directive language without manipulation."
  };
};
