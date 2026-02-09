import { useEffect, useState } from "react";
import { getOwnBooks } from "../../api/books";

export default function MyLibraryBooks(status) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchOwnBooks = async () => {
            try {
                const data = await getOwnBooks(status);
                setBooks(data);
            } catch (error) {
                console.log(error);
            }
        };
    fetchOwnBooks();
    }, [status]);
    

    return (
    <section>
      <h1>My Library</h1>

      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>

    </section>
  );
}