import { AnalysisJob } from "../models/AnalysisJob.js";
import { generateTextHash } from "../utils/hash.utils.js";
import { normalizeText } from "../utils/text.utils.js";

export const createAnalysisJob = async (req, res, next) => {
  try {
    const { inputType, content } = req.body;

    if (!inputType || !content) {
      return res.status(400).json({
        error: {
          code: "INVALID_INPUT",
          message: "inputType and content are required"
        }
      });
    }

    if (!["text", "url"].includes(inputType)) {
      return res.status(400).json({
        error: {
          code: "INVALID_INPUT",
          message: "inputType must be 'text' or 'url'"
        }
      });
    }

    if (content.length < 20) {
      return res.status(400).json({
        error: {
          code: "CONTENT_TOO_SHORT",
          message: "Content must be at least 20 characters"
        }
      });
    }

    // For MVP: treat URL same as text
    const { normalizedText, meta } = normalizeText(content);

    const normalizedTextHash = generateTextHash(normalizedText);

    const job = await AnalysisJob.create({
      userId: req.user.userId,
      inputType,
      originalInput: content,
      normalizedTextHash,
      status: "QUEUED",
      signalVersion: "v1",
      meta
    });

    res.status(202).json({
      jobId: job._id,
      status: job.status,
      message: "Analysis job created"
    });
  } catch (error) {
    next(error);
  }
};
