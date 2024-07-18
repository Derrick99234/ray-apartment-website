import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiOutlineLocationMarker } from "react-icons/hi";

function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const token = localStorage.getItem("token");
  const [redirect, setRedirect] = useState(false);
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
        if (data.message === "Unauthorized") setRedirect(true);
        setRoom(data.room);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getRoom();
  }, [roomId, token]);
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
            <h2 className="text-2xl font-semibold">Blue Moon Hotel, VI </h2>
            <p className="flex items-center gap-2">
              <HiOutlineLocationMarker />
              {room && room.location}
            </p>
            <div className="flex my-5 overflow-x-scroll gap-3">
              {room.roomPictures &&
                room.roomPictures.map((img, index) => (
                  <>
                    <img
                      key={index}
                      src={img}
                      alt=""
                      className="h-[70vh] w-full flex-shrink-0"
                    />
                  </>
                ))}
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              Information about Blue Moon Hotel, VI
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
