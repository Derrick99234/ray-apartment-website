import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LandingPage from "./pages/LandingPage/LandingPage";
import UploadCompany from "./pages/Upload/UploadCompany";
import Dashboard from "./pages/Dashboard/Dashboard";
import UploadRooms from "./pages/Upload/UploadRooms";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload/v2/:id" element={<UploadCompany />} />
        <Route path="/create-room" element={<UploadRooms />} />
      </Routes>
    </>
  );
}

export default App;
