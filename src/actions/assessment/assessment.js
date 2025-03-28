import { api } from "@/services/api";
export const getMonthlyAssessments = async (userId, month, year) => {
  const response = await api.get(`/self-assessment/user/${userId}/monthly?month=${month}&year=${year}`);
  return {
    data: response.data.data,
    monthlyPoints: response.data.monthlyPoints
  };
};