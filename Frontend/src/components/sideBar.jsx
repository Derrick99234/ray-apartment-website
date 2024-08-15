import { HiOutlineLogout } from "react-icons/hi";
import { GrUserManager } from "react-icons/gr";
import {
  RiCreativeCommonsNdLine,
  RiHome4Line,
  RiUser2Line,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { CompanyContext } from "../context/companyContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { RiMenu2Line } from "react-icons/ri";

function SideBar() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  const { setCompany, company } = useContext(CompanyContext);

  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !userInfo.email) {
          return navigate("/login");
        }
        const response = await fetch(
          `https://ray-apartment-website.onrender.com/api/company/get-company-data/${userInfo.email}`,
          {
            headers: {
              "content-Type": "'application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!data.error) {
          setCompany(data.company);
        }
      } catch (error) {
        console.log("error while trying to get company data", error);
        return navigate("/login");
      }
    };

    getCompanyDetails();
  }, [navigate, setCompany, userInfo]);

  const [isOpen, setIsOpen] = useState(false);

  if (!company) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`w-2/12 max-[1024px]:w-20 bg-gray-900 text-white fixed top-0 bottom-0 left-0 h-screen py-6 flex justify-between flex-col ${
        isOpen ? "max-[1024px]:w-[200px] z-[100]" : ""
      } transition-all duration-300 ease-in-out`}
    >
      <div className="">
        <RiMenu2Line
          className="text-white text-2xl hidden max-[1024px]:block ml-4 cursor-pointer"
          onClick={toggleSidebar}
        />
        <div
          className={`${
            isOpen ? "max-[1024px]:block" : "max-[1024px]:hidden"
          } `}
        >
          <h2 className="text-2xl font-bold ml-3">RAY APARTMENT</h2>
          <h3 className="ml-3 text-[.9rem]">
            {company && company.companyName}
          </h3>
          <nav>
            <ul className="flex my-8 flex-col gap-3">
              <Link to={"/dashboard"}>
                <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                  <RiHome4Line /> Home
                </li>
              </Link>
              <Link to={"/create-room"}>
                <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                  <RiCreativeCommonsNdLine /> Create
                </li>
              </Link>
              <Link to={"/manage_rooms"}>
                <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                  <GrUserManager /> Manage Rooms
                </li>
              </Link>
              <Link to={"/company_profile"}>
                <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
                  <RiUser2Line /> Profile
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold cursor-pointer max-[1024px]:hidden"
        onClick={() => navigate("/logout")}
      >
        <HiOutlineLogout /> <span>Logout</span>
      </div>
    </aside>
  );
}

export default SideBar;
