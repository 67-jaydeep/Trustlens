import mongoose from "mongoose";

const signalResultSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnalysisJob",
      required: true,
      index: true
    },

    signalId: {
      type: String,
      required: true
    },

    signalVersion: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["COMPLETED", "FAILED"],
      required: true
    },

    value: {
      type: Number,
      min: 0,
      max: 1
    },

    confidence: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"]
    },

    explanation: {
      type: String
    },

    limitations: {
      type: String
    },

    executionTimeMs: {
      type: Number
    },

    error: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

// Ensure one result per signal per job
signalResultSchema.index({ jobId: 1, signalId: 1 }, { unique: true });

export const SignalResult = mongoose.model(
  "SignalResult",
  signalResultSchema
);
