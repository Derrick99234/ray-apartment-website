import { useContext, useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import { FiEdit2 } from "react-icons/fi";
import { CompanyContext } from "../../context/companyContext";
import ManageRoomPopUp from "../../components/ManageRoomsPopUp/ManageRoomPopUp";

function ManageRooms() {
  const token = localStorage.getItem("token");
  const [rooms, setRooms] = useState([]);
  const { company } = useContext(CompanyContext);
  const [manageRoomPopUp, setManageRoomPopUp] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const closePopUp = () => {
    setManageRoomPopUp(false);
  };
  useEffect(() => {
    const fetchCompanyRooms = async () => {
      try {
        const res = await fetch(
          `https://ray-apartment-website.onrender.com/api/room/get_company_rooms/${company._id}`,
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setRooms(data.rooms);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompanyRooms();
  }, [token, company]);

  return (
    <>
      <SideBar />
      <main className="pl-[250px] p-5">
        <div className="flex justify-around flex-wrap">
          {/* <div className="relative w-[340px] bg-slate-50">
            <img
              src="https://preview.colorlib.com/theme/marian/assets/img/rooms/room4.jpg"
              alt=""
              className="h-[380px] w-full"
            />
            <div className="div p-4">
              <h2 className="my-3 text-gray-700 text-2xl font-semibold">
                Classic Double Bed
              </h2>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  90$ <sub>per night</sub>
                </span>
                <p className="text-gray-700">3rd March, 2024</p>
              </div>
            </div>
            <FiEdit2 className="absolute top-3 right-3 bg-white p-2 rounded-full text-3xl" />
          </div>
          <div className="relative w-[340px] bg-slate-50">
            <img
              src="https://preview.colorlib.com/theme/marian/assets/img/rooms/room5.jpg"
              alt=""
              className="h-[380px] w-full"
            />
            <div className="div p-4">
              <h2 className="my-3 text-gray-700 text-2xl font-semibold">
                Classic Double Bed
              </h2>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  90$ <sub>per night</sub>
                </span>
                <p className="text-gray-700">3rd March, 2024</p>
              </div>
            </div>
            <FiEdit2 className="absolute top-3 right-3 bg-white p-2 rounded-full text-3xl" />
          </div> */}
          {rooms &&
            rooms.map((room, index) => {
              return (
                <div className="relative w-[340px] bg-slate-50" key={index}>
                  <img
                    src={room.roomPictures[0]}
                    alt=""
                    className="h-[380px] w-full"
                  />
                  <div className="div p-4">
                    <h2 className="my-3 text-gray-700 text-2xl font-semibold">
                      {room.roomName}
                    </h2>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        N{room.roomPricePerNight} <sub>per night</sub>
                      </span>
                      <p className="text-gray-700">3rd March, 2024</p>
                    </div>
                  </div>
                  <FiEdit2
                    className="absolute top-3 right-3 bg-white p-2 rounded-full text-3xl cursor-pointer"
                    onClick={() => {
                      setSelectedRoom(room);
                      setManageRoomPopUp(true);
                    }}
                  />

                  {manageRoomPopUp && selectedRoom && (
                    <ManageRoomPopUp
                      closePopUp={closePopUp}
                      roomDetail={selectedRoom}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}

export default ManageRooms;
