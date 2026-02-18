import styles from './Dashboard.module.css';

export default function Dashboard({ children }) {
  return <aside className={styles.dashboard}>{children}</aside>;
}
