import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../api/auth';
import styles from './UserBar.module.css';

export default function UserBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (e) {
        console.log('User fetch error', e);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className={styles.userBar}>
      <div className={styles.userAvatar}>{user.name?.[0]?.toUpperCase()}</div>

      <span className={styles.userName}>{user.name}</span>
    </div>
  );
}
