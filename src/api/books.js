import { api } from "./api";

export const getRecommendedBooks = async (page, limit = 10) => {
  const response = await api.get("/books/recommend", {
    params: { page, limit },
  });

  return response.data;
};

export const addBookFromRecommend = async bookId => {
  const response = await api.post(`/books/add/${bookId}`);
  return response.data;
};
