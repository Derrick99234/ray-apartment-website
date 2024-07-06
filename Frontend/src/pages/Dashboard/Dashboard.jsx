import { HiPlus } from "react-icons/hi";
import SideBar from "../../components/sideBar";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../components/DashHeader";

function Dashboard() {
  const navigate = useNavigate();

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
