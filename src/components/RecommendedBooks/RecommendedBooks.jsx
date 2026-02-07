import { getRecommendedBooks, getOwnBooks } from "../../api/books";
import BookModal from "../BookModal/BookModal";
import RecommendedBookCard from "../RecommendedBookCard/RecommendedBookCard";
import { useState, useEffect} from "react";

export default function RecommendedBooks({filters}) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [ownBooks, setOwnBooks] = useState([]);
  

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
  setPage(1);
}, [filters]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks(page, 10, filters);

        setBooks(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log("Fetch recommended error", error);
    }
    }
    fetchBooks()
}, [page, filters]);

  const handleBookClick = async book => {
    setSelectedBook(book);
    try {
      const data = await getOwnBooks();
      setOwnBooks(data);
    } catch (e) {
    console.log("Failed to refresh ownBooks", e);
    }
  };
  const closeModal = () => {
    setSelectedBook(null);
    };

  const isBookAlreadyAdded = book => {
  return ownBooks.some(
    own =>
      own.title === book.title && own.author === book.author
  );
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

      {selectedBook && (<BookModal book={selectedBook} onClose={closeModal} alreadyAdded={isBookAlreadyAdded(selectedBook)}/>)}
    </section>
  );
}