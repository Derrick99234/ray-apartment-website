import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LandingPage from "./pages/LandingPage/LandingPage";
import UploadProperty from "./UploadProperty";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload/v2/:id" element={<UploadProperty />} />
      </Routes>
    </>
  );
}

export default App;
