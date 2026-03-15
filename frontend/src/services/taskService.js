import axios from "../api/axios";

export const getTasks = (params) => {
  return axios.get("/tasks", { params });
};

export const createTask = (data) => {
  return axios.post("/tasks", data);
};

export const updateTask = (id, data) => {
  return axios.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return axios.delete(`/tasks/${id}`);
};