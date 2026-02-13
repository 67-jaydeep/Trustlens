import mongoose from "mongoose";

const aggregatedResultSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnalysisJob",
      required: true,
      unique: true
    },

    overallRiskBand: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true
    },

    overallScore: {
      type: Number,
      min: 0,
      max: 1,
      required: true
    },

    groupScores: {
      framing: Number,
      evidence: Number,
      production: Number,
      persuasion: Number
    },

    conflicts: {
      type: [String],
      default: []
    },

    notes: {
      type: [String],
      default: []
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export const AggregatedResult = mongoose.model(
  "AggregatedResult",
  aggregatedResultSchema
);
