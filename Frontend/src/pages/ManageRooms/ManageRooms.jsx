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
  const [showUpdateOptionFor, setShowUpdateOptionFor] = useState(null); // Track which room to show options for
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
      <main className="p-5 ml-[250px] max-[1024px]:ml-16">
        <div className="flex justify-around flex-wrap gap-4 max-[1340px]:flex-grow">
          {rooms &&
            rooms.map((room, index) => {
              return (
                <div
                  className="relative w-[340px] bg-slate-50 max-[1340px]:flex-grow"
                  key={index}
                >
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
                      setShowUpdateOptionFor(room._id); // Set the ID of the room to show options for
                    }}
                  />

                  {showUpdateOptionFor === room._id && selectedRoom &&  !manageRoomPopUp && (
                    <div className="bg-white shadow-md rounded-md absolute top-3 right-3 overflow-hidden">
                      <p className="py-2 px-8 bg-blue/80 text-white font-semibold cursor-pointer" onClick={() => setManageRoomPopUp(true)}>
                        edit
                      </p>
                      <p className="py-2 px-8 bg-red-500 text-white font-semibold cursor-pointer">
                        delete
                      </p>
                    </div>
                  )}

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
