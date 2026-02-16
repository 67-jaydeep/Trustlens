import { AnalysisJob } from "../models/AnalysisJob.js";
import { SignalResult } from "../models/SignalResult.js";
import { AggregatedResult } from "../models/AggregatedResult.js";
import { aggregateSignals } from "../services/aggregation.service.js";

import { structuralTransparencySignal } from "../signals/structuralTransparency.signal.js";
import { emotionDensitySignal } from "../signals/emotionDensity.signal.js";
import { sensationalHeadlineSignal } from "../signals/sensationalHeadline.signal.js";
import { claimSourceRatioSignal } from "../signals/claimSourceRatio.signal.js";
import { readabilityPersuasionSignal } from "../signals/readabilityPersuasion.signal.js";
import { contentOriginalitySignal } from "../signals/contentOriginality.signal.js";
import { aiLikenessSignal } from "../signals/aiLikeness.signal.js";


const POLL_INTERVAL_MS = 5000; // every 5 seconds

// Map signal IDs to actual functions
const signalFunctions = {
  structural_transparency: structuralTransparencySignal,
  emotion_density: emotionDensitySignal,
  sensational_headline: sensationalHeadlineSignal,
  claim_source_ratio: claimSourceRatioSignal,
  readability_persuasion: readabilityPersuasionSignal,
  content_originality: contentOriginalitySignal,
  ai_likeness_risk: aiLikenessSignal
};

export const startJobWorker = () => {
  console.log("🛠 Job worker started");

  setInterval(async () => {
    try {
      const job = await AnalysisJob.findOneAndUpdate(
        { status: "QUEUED" },
        { status: "PROCESSING" },
        { returnDocument: "after" }
      );

      if (!job) return;

      console.log(`🔄 Processing job ${job._id}`);

      await processJob(job);

    } catch (error) {
      console.error("Worker error:", error.message);
    }
  }, POLL_INTERVAL_MS);
};

const processJob = async (job) => {
  try {
    const signalIds = Object.keys(signalFunctions);

    for (const signalId of signalIds) {
      try {
        const result = signalFunctions[signalId](job.originalInput);

        await SignalResult.create({
          jobId: job._id,
          signalId,
          signalVersion: job.signalVersion,
          status: "COMPLETED",
          value: result.value,
          confidence: result.confidence,
          explanation: result.explanation,
          limitations: result.limitations,
          executionTimeMs: 5
        });

      } catch (signalError) {
        await SignalResult.create({
          jobId: job._id,
          signalId,
          signalVersion: job.signalVersion,
          status: "FAILED",
          error: signalError.message
        });
      }
    }

    // Real aggregation using signal results
    const signalResults = await SignalResult.find({
    jobId: job._id,
    status: "COMPLETED"
    });

    const aggregation = aggregateSignals(signalResults);

    await AggregatedResult.create({
    jobId: job._id,
    overallRiskBand: aggregation.overallRiskBand,
    overallScore: aggregation.overallScore,
    groupScores: aggregation.groupScores,
    conflicts: aggregation.conflicts,
    notes: aggregation.notes
    });

    job.status = "COMPLETED";
    job.completedAt = new Date();
    await job.save();

    console.log(`✅ Job ${job._id} completed`);

  } catch (error) {
    job.status = "FAILED";
    await job.save();
    console.error(`❌ Job ${job._id} failed`);
  }
};
