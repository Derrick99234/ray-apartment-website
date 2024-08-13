/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import EnlistHotelPopUp from "../pages/EnlistHotel/EnlistHotelPopUp";

function NavBar({ onClose, user }) {
  const [showEnlistHotelPopUp, setShowEnlistHotelPopUp] = useState(false);
  return (
    <>
      {showEnlistHotelPopUp ? (
        <EnlistHotelPopUp onClose={onClose} />
      ) : (
        <nav className="bg-black/90 h-screen fixed inset-0 p-14">
          <h2 className="font-bold text-3xl mb-14 text-white">ROYAL HOMES</h2>
          <RiCloseLine
            className=" text-3xl font-bold cursor-pointer bg-white rounded-full absolute top-4 right-5"
            onClick={onClose}
          />
          <ul className="flex flex-col gap-8">
            <li>
              <Link to="/" className="underline text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="underline text-white">
                Contact
              </Link>
            </li>
            <li>
              <p
                onClick={() => {
                  setShowEnlistHotelPopUp(true);
                }}
                className="underline text-white cursor-pointer"
              >
                Enlist your property
              </p>
            </li>
            {!user?.displayName && (
              <>
                <li>
                  <Link to="/login" className="underline text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="underline text-white">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}

export default NavBar;
