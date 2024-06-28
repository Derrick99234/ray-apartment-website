/* eslint-disable react/prop-types */
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function NavBar({ onClose }) {
  return (
    <nav className="bg-black/90 h-screen fixed w-full top-0 left-0 bottom-0 p-14">
      <h2 className="font-bold text-3xl mb-14 text-white">RAY APARTMENT</h2>
      <RiCloseLine
        className="absolute top-10 right-10 text-3xl font-bold cursor-pointer bg-white"
        onClick={onClose}
      />
      <ul className="flex flex-col gap-8">
        <li>
          <Link to="" className="underline text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact" className="underline text-white">
            Contact
          </Link>
        </li>
        <li>
          <Link className="underline text-white">Enlist your hotel</Link>
        </li>
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
      </ul>
    </nav>
  );
}

export default NavBar;
