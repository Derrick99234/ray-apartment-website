import { RiCloseLine } from "react-icons/ri";
import Header from "../../components/Header";
import { CiFilter } from "react-icons/ci";
import HotelPostCard from "../../components/HotelPostCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import rroom2 from "../../assets/rroom2.jpg";
import logo2 from "../../assets/color_horizontal.png";
import { RoomContext } from "../../context/roomContext";
import Toast from "../../components/ToastMessage/Toast";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineMailLock } from "react-icons/md";
import Footer from "../../components/Footer";

function LandingPage() {
  const token = localStorage.getItem("token");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { room, setRoom } = useContext(RoomContext);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      const res = await fetch("https://ray-apartment-website.onrender.com/api/user/get", {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.error) {
        setShowToastMsg({
          isShown: true,
          type: "error",
          message: data.message,
        });
        return navigate("/login");
      }

      if (!data.error) {
        setUserInfo(data.user);
        console.log(data.user);
      }
    };

    fetchUserDetail();
  }, [token, setUserInfo, navigate]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await fetch("https://ray-apartment-website.onrender.com/api/room/get-all-rooms");
        const data = await res.json();

        const { room, error, message } = data;
        if (data.error) {
          setShowToastMsg({
            isShown: true,
            type: "error",
            message: data.message,
          });
        }
        if (!error) {
          setShowToastMsg({
            isShown: true,
            type: "success",
            message: message,
          });
          setRoom(room);
        }
      } catch (error) {
        console.log(error);
        setShowToastMsg({
          isShown: true,
          type: "error",
          message: error.message,
        });
      }
    };

    fetchAllRooms();
  }, [setRoom]);

  console.log(room);

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://ray-apartment-website.onrender.com/api/room/search?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Ensure the result is an array
      const roomsArray = Array.isArray(result) ? result : Object.values(result);
      setRoom(roomsArray);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setRoom([]); // Optional: clear the previous results on error
    }
  };
  return (
    <>
      <Header user={userInfo} />
      <main className="p-10 max-[758px]:p-16 max-[430px]:pt-16 bg-gray-50 max-[430px]:p-4">
        <div
          style={{
            background: `url(${rroom2}) no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="hero h-[60vh] max-[1024px]:h-[50vh] relative z-10"
        >
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center">
            <img
              src={logo2}
              alt=""
              className="w-96 mx-auto mt-10 max-[430px]:w-80"
            />
            <h2 className="text-center text-white text-3xl mt-3 max-[430px]:text-2xl font-semibold">
              NEED A PLACE TO LAY LOW NIGHT ?
            </h2>
            <button className="bg-yellow-400 py-2 px-20 font-semibold mt-5 text-white text-xl">
              Book now
            </button>

            <div className="bg-white p-2 px-4 max-w-4xl max-[800px]:w-[90%] w-full mt-14 h-16 flex items-center rounded-xl">
              <CiLocationArrow1 className="text-4xl" />
              <input
                type="text"
                className="w-full h-full text-xl px-2 outline-none"
                placeholder="Search for a city or particular hotel"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="bg-blue text-lg h-full w-[180px] text-white rounded-xl"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex justify-between items-center gap-3">
            <span className="flex justify-between items-center px-2 gap-2 py-1 rounded-md border text-sm">
              royal <RiCloseLine />
            </span>
          </div>
          <div className="border py-[2px] px-5 rounded-lg flex items-center gap-2">
            Filter <CiFilter />
          </div>
        </div>
        {/* <p className="font-bold text-2xl mt-8">Result: 207 hotels found</p> */}
        <div className="grid grid-cols-3 max-[768px]:grid-cols-2 max-[430px]:grid-cols-1 gap-8 mt-10 max-[1280px]:w-[90%] w-4/5 max-[1024px]:w-full place-items-center  mx-auto">
          {room &&
            room.length > 0 &&
            room.map((rm, index) => (
              <HotelPostCard
                key={index}
                id={rm._id}
                img={rm.roomPictures[0]}
                // img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
                roomAvailable={rm.numberOfRoom}
                hotelType={rm.roomName}
                location={rm.location}
              />
            ))}
        </div>
        <div className="flex items-center mt-24 max-[430px]:flex-col bg-blue w-full p-5 text-white rounded-md justify-between">
          <div className="flex items-center gap-3">
            <MdOutlineMailLock className="text-2xl" />
            <div className="max-[430px]:mb-3">
              <h2 className="text-lg font-semibold max-[768px]:text-base">
                Enter your email address to unlock hotel deals
              </h2>
              <p className="max-[768px]:text-sm">
                Sign up to start receiving exclusive offers
              </p>
            </div>
          </div>
          <div className="flex h-[40px] rounded-md overflow-hidden">
            <input
              type="email"
              className="w-full h-full bg-white p-2 text-[#333]"
              placeholder="Email your email address"
            />
            <button className="bg-yellow-500 h-full w-[180px]">unlock</button>
          </div>
        </div>
      </main>
      <Footer />
      <Toast setShowToastMsg={setShowToastMsg} showToastMsg={showToastMsg} />
    </>
  );
}

export default LandingPage;
