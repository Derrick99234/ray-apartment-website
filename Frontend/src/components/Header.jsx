/* eslint-disable react/prop-types */
import { RiMenu2Fill } from "react-icons/ri";
// import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import ProfilePopUp from "./ProfilePopUp";

function Header({ user }) {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null); // Reference for the profile pop-up

  const onClose = () => {
    setShowNav(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="flex justify-between px-5 py-3 fixed bg-black/90 backdrop-blur-sm w-full text-2xl z-50">
      <div className="flex gap-3 items-center text-white">
        <RiMenu2Fill
          className="cursor-pointer"
          onClick={() => setShowNav(true)}
        />
        <h2 className="font-bold text-xl">RAY APARTMENT</h2>
      </div>
      {/* <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-[400px] py-2 outline-none text-white  px-5 bg-transparent border rounded-2xl text-base"
        />
        <FiSearch className="cursor-pointer absolute top-2 right-3 text-white" />
      </div> */}
      <div className="relative flex items-center gap-2">
        <p className="text-white text-xl">
          {user && user.displayName ? user.displayName : "Anonymous"}
        </p>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setShowProfile(true)}
        />
        {showProfile && <ProfilePopUp user={user} profileRef={profileRef} />}
      </div>
      {showNav && <NavBar onClose={onClose} user={user} />}
    </header>
  );
}

export default Header;
