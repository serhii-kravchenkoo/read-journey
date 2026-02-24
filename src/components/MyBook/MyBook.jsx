import Loader from '../Loader/Loader';
import styles from './MyBook.module.css';

export default function MyBook({ book, loading }) {
  if (loading) return <Loader />;
  if (!book) return null;

  return (
    <div className={styles.myBook}>
      <h2 className={styles.title}>My reading</h2>
      <div className={styles.card}>
        <img className={styles.img} src={book.imageUrl} alt={book.title} />
        <h3 className={styles.titleBook}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
      </div>
      <div>
        <svg className={styles.svg} height="40" width="40">
          <use href="/icons.svg#icon-read-off"></use>
        </svg>
      </div>
    </div>
  );
}
