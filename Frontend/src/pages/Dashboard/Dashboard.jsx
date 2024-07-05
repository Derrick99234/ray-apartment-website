import { HiPlus } from "react-icons/hi";
import SideBar from "../../components/sideBar";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { CompanyContext } from "../../context/companyContext";

function Dashboard() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  const { setCompany } = useContext(CompanyContext);

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
      }
    };

    getComapanyDetails();
  }, [navigate, setCompany, userInfo]);

  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="p-10 mx-auto">
          <DashHeader />
          <div
            className="border-2 border-gray-900 bg-gray-50 rounded-lg w-80 h-52 flex flex-col gap-2 justify-center items-center cursor-pointer"
            onClick={() => navigate("/create-room")}
          >
            <HiPlus className="text-[4.5rem] rounded-md font-bold" />
            <span>create post of your property</span>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
