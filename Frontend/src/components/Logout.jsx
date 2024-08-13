import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return <div className="text-center p-8">Logging out...</div>;
}

export default Logout;
