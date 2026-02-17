import { AnalysisJob } from "../models/AnalysisJob.js";
import { AggregatedResult } from "../models/AggregatedResult.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Total jobs
    const totalAnalyses = await AnalysisJob.countDocuments({ userId });

    // Join AggregatedResults with user jobs
    const userJobs = await AnalysisJob.find({ userId }).select("_id");

    const jobIds = userJobs.map(job => job._id);

    // Risk band counts
    const riskCounts = await AggregatedResult.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      {
        $group: {
          _id: "$overallRiskBand",
          count: { $sum: 1 }
        }
      }
    ]);

    let highRiskCount = 0;
    let mediumRiskCount = 0;
    let lowRiskCount = 0;

    riskCounts.forEach(r => {
      if (r._id === "HIGH") highRiskCount = r.count;
      if (r._id === "MEDIUM") mediumRiskCount = r.count;
      if (r._id === "LOW") lowRiskCount = r.count;
    });

    // Average risk score
    const avgScoreResult = await AggregatedResult.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: "$overallScore" }
        }
      }
    ]);

    const avgRiskScore =
      avgScoreResult.length > 0
        ? Number(avgScoreResult[0].avgScore.toFixed(2))
        : 0;

    // Latest job
    const lastJob = await AnalysisJob.findOne({ userId })
      .sort({ createdAt: -1 });

    res.json({
      totalAnalyses,
      highRiskCount,
      mediumRiskCount,
      lowRiskCount,
      avgRiskScore,
      lastJobStatus: lastJob?.status || null,
      lastJobCreatedAt: lastJob?.createdAt || null
    });

  } catch (error) {
    next(error);
  }
};
