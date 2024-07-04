import {
  RiCreativeCommonsNdLine,
  RiHome4Line,
  RiUser2Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="w-2/12 bg-gray-900 text-white h-screen py-6">
      <h2 className="text-xl font-bold ml-3">RAY APARTMENT</h2>
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
    </aside>
  );
}

export default SideBar;
