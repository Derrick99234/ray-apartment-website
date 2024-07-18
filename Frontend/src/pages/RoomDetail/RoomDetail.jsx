import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";

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
            <div dangerouslySetInnerHTML={{ __html: room.description }}></div>
            <button className="w-full bg-blue py-3 px-2 text-xl mt-4 text-white">
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
