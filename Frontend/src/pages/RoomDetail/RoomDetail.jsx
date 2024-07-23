import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiOutlineLocationMarker,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import useReverseGeocoding from "../../hooks/useReverseGeocoding";

function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const token = localStorage.getItem("token");
  const [redirect, setRedirect] = useState(false);
  const [location, setLocation] = useState([]);
  const address = useReverseGeocoding(location[0], location[1]);

  useEffect(() => {
    const getRoom = async () => {
      if (!token) return <Navigate to={"/"} />;
      try {
        const res = await fetch(
          `http://localhost:2024/api/room/get-room/${roomId}`,
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.message === "Unauthorized") {
          setRedirect(true);
        } else {
          setRoom(data.room);
          if (data.room && data.room.location) {
            setLocation(data.room.location);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getRoom();
  }, [roomId, token]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? room.roomPictures.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === room.roomPictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex items-center justify-end p-4 bg-black">
        <Link to="/">
          <HiArrowLeft className="text-2xl cursor-pointer text-white" />
        </Link>
      </div>
      {room ? (
        <>
          <main className="p-5">
            <h2 className="text-2xl font-semibold">
              {room.company?.companyName}
            </h2>
            <p className="flex items-center gap-2">
              <HiOutlineLocationMarker />
              {address}
            </p>
            <div className="relative my-5">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={handlePrev}
              >
                <HiChevronLeft size={30} />
              </button>
              <div className="flex overflow-hidden">
                {room.roomPictures?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className={`h-[70vh] w-full flex-shrink-0 transition-transform duration-300 ${
                      index === currentIndex ? "block" : "hidden"
                    }`}
                  />
                ))}
              </div>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={handleNext}
              >
                <HiChevronRight size={30} />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              Information about {room.company?.companyName}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: room.description }}
              className="p-5 max-w-4xl"
            ></div>
            <button className="w-56 bg-blue py-2 px-2 text-lg mt-4 text-white">
              Book now
            </button>
          </main>
        </>
      ) : (
        <p className="text-center">loading....</p>
      )}
    </>
  );
}

export default RoomDetail;
