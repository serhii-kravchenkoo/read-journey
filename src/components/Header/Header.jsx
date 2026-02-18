import { signoutUser } from '../../api/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import UserBar from '../UserBar/UserBar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signoutUser();
    } catch (error) {
      toast.error(error, 'Logout failed. Please try again.');
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
      setMenuOpen(false);
    }
  };
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <svg className={styles.logoIcon} width="42" height="17">
          <use href="/icons.svg#icon-logo"></use>
        </svg>
        <span className={styles.logoSpan}>READ JOURNEY</span>
      </div>

      <nav className={styles.mainNav}>
        <NavLink
          to="/recommended"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          My library
        </NavLink>
      </nav>

      <div className={styles.userBarLogoutWrapper}>
        <div className={styles.userBarBurgerWrapper}>
          <UserBar />
          <button className={styles.burger} onClick={toggleMenu}>
            <svg className={styles.burgerIcon} width="28" height="28">
              <use href="/icons.svg#icon-burger-menu"></use>
            </svg>
          </button>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </div>
      <MobileMenu
        isOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleLogOut={handleLogout}
      />
    </header>
  );
};

export default Header;
