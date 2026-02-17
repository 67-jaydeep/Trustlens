import api from "./axios";

export const createAnalysis = async (data) => {
  const response = await api.post("/analysis/analyze", data);
  return response.data;
};

export const getAnalysisReport = async (jobId) => {
  const response = await api.get(`/report/${jobId}`);
  return response.data;
};
