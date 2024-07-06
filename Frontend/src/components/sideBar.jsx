import { HiOutlineLogout } from "react-icons/hi";
import {
  RiCreativeCommonsNdLine,
  RiHome4Line,
  RiUser2Line,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { CompanyContext } from "../context/companyContext";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

function SideBar() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  const { setCompany, company } = useContext(CompanyContext);

  useEffect(() => {
    const getComapanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !userInfo.email) {
          return navigate("/login");
        }
        const response = await fetch(
          `http://localhost:2024/api/company/get-company-data/${userInfo.email}`,
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

    getComapanyDetails();
  }, [navigate, setCompany, userInfo]);

  return (
    <aside className="w-2/12 bg-gray-900 text-white fixed top-0 bottom-0 left-0 h-screen py-6 flex justify-between flex-col">
      <div>
        <h2 className="text-2xl font-bold ml-3">RAY APARTMENT</h2>
        <h3 className="ml-3 text-[.9rem]">{company && company.companyName}</h3>
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
            <li className="py-2 w-full flex items-center gap-2 px-5 hover:bg-gray-500 hover:border-l-4 hover:border-white font-semibold">
              <RiUser2Line /> Profile
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
