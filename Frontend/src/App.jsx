import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
