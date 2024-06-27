import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className="flex justify-between px-3 py-2 fixed backdrop-blur-sm">
      <RiMenu2Fill />
      <h1>RAY APARTMENT</h1>
      <FiSearch />
    </header>
  );
}

export default Header;
