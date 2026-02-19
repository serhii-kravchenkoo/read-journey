import { Link } from 'react-router-dom';
import styles from './Description.module.css';

export default function Description() {
  return (
    <div className={styles.description}>
      <h2 className={styles.title}>Start your workout</h2>

      <div className={styles.textWrapper}>
        <span className={styles.stepNumber}>1</span>
        <p className={styles.text}>
          Create a personal library:
          <span className={styles.highlight}>
            {'  '}
            add the books you intend to read to it.
          </span>
        </p>
      </div>

      <div className={styles.textWrapper}>
        <span className={styles.stepNumber}>2</span>
        <p className={styles.text}>
          Create your first workout:
          <span className={styles.highlight}>
            {' '}
            define a goal, choose a period, start training.
          </span>
        </p>
      </div>

      <div className={styles.linkWrapper}>
        <Link to="/library" className={styles.link}>
          My library
        </Link>

        <Link to="/library" className={styles.link}>
          <svg width="24" height="24">
            <use href="/public/icons.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
