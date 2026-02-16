export const emotionDensitySignal = (text) => {
  const emotionalWords = [
    "shocking",
    "incredible",
    "outrageous",
    "unbelievable",
    "terrifying",
    "amazing",
    "disaster",
    "scandal",
    "explosive",
    "devastating"
  ];

  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;

  let emotionalCount = 0;

  words.forEach((word) => {
    if (emotionalWords.includes(word)) {
      emotionalCount++;
    }
  });

  const density = emotionalCount / totalWords;
  const normalized = Math.min(density * 5, 1); // scale factor

  return {
    value: Number(normalized.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      emotionalCount > 0
        ? "Content uses emotionally charged language."
        : "Content tone appears neutral.",
    limitations:
      "Emotional language may appear in legitimate journalism."
  };
};
