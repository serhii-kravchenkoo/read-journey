import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Recommended from "../pages/Recommended/Recommended";
import ProtectedRoute from "./ProtectedRoute";
import Library from "../pages/Library/Library";
import MainLayout from "../layouts/MainLayout";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/library" element={<Library />} />
        
      </Route>
    </Routes>
  );
}

export default AppRoutes;