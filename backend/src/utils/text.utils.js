export const normalizeText = (text) => {
  const cleaned = text
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = cleaned.split(" ").length;

  const sentenceCount = cleaned.split(/[.!?]+/).filter(Boolean).length;

  return {
    normalizedText: cleaned,
    meta: {
      wordCount,
      sentenceCount,
      language: "en"
    }
  };
};
