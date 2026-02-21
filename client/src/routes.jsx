import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails"; 
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route  
            path="/create" 
            element={
                <ProtectedRoute>
                    <Create />
                </ProtectedRoute>
            } 
        />
        <Route path="/blogs/:id" element={<BlogDetails/>} />
      </Routes>
    </>
  );
}
export default AppRoutes;
