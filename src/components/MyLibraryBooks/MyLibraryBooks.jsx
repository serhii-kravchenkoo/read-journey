import { useEffect, useState } from 'react';
import { deleteOwnBook, getOwnBooks } from '../../api/books';
import Loader from '../Loader/Loader';
import MyLibraryBookCard from '../MyLibraryBookCard/MyLibraryBookCard';
import ModalBook from '../ModalBook/ModalBook';
import css from './MyLibraryBooks.module.css';

export default function MyLibraryBooks({ refreshKey }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchOwnBooks = async () => {
      try {
        setLoading(true);

        const data = await getOwnBooks(status || undefined);
        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOwnBooks();
  }, [status, refreshKey]);

  const handleDelete = async id => {
    try {
      await deleteOwnBook(id);

      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = book => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <section className={css.library}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>My Library</h2>

        <select
          className={css.statusSelect}
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
          <option value="">All books</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className={css.empty}>
          <div className={css.emptyIcon}>
            <img
              className={css.emptyIconImage}
              height="50"
              width="50"
              src="/books.png"
              alt="Empty library icon"
            />
          </div>
          <p className={css.emptyText}>
            To start training, add{' '}
            <span className={css.highlight}>some of your books</span> or from
            the recommended ones
          </p>
        </div>
      ) : (
        <ul className={css.listLibrary}>
          {books.map(book => (
            <MyLibraryBookCard
              key={book._id}
              book={book}
              onDelete={handleDelete}
              onOpen={handleOpenModal}
            />
          ))}
        </ul>
      )}
      {selectedBook && (
        <ModalBook book={selectedBook} onClose={handleCloseModal} />
      )}
    </section>
  );
}
