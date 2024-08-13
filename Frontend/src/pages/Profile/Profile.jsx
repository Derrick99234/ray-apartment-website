import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

function Profile() {
  const { userInfo } = useContext(UserContext);
  return (
    <div className="p-10">
      <div className="flex justify-evenly gap-8">
        <div className="flex gap-5 items-center justify-center max-w-md shadow-md p-8 flex-wrap">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            className="rounded-full w-36 h-36"
            alt=""
          />
          <div className="">
            <h2 className="font-semibold text-2xl">{userInfo?.displayName}</h2>
            <p>
              @<span>{userInfo?.username}</span> - <span>{userInfo.email}</span>
            </p>
          </div>

          <Link className="ml-8 font-medium">Logout</Link>
        </div>
        <div className="max-w-4xl shadow-md">
          <h2>Recently viewed</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
