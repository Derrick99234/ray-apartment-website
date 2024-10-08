/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

function ProfilePopUp({ user, profileRef }) {
  const navigate = useNavigate();
  return (
    <div
      ref={profileRef}
      className="absolute text-base top-10 right-10 py-3 px-2 rounded-md shadow-lg flex flex-col w-52 bg-white"
    >
      {user && user.displayName ? (
        <>
          <Link
            className="hover:bg-slate-50 p-2"
            to={`user/${user?.displayName}`}
          >
            Profile
          </Link>
          <Link
            className="hover:bg-slate-50 p-2 border-t"
            to="/logout"
            onClick={() => navigate("/logout")}
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link className="hover:bg-slate-50 p-2" to="/login">
            login
          </Link>
          <Link className="hover:bg-slate-50 p-2" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default ProfilePopUp;
