import { useContext, useEffect, useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import MyMapComponent from "../MyMapComponent";
import useReverseGeocoding from "../../hooks/useReverseGeocoding";
import { LuBedDouble, LuBedSingle, LuSofa } from "react-icons/lu";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GiBunkBeds } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CompanyContext } from "../../context/companyContext";
import { HiLightBulb } from "react-icons/hi";

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
  const [roomData, setRoomData] = useState({
    roomPricePerNight: roomDetail.roomPricePerNight,
  });
  const [numberOfGuestInRoom, setNumberOfGuestInRoom] = useState(
    roomDetail?.numberOfGuest
  );
  const [isSmokingAllowed, setIsSmokingAllowed] = useState(
    roomDetail?.isSmokingAllowed
  );
  const amenityRef = useRef();
  const [parkingPaid, setParkingPaid] = useState("");
  const [parkingAmount, setParkingAmount] = useState("");
  const [parkingDay, setParkingDay] = useState("");
  const [reservation, setReservation] = useState("");
  const [breakfast, setBreakfast] = useState(false);
  const [breakfastPaid, setBreakfastPaid] = useState("No");
  const [childrenPolicy, setChildrenPolicy] = useState("Upon Request");
  const [petPolicy, setPetPolicy] = useState("");
  const { company } = useContext(CompanyContext);
  const handleRadioChange = (event) => {
    setChildrenPolicy(event.target.value);
  };
  const handlePetPolicy = (event) => {
    setPetPolicy(event.target.value);
  };

  const [value, setValue] = useState(roomDetail?.description);
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const [amenities, setAmenities] = useState([]);
  const [addFacility, setAddFacility] = useState(false);

  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const updatedAmenities = [...amenities];
    updatedAmenities[index].checked = checked;
    setAmenities(updatedAmenities);
  };
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
    setAmenities(company?.hotelAmenities);
  }, [roomDetail, company]);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const onSubmitLocation = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:2024/api/room/update_room_location/${roomDetail?._id}`,
        {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PATCH",
          body: JSON.stringify({ location }),
        }
      );
      console.log(JSON.stringify({ location }));
      const data = await res.json();
      if (!data.error) {
        console.log("Location updated successfully");
      } else {
        console.log("error when trying to updated location");
      }
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmitRoomDetail = async () => {
    setLoading(true);
    const dataToSend = {
      ...roomData,
      bedAvailable: [
        { type: "Full", count: fullBedNumber },
        { type: "Twin", count: twinBedNumber },
        { type: "Queen", count: queenBedNumber },
        { type: "King", count: kingBedNumber },
        { type: "Bunk", count: bunkBedNumber },
        { type: "Sofa", count: sofaBedNumber },
        { type: "Futon", count: futonBedNumber },
      ],
      numberOfGuest: numberOfGuestInRoom,
      isSmokingAllowed,
    };

    try {
      console.log("Data to send:", dataToSend);

      const res = await fetch(
        `http://localhost:2024/api/room/update_room_details/${roomDetail?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
          method: "PATCH",
        }
      );

      const data = await res.json();
      if (!data.error) {
        console.log("Room deta updated successfully");
      } else {
        console.log("error when trying to updated location");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateHouseRule = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:2024/api/room/update_house_rule/${roomDetail?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            childrenAllowed: childrenPolicy,
            petAllowed: petPolicy,
            parking: [{ parkingPaid, reservation, parkingAmount, parkingDay }],
            breakfast: {
              serve: breakfast,
              included: breakfastPaid,
            },
            description: value,
          }),
          method: "PATCH",
        }
      );

      const data = await res.json();
      if (!data.error) {
        console.log("Room deta updated successfully");
      } else {
        console.log("error when trying to updated location");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOtherRoomData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2024/api/room/update_other_room_details/${roomDetail?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomFacility: amenities,
            roomPricePerNight: roomData.roomPricePerNight,
          }),
          method: "PATCH",
        }
      );
      const data = await response.json();

      const updateResponse = await fetch(
        `https://ray-apartment-website.onrender.com/api/company/update-company-data/${company.companyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hotelAmenities: amenities }),
          method: "PUT",
        }
      );

      const updateResponseData = await updateResponse.json();

      if (!updateResponse.ok) {
        console.error("Error update response data:", updateResponseData);
        throw new Error(
          updateResponseData.message || "Error updating company data"
        );
      }

      if (!data.error) {
        console.log("Room deta updated successfully");
      } else {
        console.log("error when trying to updated location");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
              <p>manage and edit your location</p>
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
            <div
              className="border p-4 bg-gray-900/10 w-full cursor-pointer"
              onClick={() => setPopUpState("editRoomPictures")}
            >
              <h2 className="font-semibold text-xl">Change Room Pictures</h2>
              <p>
                Just made some changes to your rooms? Add or remove room
                pictures you want to display
              </p>
            </div>
            <div
              className="border p-4 bg-gray-900/10 w-full cursor-pointer"
              onClick={() => setPopUpState("editHouseRule")}
            >
              <h2 className="font-semibold text-xl">
                Manage House rule and description
              </h2>
              <p>Now you can change room rules and desccriptions</p>
            </div>
            <div
              className="border p-4 bg-gray-900/10 w-full cursor-pointer"
              onClick={() => setPopUpState("editRoomDetailsAndOthers")}
            >
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
                onClick={onSubmitLocation}
                className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "saving..." : "Save"}
              </button>
            </div>
          </>
        )}

        {popUpState === "editRoomPictures" && (
          <div className="w-full overflow-y-scroll">
            <div className="grid grid-cols-2 gap-5">
              {roomDetail?.roomPictures &&
                roomDetail?.roomPictures.map((picture, index) => (
                  <div
                    className="flex items-center justify-center relative"
                    key={index}
                  >
                    <img
                      src={picture}
                      alt=""
                      className="w-full h-[200px] rounded-md"
                    />
                    <div className=" flex gap-2 items-center justify-center absolute inset-0 bg-black/30">
                      <button className="bg-white text-gray-800 py-1 px-4 rounded-md">
                        edit
                      </button>
                      <button className="bg-gray-800 py-1 px-4 text-white rounded-md">
                        delete
                      </button>
                    </div>
                  </div>
                ))}
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
                onClick={onSubmitLocation}
                className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "saving..." : "Save"}
              </button>
            </div>
          </div>
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
                    onClick={() =>
                      setNumberOfGuestInRoom((prev) => Number(prev) - 1)
                    }
                  >
                    -
                  </div>
                  <div className="p-4 py-2">{numberOfGuestInRoom}</div>
                  <div
                    className="p-4 hover:bg-gray-600 py-2 font-semibold hover:text-white text-xl cursor-pointer"
                    onClick={() =>
                      setNumberOfGuestInRoom((prev) => Number(prev) + 1)
                    }
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
                  onClick={onSubmitRoomDetail}
                  className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {loading ? "saving..." : "Save"}
                </button>
              </div>
            </div>
          </>
        )}

        {popUpState === "editHouseRule" && (
          <div className="w-[48rem] overflow-y-scroll">
            <div className="p-5 border">
              <h2 className="text-3xl font-bold">House Rule</h2>
              <h3 className="font-semibold mt-4">Do you allow children ?</h3>
              <div className="my-5">
                <div>
                  <input
                    type="radio"
                    name="children"
                    id="yes"
                    value="Yes"
                    checked={childrenPolicy === "Yes"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="yes" className="ml-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="children"
                    id="no"
                    value="No"
                    checked={childrenPolicy === "No"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="no" className="ml-3">
                    No
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="children"
                    id="uponRequest"
                    value="Upon Request"
                    checked={childrenPolicy === "Upon Request"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="upomRequest" className="ml-3">
                    Upon Request
                  </label>
                </div>
              </div>
              <h3 className="font-semibold mt-4">Do you allow pets ?</h3>
              <div className="my-5">
                <div>
                  <input
                    type="radio"
                    name="pet"
                    id="yes"
                    value="Yes"
                    checked={petPolicy === "Yes"}
                    onChange={handlePetPolicy}
                  />
                  <label htmlFor="yes" className="ml-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="pet"
                    id="no"
                    value="No"
                    checked={petPolicy === "No"}
                    onChange={handlePetPolicy}
                  />
                  <label htmlFor="no" className="ml-3">
                    No
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="pet"
                    id="uponRequest"
                    value="Upon Request"
                    checked={petPolicy === "Upon Request"}
                    onChange={handlePetPolicy}
                  />
                  <label htmlFor="upomRequest" className="ml-3">
                    Upon Request
                  </label>
                </div>
              </div>
            </div>
            <div className="p-5 border mt-5">
              <h2 className="text-3xl font-bold">
                Tell us about parking situations
              </h2>
              <h3 className="font-semibold mt-4">
                Is parking space available?
              </h3>
              <div className="my-5">
                <div>
                  <input
                    type="radio"
                    name="parking"
                    id="free"
                    value="Free"
                    checked={parkingPaid === "Free"}
                    onChange={(e) => setParkingPaid(e.target.value)}
                  />
                  <label htmlFor="free" className="ml-3">
                    Yes, free
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="parking"
                    id="paid"
                    value="Paid"
                    checked={parkingPaid === "Paid"}
                    onChange={(e) => setParkingPaid(e.target.value)}
                  />
                  <label htmlFor="paid" className="ml-3">
                    Yes, paid
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="parking"
                    id="no"
                    value="No"
                    checked={parkingPaid === "No"}
                    onChange={(e) => setParkingPaid(e.target.value)}
                  />
                  <label htmlFor="no" className="ml-3">
                    No
                  </label>
                </div>
              </div>
              {parkingPaid === "Paid" && (
                <>
                  <div>
                    <h3 className="font-semibold my-4">
                      How much does parking cost?
                    </h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Naira NGN"
                        className="w-full py-2 px-5 outline-none border"
                        onChange={(e) => setParkingAmount(e.target.value)}
                      />
                      <select
                        name="parkingDay"
                        id="parkingDay"
                        className="w-40 p-2"
                        onChange={(e) => setParkingDay(e.target.value)}
                      >
                        <option value="per day">per day</option>
                        <option value="per month">per month</option>
                      </select>
                    </div>
                    <h3 className="font-semibold my-4">
                      Do guests need to reserve a parking spot?
                    </h3>
                    <div className="my-5">
                      <div>
                        <input
                          type="radio"
                          name="reservation"
                          id="reservationNeeded"
                          value="Reservation Needed"
                          checked={reservation === "Reservation Needed"}
                          onChange={(e) => setReservation(e.target.value)}
                        />
                        <label htmlFor="reservationNeeded" className="ml-3">
                          Reservation Needed
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="reservation"
                          id="noReservationNeeded"
                          value="No Reservation Needed"
                          checked={reservation === "No Reservation Needed"}
                          onChange={(e) => setReservation(e.target.value)}
                        />
                        <label htmlFor="noReservationNeeded" className="ml-3">
                          No Reservation Needed
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-5 border mt-5">
              <h2 className="text-3xl font-bold">Breakfast Detail</h2>
              <h3 className="font-semibold mt-4">
                Do you serve your guests breakfast?
              </h3>
              <div className="my-5">
                <div>
                  <input
                    type="radio"
                    name="breakfast"
                    id="yesBreakfast"
                    checked={breakfast}
                    onChange={() => setBreakfast(true)}
                  />
                  <label htmlFor="yesBreakfast" className="ml-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="breakfast"
                    id="noBreakfast"
                    checked={!breakfast}
                    onChange={() => setBreakfast(false)}
                  />
                  <label htmlFor="noBreakfast" className="ml-3">
                    No
                  </label>
                </div>
              </div>
              {breakfast && (
                <>
                  <h3 className="font-semibold mt-4">
                    Is breakfast included in the guest&apos;s pay?
                  </h3>
                  <div className="my-5">
                    <div>
                      <input
                        type="radio"
                        name="breakfastPaid"
                        id="yesBreakfastPaid"
                        checked={breakfastPaid}
                        onChange={() => setBreakfastPaid(true)}
                      />
                      <label htmlFor="yesBreakfastPaid" className="ml-3">
                        Yes
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="breakfastPaid"
                        id="noBreakfastPaid"
                        checked={!breakfastPaid}
                        onChange={() => setBreakfastPaid(false)}
                      />
                      <label htmlFor="noBreakfastPaid" className="ml-3">
                        No
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <ReactQuill
              value={value}
              formats={formats}
              onChange={(newValue) => setValue(newValue)}
              className="h-[60vh] mb-10"
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
                onClick={updateHouseRule}
                className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "saving..." : "Save"}
              </button>
            </div>
          </div>
        )}

        {popUpState === "editRoomDetailsAndOthers" && (
          <div className="w-[48rem] overflow-y-scroll">
            <h2 className="text-2xl font-bold">
              What can guests use at your hotel?
            </h2>
            <div className="flex gap-5">
              <div className="p-5 border mt-5 w-[652px]">
                {amenities &&
                  amenities.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox w-6 h-6 text-slate-800 p-2 border border-gray-300 rounded-md mr-3"
                        value={item.name}
                        checked={item.checked}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                      <span className="text-lg">{item.name}</span>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 max-w-sm border p-5">
                <HiLightBulb className="text-4xl" />
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    These are the hotel amenities you chose at the time of
                    registration
                  </h3>
                  <p>
                    You can{" "}
                    <span
                      className="text-blue cursor-pointer"
                      onClick={() => {
                        setAddFacility(true);
                        setAmenities([...company.hotelAmenities]);
                      }}
                    >
                      add
                    </span>{" "}
                    more facilities
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap my-3">
              {amenities.length > 0 &&
                amenities.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-[2px] text-sm border rounded-sm flex items-center gap-1"
                  >
                    {item.name}
                    <RiCloseLine
                      onClick={() => {
                        const filteredList = amenities.filter(
                          (data) => data.name !== item.name
                        );
                        setAmenities(filteredList);
                      }}
                      className="cursor-pointer"
                    />
                  </span>
                ))}
            </div>
            {addFacility && (
              <div className="flex items-center h-10 gap-3 mt-4">
                <input
                  type="text"
                  className="w-full py-2 px-5 border rounded-sm outline-none"
                  placeholder="Add your hotel facilities available for this room"
                  ref={amenityRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setAmenities([
                        ...amenities,
                        { name: amenityRef.current.value, checked: false },
                      ]);
                      amenityRef.current.value = "";
                    }
                  }}
                />
                <button
                  className="font-bold text-xl bg-gray-800 w-14 text-white rounded-md h-full"
                  type="button"
                  onClick={() => {
                    if (amenityRef.current.value.trim() !== "") {
                      setAmenities([
                        ...amenities,
                        {
                          name: amenityRef.current.value.trim(),
                          checked: false,
                        },
                      ]);
                      amenityRef.current.value = "";
                    }
                  }}
                >
                  +
                </button>
              </div>
            )}
            {/* <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
              Set the price per night for this room
            </h2> */}
            <div className="py-5 px-5  my-4 max-w-md border bg-white shadow-md">
              <h3 className="font-semibold ">
                How much do you want to charge per night ?
              </h3>
              <div>
                <label htmlFor="pricePerNight" className="mt-4 block text-sm">
                  Price guest pay
                </label>
                <div className="flex items-center mb-3">
                  <span className="bg-slate-200 border py-2 px-3 rounded-l-md font-semibold">
                    NGN
                  </span>
                  <input
                    type="text"
                    className="w-full border py-2 px-3 rounded-r-md outline-none"
                    value={roomData.roomPricePerNight}
                    placeholder=""
                    onChange={(e) =>
                      setRoomData({
                        ...roomData,
                        roomPricePerNight: e.target.value,
                      })
                    }
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
                onClick={updateOtherRoomData}
                className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageRoomPopUp;
