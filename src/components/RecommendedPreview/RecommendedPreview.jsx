import { useEffect, useState } from "react";
import { getRecommendedBooks } from "../../api/books";
import { Link } from "react-router-dom";
import css from "./RecommendedPreview.module.css";

export default function RecommendedPreview() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
          const data = await getRecommendedBooks();
          
        setBooks(data.results.slice(0, 3));

      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className={css.container}>

      <h2>Recommended books</h2>

      <div className={css.list}>
        {books.map(book => (
          <div key={book._id} className={css.card}>
            <img src={book.imageUrl} alt={book.title} />
            <p>{book.title}</p>
            <span>{book.author}</span>
          </div>
        ))}
      </div>

      <div className={css.footer}>
        <Link to="/recommended">Home</Link>

        <Link to="/recommended">→</Link>
      </div>

    </div>
  );
}