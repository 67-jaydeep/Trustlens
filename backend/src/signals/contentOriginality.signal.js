export const contentOriginalitySignal = (text) => {
  const sentences = text
    .toLowerCase()
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return {
      value: 0,
      confidence: "LOW",
      explanation: "Insufficient content for originality analysis.",
      limitations: "Very short content cannot be evaluated reliably."
    };
  }

  const uniqueSentences = new Set(sentences);
  const repetitionRatio = 1 - (uniqueSentences.size / sentences.length);

  const words = text.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);

  const vocabularyDiversity = uniqueWords.size / words.length;

  const repetitionScore = repetitionRatio;
  const diversityScore = 1 - vocabularyDiversity;

  const combined = Math.min((repetitionScore + diversityScore) / 2, 1);

  return {
    value: Number(combined.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      combined > 0.5
        ? "Content shows repetitive or low-diversity patterns."
        : "Content appears structurally varied.",
    limitations:
      "Short structured content may appear repetitive without being low quality."
  };
};
