import { api } from "@/services/api";
export const loginUser = async (values) => {
  const response = await api.post("/auth/login", values);
  return response.data;
};
export const forgotPassword = async (values) => {
  const response = await api.post("/auth/forgot-password", values);
  console.log("Response", response);
  return response.data;
};
export const resetPassword = async (email, otp, password) => {
  const response = await api.post("/auth/reset-password", { email, otp, password });
  return response.data;
};
export const resendOTP = async (email) => {
  await api.post("/auth/resend-otp", { email });
  return true;
};
export const changeEmail = async (email) => {
  const response = await api.put("/user/change-email", { email});
  return response.data;
};
export const verifyEmail = async (email, otp) => {
  const response = await api.put("/user/verify-email", { email, otp });
  const { accessToken } = response.data;
  localStorage.setItem(`accessToken`, accessToken);

  return response.data;
};
export const updatePassword = async (password, newPassword) => {
  const response = await api.put("/user/change-password", { password, newPassword});
  return response.data;
};