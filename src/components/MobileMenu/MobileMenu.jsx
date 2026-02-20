import { NavLink } from 'react-router-dom';
import css from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, toggleMenu, handleLogOut }) => {
  return (
    <div
      className={`${css.overlay} ${isOpen ? css.open : ''}`}
      onClick={toggleMenu} // закриваємо меню при кліку на overlay
    >
      <div
        className={`${css.mobileMenuPanel} ${isOpen ? css.openPanel : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={toggleMenu}>
          <svg className={css.closeIcon} width="28" height="28">
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>

        <nav className={css.nav}>
          <NavLink
            to="/recommended"
            className={({ isActive }) => (isActive ? css.active : css.noActive)}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) => (isActive ? css.active : css.noActive)}
            onClick={toggleMenu}
          >
            My library
          </NavLink>
        </nav>

        <button className={css.logoutBtn} onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
