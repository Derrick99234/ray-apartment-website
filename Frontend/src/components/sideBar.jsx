import { HiOutlineLogout } from "react-icons/hi";
import {
  RiCreativeCommonsNdLine,
  RiHome4Line,
  RiUser2Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { CompanyContext } from "../context/companyContext";
import { useContext } from "react";

function SideBar() {
  const { company } = useContext(CompanyContext);
  return (
    <aside className="w-2/12 bg-gray-900 text-white fixed top-0 bottom-0 left-0 h-screen py-6 flex justify-between flex-col">
      <div>
        <h2 className="text-2xl font-bold ml-3">RAY APARTMENT</h2>
        <h3 className="ml-3 text-[.9rem]">{company && company.companyName}</h3>
        <nav>
          <ul className="flex my-8 flex-col gap-3">
            <Link to={"/dashboard"}>
              <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                <RiHome4Line /> <Link>Home</Link>
              </li>
            </Link>
            <Link to={"/create-room"}>
              <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                <RiCreativeCommonsNdLine /> <Link>Create</Link>
              </li>
            </Link>
            <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
              <RiUser2Line /> <Link>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold cursor-pointer">
        <HiOutlineLogout /> <span>Logout</span>
      </div>
    </aside>
  );
}

export default SideBar;
