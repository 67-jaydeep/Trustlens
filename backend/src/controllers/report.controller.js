import { AnalysisJob } from "../models/AnalysisJob.js";
import { SignalResult } from "../models/SignalResult.js";
import { AggregatedResult } from "../models/AggregatedResult.js";

export const getAnalysisReport = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await AnalysisJob.findById(jobId);

    if (!job) {
      return res.status(404).json({
        error: {
          code: "JOB_NOT_FOUND",
          message: "Analysis job not found"
        }
      });
    }

    // Ensure user owns this job
    if (job.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have access to this job"
        }
      });
    }

    const signals = await SignalResult.find({ jobId });
    const aggregation = await AggregatedResult.findOne({ jobId });

    res.json({
      job: {
        id: job._id,
        status: job.status,
        inputType: job.inputType,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
        meta: job.meta
      },
      aggregation: aggregation || null,
      signals
    });

  } catch (error) {
    next(error);
  }
};
