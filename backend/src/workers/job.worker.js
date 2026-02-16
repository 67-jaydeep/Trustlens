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

const POLL_INTERVAL_MS = 5000;
const PROCESSING_TIMEOUT_MS = 60 * 1000; // 1 minute

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
      // 1️⃣ Recover stuck PROCESSING jobs
      await AnalysisJob.updateMany(
        {
          status: "PROCESSING",
          processingStartedAt: {
            $lt: new Date(Date.now() - PROCESSING_TIMEOUT_MS)
          }
        },
        {
          $set: { status: "QUEUED" }
        }
      );

      // 2️⃣ Atomically claim oldest queued job
      const job = await AnalysisJob.findOneAndUpdate(
        { status: "QUEUED" },
        {
          $set: {
            status: "PROCESSING",
            processingStartedAt: new Date()
          }
        },
        {
          sort: { createdAt: 1 },
          returnDocument: "after"
        }
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

    // 3️⃣ Aggregate safely (idempotent)
    const signalResults = await SignalResult.find({
      jobId: job._id,
      status: "COMPLETED"
    });

    const aggregation = aggregateSignals(signalResults);

    await AggregatedResult.findOneAndUpdate(
      { jobId: job._id },
      {
        jobId: job._id,
        overallRiskBand: aggregation.overallRiskBand,
        overallScore: aggregation.overallScore,
        groupScores: aggregation.groupScores,
        conflicts: aggregation.conflicts,
        notes: aggregation.notes
      },
      { upsert: true }
    );

    // 4️⃣ Determine final job status
    const failedSignals = await SignalResult.countDocuments({
      jobId: job._id,
      status: "FAILED"
    });

    if (failedSignals > 0) {
      job.status = "PARTIAL";
    } else {
      job.status = "COMPLETED";
    }

    job.completedAt = new Date();
    await job.save();

    console.log(`✅ Job ${job._id} finished with status: ${job.status}`);

  } catch (error) {
    console.error(`❌ Job ${job._id} fatal error`, error);

    job.status = "FAILED";
    job.completedAt = new Date();
    await job.save();
  }
};
