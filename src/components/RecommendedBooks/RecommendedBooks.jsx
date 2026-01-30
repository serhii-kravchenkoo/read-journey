import { getRecommendedBooks } from "../../api/books";
import RecommendedBookCard from "../RecommendedBookCard/RecommendedBookCard";
import { useState, useEffect } from "react";

export default function RecommendedBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks(page, 10);

        setBooks(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log("Fetch recommended error", error);
    }
    }
    fetchBooks()
}, [page]);

  const handleBookClick = book => {
  setSelectedBook(book);
  setIsModalOpen(true);
  };


  return (
    <section>
      <h2>Recommended</h2>
      <button onClick={handlePrev} disabled={page === 1}>
        ← Prev
      </button>

      <button onClick={handleNext} disabled={page === totalPages}>
        Next →
      </button>
      <ul>
        {books.map(book => (
          <RecommendedBookCard key={book._id} book={book} onBookClick={handleBookClick}/>
        ))}
      </ul>
    </section>
  );
}