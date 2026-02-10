import { api } from "./api";

export const getRecommendedBooks = async (page, limit = 10, filters = {}) => {
  const response = await api.get("/books/recommend", {
    params: { page, limit, ...filters },
  });

  return response.data;
};

export const addBookFromRecommend = async bookId => {
  const response = await api.post(`/books/add/${bookId}`);
  return response.data;
};

export const getOwnBooks = async (status) => {
  const response = await api.get("/books/own", {
    params: { status },
  });
  
  return response.data;
};

export const deleteOwnBook = async bookId => {
  const response = await api.delete(`/books/remove/${bookId}`);

  return response.data;

};

export const addOwnBook = async ({ title, author, totalPages }) => {
  const response = await api.post(`/books/add`, { title, author, totalPages });
  return response.data;
}