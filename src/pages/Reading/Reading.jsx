import { useParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import { useState, useEffect, useCallback } from 'react';
import MyBook from '../../components/MyBook/MyBook';
import { getBookById } from '../../api/books';
import AddReading from '../../components/AddReading/AddReading';
import Details from '../../components/Details/Details';
import ReadingProgress from '../../components/ReadingProgress.jsx/ReadingProgress';
import FinishModal from '../../components/FinishModal/FinishModal';
import styles from './Reading.module.css';

export default function Reading() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const fetchBook = useCallback(async () => {
    try {
      const data = await getBookById(id);
      setBook(data);
      if (data.status === 'done') {
        setShowFinishModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return (
    <section className={styles.section}>
      <Dashboard>
        <AddReading
          bookId={id}
          isReading={isReading}
          setIsReading={setIsReading}
          refreshBook={fetchBook}
        />
        {book?.progress && book.progress.length > 0 ? (
          <Details book={book} refreshBook={fetchBook} />
        ) : (
          <ReadingProgress />
        )}
      </Dashboard>
      <MyBook book={book} loading={loading} />
      {showFinishModal && (
        <FinishModal onClose={() => setShowFinishModal(false)} />
      )}
    </section>
  );
}
