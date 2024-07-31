import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import {
  HiArrowLeft,
  HiOutlineLocationMarker,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import useReverseGeocoding from "../../hooks/useReverseGeocoding";
import Footer from "../../components/Footer";
import { LuBedDouble, LuBedSingle, LuSofa } from "react-icons/lu";
import { GiBunkBeds } from "react-icons/gi";
import Map from "../../components/Map/Map";

function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const token = localStorage.getItem("token");
  const [redirect, setRedirect] = useState(false);
  const [location, setLocation] = useState([]);
  const address = useReverseGeocoding(location[0], location[1]);
  const [activeView, setActiveView] = useState(0);

  useEffect(() => {
    const getRoom = async () => {
      if (!token) return <Navigate to={"/"} />;
      try {
        const res = await fetch(
          `https://ray-apartment-website.onrender.com/api/room/get-room/${roomId}`,
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

  // const priceInfo = (
  //   <>
  //     <h2>Price info</h2>
  //   </>
  // );

  // const facilities = (
  //   <>
  //     <h2>Facilities</h2>
  //   </>
  // );

  // const houseRule = (
  //   <>
  //     <h2>House Rule</h2>
  //   </>
  // );

  // const views = [overview, priceInfo, facilities, houseRule];

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
            <div className="flex iitems-center justify-center my-5">
              <a
                href="#overview"
                className={`py-3 px-20 text-sm border-b-2 border-b-gray-100 hover:border-b-blue hover:bg-gray-100 ${
                  activeView === 0 && "border-b-blue"
                }`}
                onClick={() => setActiveView(0)}
              >
                Overview
              </a>
              <a
                href="#priceInfo"
                className={`py-3 px-20 text-sm border-b-2 border-b-gray-100 hover:border-b-blue hover:bg-gray-100 ${
                  activeView === 1 && "border-b-blue"
                }`}
                onClick={() => setActiveView(1)}
              >
                Info & price
              </a>
              <a
                href="#facilities"
                className={`py-3 px-20 text-sm border-b-2 border-b-gray-100 hover:border-b-blue hover:bg-gray-100 ${
                  activeView === 2 && "border-b-blue"
                }`}
                onClick={() => setActiveView(2)}
              >
                Facilities
              </a>
              <a
                href="#houseRule"
                className={`py-3 px-20 text-sm border-b-2 border-b-gray-100 hover:border-b-blue hover:bg-gray-100 ${
                  activeView === 3 && "border-b-blue"
                }`}
                onClick={() => setActiveView(3)}
              >
                House Rules
              </a>
            </div>
            <section id="overview">
              <h2 className="text-2xl font-semibold mb-3">
                Information about {room && room.company?.companyName}
              </h2>
              <div className="flex items-start gap-14">
                <div className="">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: room && room.description,
                    }}
                    className="p-5 max-w-4xl h-max grow-0"
                  ></div>
                  <button className="w-56 bg-blue py-2 px-2 text-lg mt-4 text-white">
                    Book now
                  </button>
                </div>
                <aside className="max-w-xl">
                  <h2 className="text-md font-semibold mb-3 uppercase">
                    {room && room.roomName} Info and Price
                  </h2>

                  <div className="w-full border p-4">
                    <h2 className="font-semibold">Beds</h2>
                    {room &&
                      room.bedAvailable.map((beds, index) => {
                        return (
                          beds.count > 0 && (
                            <div
                              className="flex items-center justify-between p-2"
                              key={index}
                            >
                              <div className="flex items-center gap-3">
                                {beds.type === "Full" ? (
                                  <LuBedSingle className="text-4xl" />
                                ) : beds.type === "Bunk" ? (
                                  <GiBunkBeds className="text-4xl" />
                                ) : beds.type === "Sofa" ? (
                                  <LuSofa className="text-4xl" />
                                ) : (
                                  <LuBedDouble className="text-4xl" />
                                )}
                                <div>
                                  <p className="text-xl fonr-medium">
                                    {beds.type} bed(s)
                                  </p>
                                </div>
                              </div>
                              <p className="text-xl fonr-medium">
                                {beds.count}
                              </p>
                            </div>
                          )
                        );
                      })}

                    <p className=" my-3 text-lg">
                      <p className="flex items-center font-semibold">
                        <MdOutlineReportGmailerrorred className="text-xl mr-1" />{" "}
                        Note:
                      </p>
                      <p className="pl-3">
                        {room && room.numberOfRoom} available for{" "}
                        {room && room.numberOfGuest} Guest(s)
                      </p>
                      <p className="pl-3">
                        {room && room.isSmokingAllowed
                          ? "Smoking is allowed"
                          : "No smoking"}
                      </p>
                      <p className="pl-3">Pets: {room && room.petAllowed}</p>
                    </p>
                  </div>
                  <Map coordinates={room && room.location} />
                  <button className="w-full bg-blue py-2 px-2 text-lg mt-4 text-white">
                    make reservations
                  </button>
                </aside>
              </div>
            </section>
            <section id="facilities">
              <h2 className="text-2xl font-semibold my-4">
                Facilities availableble at {room && room.company?.companyName}
              </h2>
              <ul className="flex flex-wrap items-center gap-3 my-3 max-w-3xl ml-4">
                {room.company &&
                  room.company.hotelAmenities.map((facility, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className="bg-slate-100 py-2 px-14 rounded-md text-sm text-slate-800 font-semibold"
                        >
                          {facility.name}
                        </li>
                      </>
                    );
                  })}
              </ul>
            </section>
            <section id="houseRule">
              <h2 className="text-2xl font-semibold my-4">House Rule</h2>
              <div className="mt-5 border p-4 grid grid-cols-[20%,1fr] max-w-4xl gap-4">
                <h2 className="font-bold">Check-in time</h2>
                <p>From {room.company && room.company.checkInTime}</p>
                <h2 className="font-bold">Check-out time</h2>
                <p>Until {room.company && room.company.checkOutTime}</p>
                <h2 className="font-bold">Child policy</h2>
                <p>{room.company && room.company.childPolicy}</p>
                <h2 className="font-bold">Cancellation Policy</h2>
                <p>{room.company && room.company.cancellationPolicy}</p>
                <h2 className="font-bold">Pet Policy</h2>
                <p>{room.company && room.company.petPolicy}</p>
                <h2 className="font-bold">Facebook page</h2>
                <p>{room.company && room.company.facebookURL}</p>
                <h2 className="font-bold">Instagram page</h2>
                <p>{room.company && room.company.instaURL}</p>
                <h2 className="font-bold">Twitter page</h2>
                <p>{room.company && room.company.twitterURL}</p>
              </div>
            </section>
          </main>
          <Footer />
        </>
      ) : (
        <p className="text-center">loading....</p>
      )}
    </>
  );
}

export default RoomDetail;
