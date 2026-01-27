import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { getCurrentUser } from "./api/auth";


function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log("User is logged in:", user);
      } catch (error) {
        localStorage.removeItem("token");
        console.log("Token invalid, removed", error);
      }
    };

    checkUser();
  }, []);

  return <AppRoutes />;
}

export default App;