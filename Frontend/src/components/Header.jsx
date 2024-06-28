import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import NavBar from "./NavBar";
import ProfilePopUp from "./ProfilePopUp";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const onClose = () => {
    setShowNav(false);
  };
  return (
    <header className="flex justify-between px-5 py-3 fixed bg-black/90 backdrop-blur-sm w-full text-2xl">
      <RiMenu2Fill
        className="cursor-pointer text-white"
        onClick={() => setShowNav(true)}
      />
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-[400px] py-2 outline-none text-white  px-5 bg-transparent border rounded-2xl text-base"
        />
        <FiSearch className="cursor-pointer absolute top-2 right-3 text-white" />
      </div>
      <div className="relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setShowProfile(true)}
        />
        {showProfile && <ProfilePopUp />}
      </div>
      {showNav && <NavBar onClose={onClose} />}
    </header>
  );
}

export default Header;
