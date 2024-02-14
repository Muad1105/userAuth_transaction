import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/changePassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
