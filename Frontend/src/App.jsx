import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LandingPage from "./pages/LandingPage/LandingPage";
import UploadCompany from "./pages/Upload/UploadCompany";
import Dashboard from "./pages/Dashboard/Dashboard";
import UploadRooms from "./pages/Upload/UploadRooms";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import CompanyProfile from "./pages/companyProfile/CompanyProfile";
import Logout from "./components/Logout";
import ManageRooms from "./pages/ManageRooms/ManageRooms";
import Profile from "./pages/Profile/Profile";
import ForgottenPassword from "./pages/ForgottenPassword/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage_rooms" element={<ManageRooms />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/company_profile" element={<CompanyProfile />} />
        <Route path="/upload/v2/:id" element={<UploadCompany />} />
        <Route path="/create-room" element={<UploadRooms />} />
        <Route path="/forgotten-password" element={<ForgottenPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/room-detail/hotel/:hotelType/:roomId"
          element={<RoomDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
