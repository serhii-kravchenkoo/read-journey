import { signoutUser } from "../../api/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signoutUser();
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
      <header>
          <nav>
            <NavLink to="/recommended">Home</NavLink>
            <NavLink to="/library">My library</NavLink>
          </nav>
          <button onClick={handleLogout}>Log out</button>
    </header>
  );
};

export default Header;