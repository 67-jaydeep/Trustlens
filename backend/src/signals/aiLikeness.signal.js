export const aiLikenessSignal = (text) => {
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean);

  if (sentences.length < 3) {
    return {
      value: 0,
      confidence: "LOW",
      explanation: "Insufficient sentence count for AI pattern analysis.",
      limitations: "Very short content cannot be evaluated reliably."
    };
  }

  const lengths = sentences.map(s => s.split(/\s+/).length);

  const avg =
    lengths.reduce((sum, len) => sum + len, 0) / lengths.length;

  const variance =
    lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) /
    lengths.length;

  const uniformityScore = variance < 5 ? 0.7 : 0.2;

  const transitionIndicators = [
    "in conclusion",
    "moreover",
    "furthermore",
    "additionally",
    "overall",
    "in summary"
  ];

  const lower = text.toLowerCase();
  let transitionCount = 0;

  transitionIndicators.forEach(word => {
    if (lower.includes(word)) transitionCount++;
  });

  const transitionScore = Math.min(transitionCount / 3, 1);

  const combined = Math.min(
    (uniformityScore + transitionScore) / 2,
    1
  );

  return {
    value: Number(combined.toFixed(2)),
    confidence: "LOW",
    explanation:
      combined > 0.5
        ? "Content exhibits structural patterns sometimes associated with AI-assisted writing."
        : "No strong AI-like structural patterns detected.",
    limitations:
      "Human-written content may also follow structured patterns."
  };
};
