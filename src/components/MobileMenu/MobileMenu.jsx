import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";

const MobileMenu = ({ isOpen, toggleMenu, handleLogOut }) => {
  return (
    <div
      className={`${css.overlay} ${isOpen ? css.open : ""}`}
      onClick={toggleMenu} // закриваємо меню при кліку на overlay
    >
      <div
        className={`${css.mobileMenuPanel} ${isOpen ? css.openPanel : ""}`}
        onClick={(e) => e.stopPropagation()} // запобігаємо закриттю при кліку всередині
      >
        {/* Кнопка закриття */}
        <button className={css.closeBtn} onClick={toggleMenu}>X
          {/* <svg className={css.closeIcon} width="14" height="14">
          <use href="/sprite.svg#icon-close-menu" />
        </svg> */}
        </button>

        {/* Навігація */}
        <nav className={css.nav}>
        <NavLink to="/recommended" className={({ isActive }) => isActive ? css.active : ""} onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? css.active : ""} onClick={toggleMenu}>My library</NavLink>
      </nav>

        {/* Кнопка виходу */}
        <button className={css.logoutBtn} onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );
};

export default MobileMenu;