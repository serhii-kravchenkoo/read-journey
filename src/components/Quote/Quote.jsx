import styles from './Quote.module.css';

export default function Quote() {
  return (
    <section className={styles.quote}>
      <img className={styles.quoteImg} src="/src/img/📚.png" alt="book" />
      <p className={styles.quoteText}>
        "Books are <span className={styles.quoteSpan}>windows</span> to the
        world, and reading is a journey into the unknown."
      </p>
    </section>
  );
}
