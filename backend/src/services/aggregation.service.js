export const aggregateSignals = (signalResults) => {
  if (!signalResults || signalResults.length === 0) {
    return {
      overallRiskBand: "LOW",
      overallScore: 0,
      groupScores: {},
      conflicts: ["No signal data available"],
      notes: ["Aggregation incomplete"]
    };
  }

  const groups = {
    framing: [],
    evidence: [],
    production: [],
    persuasion: []
  };

  signalResults.forEach((signal) => {
    if (signal.signalId === "emotion_density" ||
        signal.signalId === "sensational_headline") {
      groups.framing.push(signal.value);
    }

    if (signal.signalId === "claim_source_ratio" ||
        signal.signalId === "structural_transparency") {
      groups.evidence.push(signal.value);
    }

    if (signal.signalId === "content_originality" ||
        signal.signalId === "ai_likeness_risk") {
      groups.production.push(signal.value);
    }

    if (signal.signalId === "readability_persuasion") {
      groups.persuasion.push(signal.value);
    }
  });

  const groupScores = {};

  Object.keys(groups).forEach((group) => {
    groupScores[group] =
      groups[group].length > 0
        ? Math.max(...groups[group])
        : 0;
  });

  const weights = {
    framing: 0.3,
    evidence: 0.35,
    production: 0.2,
    persuasion: 0.15
  };

  const overallScore =
    groupScores.framing * weights.framing +
    groupScores.evidence * weights.evidence +
    groupScores.production * weights.production +
    groupScores.persuasion * weights.persuasion;

  const roundedScore = Number(overallScore.toFixed(2));

  let overallRiskBand = "LOW";

  if (roundedScore > 0.6) overallRiskBand = "HIGH";
  else if (roundedScore > 0.3) overallRiskBand = "MEDIUM";

  const conflicts = [];

  if (groupScores.framing > 0.7 && groupScores.evidence < 0.3) {
    conflicts.push("High emotional framing with low sourcing.");
  }

  return {
    overallRiskBand,
    overallScore: roundedScore,
    groupScores,
    conflicts,
    notes: []
  };
};
