import { HiOutlineLocationMarker, HiPlus } from "react-icons/hi";
import SideBar from "../../components/sideBar";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const res = await fetch(
        "https://ray-apartment-website.onrender.com/api/user/get",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUser(data.user);
      console.log(data.user.email);
    };

    fetchUserDetail();
  }, [token]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(
        "https://ray-apartment-website.onrender.com/api/room/get-all-rooms"
      );
      const data = await response.json();
      const arr = data.room;

      const companyArr = [];

      arr.forEach((room) => {
        if (user.email === room.company.companyId) {
          companyArr.push(room);
        }
      });
      setRooms(companyArr.reverse().slice(0, 2));
    };

    if (user.email) {
      fetchRooms();
    }
  }, [user.email]);

  useEffect(() => {
    const GEOAPIFY_API_KEY = "86dd5eb3f5f44a0899e450a627f3d2e3";
    const getAddressFromCoordinates = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
        );
        console.log(response.data);
        if (
          response.data &&
          response.data.features &&
          response.data.features.length > 0
        ) {
          const city = response.data.features[0].properties.city || "";
          const state = response.data.features[0].properties.state || "";
          const formatted =
            response.data.features[0].properties.formatted || "";
          return [`${city} ${state}`, formatted];
        }
      } catch (error) {
        console.error("Error fetching address data", error);
      }
      return "Unknown location";
    };

    rooms.map((room) => {
      getAddressFromCoordinates(room.location[0], room.location[1]).then(
        (addr) => setAddress(...address, addr)
      );
    });

    console.log(`address: ${address}`);
  }, [rooms]);

  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="p-10 pl-[250px]">
          <DashHeader />
          <div className="flex gap-16">
            <div
              className="border-2 border-gray-900 mt-3 bg-gray-50 rounded-lg w-80 h-52 flex flex-col gap-2 justify-center items-center cursor-pointer"
              onClick={() => navigate("/create-room")}
            >
              <HiPlus className="text-[4.5rem] rounded-md font-bold" />
              <span>create post of your property... </span>
            </div>
            <div>
              <h2 className="font-semibold text-2xl mb-4">Recent post</h2>
              {rooms &&
                rooms.map((room, index) => {
                  return (
                    <div
                      className="flex gap-3 bg-black/5 rounded-lg overflow-hidden cursor-pointer my-4"
                      key={index}
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/ray-apartment.appspot.com/o/images%2Fbedroom-3475656_1280(1).jpg?alt=media&token=94ad73df-4784-4e27-8c91-f7a5361a39e0"
                        alt=""
                        className="w-36"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-2xl">
                          {room.roomName}
                        </h3>
                        <p className="flex gap-2 items-center">
                          <HiOutlineLocationMarker />
                          {address &&
                          address[index] &&
                          address[index].length > 20
                            ? `${address[index].slice(0, 20)}...`
                            : address[index]}
                        </p>
                        <p>N{room.roomPricePerNight} / per night</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
