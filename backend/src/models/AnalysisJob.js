import mongoose from "mongoose";

const analysisJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    inputType: {
      type: String,
      enum: ["text", "url"],
      required: true
    },

    originalInput: {
      type: String,
      required: true
    },

    normalizedTextHash: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "QUEUED",
        "PROCESSING",
        "PARTIAL",
        "COMPLETED",
        "FAILED"
      ],
      default: "CREATED",
      index: true
    },

    signalVersion: {
      type: String,
      required: true
    },

    meta: {
      wordCount: Number,
      sentenceCount: Number,
      language: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date
    }
  },
  { versionKey: false }
);

// Compound index for user history
analysisJobSchema.index({ userId: 1, createdAt: -1 });

export const AnalysisJob = mongoose.model(
  "AnalysisJob",
  analysisJobSchema
);
