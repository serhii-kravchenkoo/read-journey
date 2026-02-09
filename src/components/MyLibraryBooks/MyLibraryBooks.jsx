import { useEffect, useState } from "react";
import { deleteOwnBook, getOwnBooks } from "../../api/books";
import Loader from "../Loader/Loader";
import MyLibraryBookCard from "../MyLibraryBookCard/MyLibraryBookCard";
import ModalBook from "../ModalBook/ModalBook";

export default function MyLibraryBooks() {
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchOwnBooks = async () => {
          try {
            setLoading(true);

            const data = await getOwnBooks(status || undefined);
            setBooks(data);
          } catch (error) {
            console.log(error);
          }
          finally {
            setLoading(false);
          }
        };
    fetchOwnBooks();
    }, [status]);

  const handleDelete = async (id) => {
  try {
    await deleteOwnBook(id);

    setBooks(prev =>
      prev.filter(book => book._id !== id)
    );

  } catch (error) {
    console.log(error);
  }
  };
  
  const handleOpenModal = (book) => {
  setSelectedBook(book);
  };

  const handleCloseModal = () => {
  setSelectedBook(null);
};
    

    return (
    <section>
        <h1>My Library</h1>
        
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
          <option value="">All books</option>
        </select>

         {loading ? (<Loader />) : (
        <ul>
          {books.map(book => (<MyLibraryBookCard key={book._id} book={book} onDelete={handleDelete} onOpen={handleOpenModal}/>))}
        </ul> )};
        {selectedBook && (<ModalBook book={selectedBook} onClose={handleCloseModal}/>)}
      </section>
      
  );
}