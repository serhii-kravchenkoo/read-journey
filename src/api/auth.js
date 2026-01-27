import { api } from "./api";

export const signupUser = async (userData) => {
  const response = await api.post("/users/signup", userData);
  return response.data;
};

export const signinUser = async (userData) => {
  const response = await api.post("/users/signin", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/current");
  return response.data;
};

export const signoutUser = async () => {
  const response = await api.post("/users/signout");
  return response.data;
};