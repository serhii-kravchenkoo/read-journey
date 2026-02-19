import styles from './RecommendedBookCard.module.css';

export default function RecommendedBookCard({ book, onBookClick }) {
  return (
    <li className={styles.card}>
      <img
        className={styles.image}
        src={book.imageUrl}
        alt={book.title}
        width="137"
        onClick={() => onBookClick(book)}
      />
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
    </li>
  );
}
