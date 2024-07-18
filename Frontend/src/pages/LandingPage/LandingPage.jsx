import { RiCloseLine } from "react-icons/ri";
import Header from "../../components/Header";
import { CiFilter } from "react-icons/ci";
import HotelPostCard from "../../components/HotelPostCard";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { RoomContext } from "../../context/roomContext";
// import { useUser } from "../../hooks/useUser";

function LandingPage() {
  const token = localStorage.getItem("token");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { room, setRoom } = useContext(RoomContext);
  useEffect(() => {
    const fetchUserDetail = async () => {
      const res = await fetch("http://localhost:2024/api/user/get", {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.error) {
        setUserInfo(data.user);
        console.log(data.user);
      }
    };

    fetchUserDetail();
  }, [token, setUserInfo]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await fetch("http://localhost:2024/api/room/get-all-rooms");
        const data = await res.json();

        const { room, error } = data;
        if (!error) {
          setRoom(room);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllRooms();
  }, [setRoom]);

  console.log(room);

  return (
    <>
      <Header user={userInfo} />
      <main className="p-16 pt-20 bg-gray-50">
        <div className="flex justify-between items-center ">
          <div className="flex justify-between items-center gap-3">
            <span className="flex justify-between items-center px-2 gap-2 py-1 rounded-md border text-sm">
              royal <RiCloseLine />
            </span>
          </div>
          <div className="border py-[2px] px-5 rounded-lg flex items-center gap-2">
            Filter <CiFilter />
          </div>
        </div>
        <p className="font-bold text-2xl mt-8">Result: 207 hotels found</p>
        <div className="grid grid-cols-3 gap-5 mt-10 w-4/5 mx-auto">
          {room &&
            room.length > 0 &&
            room.map((rm, index) => (
              <HotelPostCard
                key={index}
                id={rm._id}
                img={rm.roomPictures[0]}
                // img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
                roomAvailable={rm.numberOfRoom}
                // person={rm.numberOfGuest}
                hotelType={rm.roomName}
                // price={rm.roomPricePerNight}
                location={rm.location}
              />
            ))}
        </div>
      </main>
    </>
  );
}

export default LandingPage;
