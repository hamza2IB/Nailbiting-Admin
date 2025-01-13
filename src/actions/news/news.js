import { api } from "@/services/api";
export const getAllNews = async () => {
  const response = await api.get("/news/all");
  return response.data;
};
export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};
export const addNews = async (values) => {
  const response = await api.post("/news/add", { title : values.title, body : values.content });
  return response.data;
};
export const deleteNews = async (id) => {
  const response = await api.delete(`/news/delete/${id}`);
  
  return response.data;
};
export const updateNews = async (id,values) => {
  const response = await api.put(`/news/update/${id}`, { title : values.title, body : values.content });
  
  return response.data;
};