import { AnalysisJob } from "../models/AnalysisJob.js";
import { SignalResult } from "../models/SignalResult.js";
import { AggregatedResult } from "../models/AggregatedResult.js";

const POLL_INTERVAL_MS = 5000; // every 5 seconds

export const startJobWorker = () => {
  console.log("🛠 Job worker started");

  setInterval(async () => {
    try {
      const job = await AnalysisJob.findOneAndUpdate(
        { status: "QUEUED" },
        { status: "PROCESSING" },
        { new: true }
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
    const signals = [
      "emotion_density",
      "sensational_headline",
      "claim_source_ratio",
      "readability_persuasion",
      "content_originality",
      "ai_likeness_risk",
      "structural_transparency"
    ];

    for (const signalId of signals) {
      try {
        await SignalResult.create({
          jobId: job._id,
          signalId,
          signalVersion: job.signalVersion,
          status: "COMPLETED",
          value: Math.random(), // placeholder logic
          confidence: "MEDIUM",
          explanation: "Stub signal execution result.",
          limitations: "This is placeholder logic.",
          executionTimeMs: 10
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

    await AggregatedResult.create({
      jobId: job._id,
      overallRiskBand: "MEDIUM",
      overallScore: 0.5,
      groupScores: {
        framing: 0.5,
        evidence: 0.5,
        production: 0.5,
        persuasion: 0.5
      },
      conflicts: [],
      notes: []
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

