import { api } from "./api";

export const getRecommendedBooks = async (page, limit = 10, filters = {}) => {
  const response = await api.get("/books/recommend", {params: { page, limit, ...filters },});
  return response.data;
};

export const addBookFromRecommend = async bookId => {
  const response = await api.post(`/books/add/${bookId}`);
  return response.data;
};

export const getOwnBooks = async (status) => {
  const response = await api.get("/books/own", {params: { status },});
  return response.data;
};

export const deleteOwnBook = async bookId => {
  const response = await api.delete(`/books/remove/${bookId}`);
  return response.data;
};

export const addOwnBook = async ({ title, author, totalPages }) => {
  const response = await api.post(`/books/add`, { title, author, totalPages });
  return response.data;
};

export const startReading = async ({bookId, page}) => {
  const response = await api.post("/books/reading/start", {bookId, page});
  return response.data;
};

export const finishReading = async ({bookId, page}) => {
  const response = await api.post("/books/reading/finish", {bookId, page});
  return response.data;
};

export const deleteReading = async (bookId, readingId) => {
  const response = await api.delete("/books/reading", {params: { bookId, readingId },});
  return response.data;
};

export const getBookById = async (bookId) => {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
};