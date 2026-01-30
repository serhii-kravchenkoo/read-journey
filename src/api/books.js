import { api } from "./api";

export const getRecommendedBooks = async (page, limit = 10) => {
  const response = await api.get("/books/recommend", {
    params: { page, limit },
  });

  return response.data;
};
