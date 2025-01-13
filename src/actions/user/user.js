import { api } from "@/services/api";
export const getAllUsers = async (page) => {
  const response = await api.get(`/user/all?page=${page}`);
  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/user/delete/${id}`);
  return response.data;
};
export const getUserById = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data.data;
};
export const searchUsers = async (search, page) => {
  const response = await api.get(`/user/search?q=${search}&page=${page}`);
  return response?.data?.data;
};
