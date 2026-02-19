import styles from './Quote.module.css';

export default function Quote() {
  return (
    <blockquote className={styles.quote}>
      <p>
        "Books are windows to the world, and reading is a journey into the
        unknown."
      </p>
    </blockquote>
  );
}
