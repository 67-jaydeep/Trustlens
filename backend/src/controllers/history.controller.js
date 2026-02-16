import { AnalysisJob } from "../models/AnalysisJob.js";
import { AggregatedResult } from "../models/AggregatedResult.js";

export const getUserHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const skip = (page - 1) * limit;

    const jobs = await AnalysisJob.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const jobIds = jobs.map((job) => job._id);

    const aggregations = await AggregatedResult.find({
      jobId: { $in: jobIds }
    });

    const aggregationMap = {};
    aggregations.forEach((agg) => {
      aggregationMap[agg.jobId.toString()] = agg;
    });

    const results = jobs.map((job) => ({
      id: job._id,
      status: job.status,
      inputType: job.inputType,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      meta: job.meta,
      aggregation: aggregationMap[job._id.toString()] || null
    }));

    const total = await AnalysisJob.countDocuments({ userId });

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      results
    });

  } catch (error) {
    next(error);
  }
};
