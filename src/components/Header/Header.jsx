import { signoutUser } from "../../api/auth";
import { NavLink, useNavigate } from "react-router-dom";
import UserBar from "../UserBar/UserBar";
import { useState } from "react";
import { toast } from "react-toastify";
import MobileMenu from "../MobileMenu/MobileMenu";
import css from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signoutUser();
    } catch (error) {
      toast.error(error, "Logout failed. Please try again.");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
      setMenuOpen(false);
    }
  };
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={css.header}>
      <div className={css.logoContainer}>
        <svg className={css.logoIcon} width="42" height="17">
          <use href="/sprite.svg#logo" />
        </svg>
        <span className={css.logoText}>
          read journey
        </span>
      </div>

        <nav className={css.mainNav}>
        <NavLink to="/recommended" className={({ isActive }) => isActive ? css.active : ""}>Home</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? css.active : ""}>My library</NavLink>
      </nav>

      <UserBar/>
      <button
        className={css.burger}
       onClick={toggleMenu}>
        ☰
      </button>
      
      <button className={css.logout} onClick={handleLogout}>Log out</button>
      
      <MobileMenu
        isOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleLogOut={handleLogout}
      />
    </header>
  );
};

export default Header;