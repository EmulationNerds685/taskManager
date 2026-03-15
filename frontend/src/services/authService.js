import axios from "../api/axios";

export const registerUser = (data) => {
  return axios.post("/auth/register", data);
};

export const loginUser = (data) => {
  return axios.post("/auth/login", data);
};

export const logoutUser = () => {
  return axios.post("/auth/logout");
};