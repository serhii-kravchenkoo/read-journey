import styles from './MyLibraryBookCard.module.css';

export default function MyLibraryBookCard({ book, onDelete, onOpen }) {
  return (
    <li className={styles.card}>
      <img
        className={styles.img}
        src={book.imageUrl}
        alt={book.title}
        onClick={() => onOpen(book)}
      />

      <p className={styles.title}>{book.title?.trim().split(/\s+/)[0]}</p>
      <p className={styles.author}>{book.author}</p>

      <button
        className={styles.btn}
        onClick={e => {
          e.stopPropagation();
          onDelete(book._id);
        }}
      >
        <svg height="14" width="14" className={styles.svg}>
          <use href="/icons.svg#icon-trash"></use>
        </svg>
      </button>
    </li>
  );
}
