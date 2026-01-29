import RecommendedBookCard from "../RecommendedBookCard/RecommendedBookCard";
import { useState, useEffect } from "react";




const mockBooks = [
  {
    _id: 1,
    title: "It doesn't hurt",
    author: "Mark Twain",
    image: "https://res.cloudinary.com/drfvfno3o/image/upload/v1699726543/books/1.webp",
  },
  {
    _id: 2,
    title: "The Orphanage",
    author: "Serhii Zhadan",
    image: "https://res.cloudinary.com/drfvfno3o/image/upload/v1699726598/books/2.png",
  },
];



export default function RecommendedBooks() {
  // const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);

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
  console.log("Запит на сервер для сторінки:", page);
}, [page]);


  return (
    <section>
      <h1>Recommended</h1>
      <button onClick={handlePrev} disabled={page === 1}>
        ← Prev
      </button>

      <button onClick={handleNext} disabled={page === totalPages}>
        Next →
      </button>
      <ul>
        {mockBooks.map(book => (
          <RecommendedBookCard key={book._id} book={book} />
        ))}
      </ul>
    </section>
  );
}