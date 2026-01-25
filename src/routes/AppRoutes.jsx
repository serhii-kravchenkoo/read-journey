import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Recommended from "../pages/Recommended/Recommended";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recommended" element={<Recommended />} />
    </Routes>
  );
}

export default AppRoutes;