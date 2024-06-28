import { Link } from "react-router-dom";

function ProfilePopUp() {
  return (
    <div className="absolute text-base top-10 right-10 py-4 px-2 rounded-md shadow-lg flex flex-col w-52 bg-white">
      <Link className="hover:bg-slate-50 p-2" to="/login">
        login
      </Link>
      <Link className="hover:bg-slate-50 p-2" to="/register">
        Register
      </Link>
    </div>
  );
}

export default ProfilePopUp;
