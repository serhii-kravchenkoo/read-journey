import { signoutUser } from "../../api/auth";
import { NavLink, useNavigate } from "react-router-dom";
import UserBar from "../UserBar/UserBar";
import { useState } from "react";
import { toast } from "react-toastify";

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
    }
  };

  return (
    <header>
      <div className="logo-container">
        <svg className="logo-icon" width="42" height="17">
          <use href="/sprite.svg#logo" />
        </svg>
        <span className="logo-text">
          read journey
        </span>
      </div>
      <button
        className="burger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav>
        <NavLink to="/recommended" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? "active" : ""}>My library</NavLink>
      </nav>
      <UserBar/>
      <button onClick={handleLogout}>Log out</button>


      {menuOpen && ( <MobileMenu handleLogout={handleLogout}/>)}
    </header>
  );
};

export default Header;