import api from "./axios";

export const getHistory = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/history?page=${page}&limit=${limit}`
  );
  return response.data;
};
