import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import MyMapComponent from "../MyMapComponent";
import useReverseGeocoding from "../../hooks/useReverseGeocoding";
import { LuBedDouble, LuBedSingle, LuSofa } from "react-icons/lu";
import { GiBunkBeds } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

/* eslint-disable react/prop-types */
function ManageRoomPopUp({ closePopUp, roomDetail }) {
  const [popUpState, setPopUpState] = useState("options");
  const address = useReverseGeocoding(
    roomDetail?.location[0],
    roomDetail?.location[1]
  );
  const [location, setLocation] = useState(address || "");
  const handlePinLocation = (position) => {
    setLocation(position);
    console.log("Pinned location:", location);
  };

  const [twinBedNumber, setTwinBedNumber] = useState(0);
  const [kingBedNumber, setKingBedNumber] = useState(0);
  const [queenBedNumber, setQueenBedNumber] = useState(0);
  const [fullBedNumber, setFullBedNumber] = useState(0);
  const [sofaBedNumber, setSofaBedNumber] = useState(0);
  const [bunkBedNumber, setBunkBedNumber] = useState(0);
  const [futonBedNumber, setFutonBedNumber] = useState(0);
  const [moreOption, setMoreOption] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [numberOfGuestInRoom, setNumberOfGuestInRoom] = useState(
    roomDetail?.numberOfGuest
  );
  const [isSmokingAllowed, setIsSmokingAllowed] = useState(
    roomDetail?.isSmokingAllowed
  );

  useEffect(() => {
    roomDetail &&
      roomDetail.bedAvailable.map((beds) => {
        beds.type === "Full" && setFullBedNumber(beds.count);
        beds.type === "King" && setKingBedNumber(beds.count);
        beds.type === "Queen" && setQueenBedNumber(beds.count);
        beds.type === "Sofa" && setSofaBedNumber(beds.count);
        beds.type === "Twin" && setTwinBedNumber(beds.count);
        beds.type === "Bunk" && setBunkBedNumber(beds.count);
        beds.type === "Futon" && setFutonBedNumber(beds.count);
      });
  }, [roomDetail]);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="max-w-3xl bg-white p-4 flex flex-col gap-5 rounded-md relative pt-10 z-50 max-h-svh">
        <RiCloseLine
          className="cursor-pointer absolute right-5 text-xl top-2"
          onClick={closePopUp}
        />
        {popUpState === "options" && (
          <>
            <div
              className="border p-4 bg-gray-900/10 w-full cursor-pointer"
              onClick={() => setPopUpState("editLocation")}
            >
              <h2 className="font-semibold text-xl">Manage Location</h2>
              <p>manage and edit your location {roomDetail?.roomName}</p>
            </div>
            <div
              className="border p-4 bg-gray-900/10 w-full cursor-pointer"
              onClick={() => setPopUpState("editRoomDetails")}
            >
              <h2 className="font-semibold text-xl">Manage Room details</h2>
              <p>
                manage and edit your room details, like room name, beds, number
                of rooms...
              </p>
            </div>
            <div className="border p-4 bg-gray-900/10 w-full cursor-pointer">
              <h2 className="font-semibold text-xl">Change Room Pictures</h2>
              <p>
                Just made some changes to your rooms? Add or remove room
                pictures you want to display
              </p>
            </div>
            <div className="border p-4 bg-gray-900/10 w-full cursor-pointer">
              <h2 className="font-semibold text-xl">
                Manage House rule and description
              </h2>
              <p>Now you can change room rules and desccriptions</p>
            </div>
            <div className="border p-4 bg-gray-900/10 w-full cursor-pointer">
              <h2 className="font-semibold text-xl">
                Manage other room details
              </h2>
              <p>breakfast, parking, parking space, hotel ammenties etc.</p>
            </div>
          </>
        )}

        {popUpState === "editLocation" && (
          <>
            <h3 className="text-xl mt-3">
              Pin your exact location at {address}? (Your property location)
            </h3>

            <MyMapComponent
              location={address}
              onPinLocation={handlePinLocation}
            />

            <div className="flex items-center gap-4 justify-between mt-10">
              <button
                type="button"
                className="bg-gray-300 text-black py-2 w-full"
                onClick={() => setPopUpState("options")}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                Save
              </button>
            </div>
          </>
        )}

        {popUpState === "editRoomDetails" && (
          <>
            <div className="w-[48rem] overflow-y-scroll">
              <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
                Room details
              </h2>
              <div className="py-5 px-3  my-4 max-w-md border bg-white shadow-md">
                <h3 className="font-semibold ">
                  How many of this room do you have ?
                </h3>
                <input
                  type="number"
                  className="w-20 p-2 h-10 border outline-none rounded-lg mt-3"
                  value={roomData.numberOfRoom || roomDetail?.numberOfRoom}
                  onChange={(e) =>
                    setRoomData({ ...roomData, numberOfRoom: e.target.value })
                  }
                />
                <h3 className="font-semi-bold my-4">Room name</h3>
                <input
                  className="w-4/5 p-2 px-4 rounded-lg outline-none border"
                  placeholder="(e.g) Deluxe Double Room wiith Extra bed"
                  value={roomData.roomName || roomDetail?.roomName}
                  onChange={(e) =>
                    setRoomData({ ...roomData, roomName: e.target.value })
                  }
                />
              </div>
              <div className="p-5 border mt-5">
                <h3 className="font-semibold mb-3">
                  what beds are available in this room ?
                </h3>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <LuBedSingle className="text-4xl" />
                    <div>
                      <p>full bed(s)</p>
                      <p>52-59 inches wide</p>
                    </div>
                  </div>
                  <div className="border flex justify-betwwen items-center">
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setFullBedNumber((prev) => prev - 1)}
                    >
                      -
                    </div>
                    <div className="p-4 py-2">{fullBedNumber}</div>
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setFullBedNumber((prev) => prev + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3">
                    <LuBedDouble className="text-4xl" />
                    <div>
                      <p>twin bed(s)</p>
                      <p>35-51 inches wide</p>
                    </div>
                  </div>
                  <div className="border flex justify-betwwen items-center">
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setTwinBedNumber((prev) => prev - 1)}
                    >
                      -
                    </div>
                    <div className="p-4 py-2">{twinBedNumber}</div>
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setTwinBedNumber((prev) => prev + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3">
                    <LuBedDouble className="text-4xl" />
                    <div>
                      <p>queen bed(s)</p>
                      <p>60-70 inches wide</p>
                    </div>
                  </div>
                  <div className="border flex justify-betwwen items-center">
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setQueenBedNumber((prev) => prev - 1)}
                    >
                      -
                    </div>
                    <div className="p-4 py-2">{queenBedNumber}</div>
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setQueenBedNumber((prev) => prev + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3">
                    <LuBedDouble className="text-4xl" />
                    <div>
                      <p>king bed(s)</p>
                      <p>71-81 inches wide</p>
                    </div>
                  </div>
                  <div className="border flex justify-betwwen items-center">
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setKingBedNumber((prev) => prev - 1)}
                    >
                      -
                    </div>
                    <div className="p-4 py-2">{kingBedNumber}</div>
                    <div
                      className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                      onClick={() => setKingBedNumber((prev) => prev + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <p
                  onClick={() => setMoreOption((prev) => !prev)}
                  className="my-3"
                >
                  {moreOption ? (
                    <span className="flex items-center gap-2">
                      few bed option
                      <MdKeyboardArrowDown />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      more option <MdKeyboardArrowUp />{" "}
                    </span>
                  )}
                </p>

                {moreOption && (
                  <>
                    <div className="flex justify-between mt-5">
                      <div className="flex items-center gap-3">
                        <GiBunkBeds className="text-4xl" />
                        <div>
                          <p>bunk bed(s)</p>
                          <p>verifying size</p>
                        </div>
                      </div>
                      <div className="border flex justify-betwwen items-center">
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setBunkBedNumber((prev) => prev - 1)}
                        >
                          -
                        </div>
                        <div className="p-4 py-2">{bunkBedNumber}</div>
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setBunkBedNumber((prev) => prev + 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-5">
                      <div className="flex items-center gap-3">
                        <LuSofa className="text-4xl" />
                        <div>
                          <p>sofa bed(s)</p>
                          <p>verifying size</p>
                        </div>
                      </div>
                      <div className="border flex justify-betwwen items-center">
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setSofaBedNumber((prev) => prev - 1)}
                        >
                          -
                        </div>
                        <div className="p-4 py-2">{sofaBedNumber}</div>
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setSofaBedNumber((prev) => prev + 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-5">
                      <div className="flex items-center gap-3">
                        <LuBedDouble className="text-4xl" />
                        <div>
                          <p>futon bed(s)</p>
                          <p>verifying size</p>
                        </div>
                      </div>
                      <div className="border flex justify-betwwen items-center">
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setFutonBedNumber((prev) => prev - 1)}
                        >
                          -
                        </div>
                        <div className="p-4 py-2">{futonBedNumber}</div>
                        <div
                          className="p-4 hover:bg-gray-600 py-2 hover:text-white text-xl cursor-pointer"
                          onClick={() => setFutonBedNumber((prev) => prev + 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-5 border mt-5">
                <h3 className="font-semibold mb-3">
                  how many guest can stay in this room ?
                </h3>
                <div className="border flex justify-betwwen items-center max-w-32">
                  <div
                    className="p-4 hover:bg-gray-600 py-2 font-semibold hover:text-white text-xl cursor-pointer"
                    onClick={() => setNumberOfGuestInRoom((prev) => prev - 1)}
                  >
                    -
                  </div>
                  <div className="p-4 py-2">{numberOfGuestInRoom}</div>
                  <div
                    className="p-4 hover:bg-gray-600 py-2 font-semibold hover:text-white text-xl cursor-pointer"
                    onClick={() => setNumberOfGuestInRoom((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>
              <div className="p-8 border mt-5">
                <h3 className="font-semibold mb-3">
                  is smoking allowed in this room ?
                </h3>
                <div className="my-5">
                  <div>
                    <label htmlFor="yes" className="mr-4">
                      Yes
                    </label>
                    <input
                      type="radio"
                      name="smoking"
                      checked={isSmokingAllowed === true}
                      onChange={() => setIsSmokingAllowed(true)}
                    />
                  </div>
                  <div>
                    <label htmlFor="no" className="mr-4">
                      No
                    </label>
                    <input
                      type="radio"
                      name="smoking"
                      checked={isSmokingAllowed === false}
                      onChange={() => setIsSmokingAllowed(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-between mt-10">
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 w-full"
                  onClick={() => setPopUpState("options")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageRoomPopUp;
