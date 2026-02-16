export const sensationalHeadlineSignal = (text) => {
  const lower = text.toLowerCase();

  const patterns = [
    "you won't believe",
    "what happened next",
    "shocking truth",
    "this will blow your mind",
    "must see",
    "revealed",
    "exposed",
    "the truth about",
    "top secret",
    "breaking:"
  ];

  let matchCount = 0;

  patterns.forEach((pattern) => {
    if (lower.includes(pattern)) {
      matchCount++;
    }
  });

  const normalized = Math.min(matchCount / 3, 1);

  return {
    value: Number(normalized.toFixed(2)),
    confidence: "MEDIUM",
    explanation:
      matchCount > 0
        ? "Content contains sensational or click-driven phrasing."
        : "No strong sensational headline patterns detected.",
    limitations:
      "Some opinion or marketing content may legitimately use attention-grabbing phrases."
  };
};
