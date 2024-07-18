import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import DashHeader from "../../components/DashHeader";
import SideBar from "../../components/sideBar";
import { HiCheckCircle, HiLightBulb } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { LuBedSingle, LuBedDouble, LuSofa } from "react-icons/lu";
import { GiBunkBeds } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiCloseLine, RiUploadCloudLine } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function UploadRooms() {
  const [company, setCompany] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [oneProperty, setOneProperty] = useState(false);
  const [multiplyProperty, setMultiplyProperty] = useState(false);
  const [numberOfProperty, setNumberOfProperties] = useState(2);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  // const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sameLocation, setSameLocation] = useState(true);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);

  const photoRef = useRef();

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  const [addFacility, setAddFacility] = useState(false);

  const [twinBedNumber, setTwinBedNumber] = useState(0);
  const [kingBedNumber, setKingBedNumber] = useState(0);
  const [queenBedNumber, setQueenBedNumber] = useState(0);
  const [fullBedNumber, setFullBedNumber] = useState(0);
  const [sofaBedNumber, setSofaBedNumber] = useState(0);
  const [bunkBedNumber, setBunkBedNumber] = useState(0);
  const [futonBedNumber, setFutonBedNumber] = useState(0);

  const [parkingPaid, setParkingPaid] = useState("");
  const [parkingAmount, setParkingAmount] = useState("");
  const [parkingDay, setParkingDay] = useState("");
  const [reservation, setReservation] = useState("");

  const amenityRef = useRef();

  const [moreOption, setMoreOption] = useState(false);

  const navigate = useNavigate();

  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const getComapanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !userInfo.email) {
          return navigate("/login");
        }
        const response = await fetch(
          `http://localhost:2024/api/company/get-company-data/${userInfo.email}`,
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.error) {
          return navigate("/login");
        }
        setCompany(data.company);
        setAmenities(data.company.hotelAmenities);
      } catch (error) {
        console.log("error while trying to get company data", error);
        return navigate("/login");
      }
    };

    getComapanyDetails();
  }, [navigate, userInfo]);

  const [location, setLocation] = useState(company.location || "");

  const [breakfast, setBreakfast] = useState(false);
  const [breakfastPaid, setBreakfastPaid] = useState("No");

  const [numberOfGuestInRoom, setNumberOfGuestInRoom] = useState(0);
  const [isSmokingAllowed, setIsSmokingAllowed] = useState(false);
  const [childrenPolicy, setChildrenPolicy] = useState("Upon Request");

  const handleRadioChange = (event) => {
    setChildrenPolicy(event.target.value);
  };
  const [petPolicy, setPetPolicy] = useState("");

  const handlePetPolicy = (event) => {
    setPetPolicy(event.target.value);
  };

  const step1 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        MAKE YOUR PROPERTY VISIBLE BY UPLOADING THEM
      </h2>

      <h3 className="text-xl mt-3">How many hotels are you listing</h3>

      <div className="flex items-center gap-5 mt-5">
        <div
          className={`py-10 px-5 border border-gray-500 rounded-xl bg-slate-100 cursor-pointer ${
            oneProperty && "border-2 border-gray-800 relative"
          }`}
          onClick={() => {
            setOneProperty(true);
            setMultiplyProperty(false);
          }}
        >
          One hotel with one or multiple rooms that guests can book
          <HiCheckCircle className="text-2xl absolute bottom-3 right-3" />
        </div>
        <div
          className={`py-10 px-5 border border-gray-500 rounded-xl bg-slate-100 cursor-pointer ${
            multiplyProperty && "border-2 border-gray-800 relative"
          }`}
          onClick={() => {
            setOneProperty(false);
            setMultiplyProperty(true);
          }}
        >
          Multiple hotels with one or multiple rooms that guests can book
          <HiCheckCircle className="text-2xl absolute bottom-3 right-3" />
        </div>
      </div>
      {multiplyProperty && (
        <div>
          <label htmlFor="number-of-properties">Number of properties</label>
          <input
            type="number"
            id="number-of-properties"
            value={numberOfProperty}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value < 2) {
                setError("Can not be less than 2");
              } else {
                setError("");
                setNumberOfProperties(value);
              }
            }}
            className="block mt-2 w-20 p-2 h-10 border outline-none rounded-lg"
          />
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
      <button
        type="button"
        disabled={!oneProperty && !multiplyProperty}
        className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full mt-10 disabled:cursor-not-allowed disabled:bg-slate-400"
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );

  const handleInput = async (e) => {
    const query = e.target.value;
    setSelectedSuggestion(query);
    setNoResults(false);

    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

        if (response.data.length > 0) {
          setSuggestions(response.data);
        } else {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setSelectedSuggestion(suggestion.display_name);
    setLocation(suggestion.display_name);
    setSuggestions([]);
    setNoResults(false);
    setLoading(false);
  };

  const step2 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        MAKE YOUR PROPERTY VISIBLE BY UPLOADING THEM
      </h2>
      <h3 className="text-xl mt-3">
        Is it located at {company.location}? (Your property location)
      </h3>
      <div className="my-5">
        <div>
          <label htmlFor="yes" className="mr-4">
            Yes
          </label>
          <input
            type="radio"
            name="location"
            // value={company.location}
            checked={location === company.location}
            onChange={() => {
              setLocation(company.location);
              setSameLocation(true);
            }}
          />
        </div>
        <div>
          <label htmlFor="no" className="mr-4">
            No, somewhere else
          </label>
          <input
            type="radio"
            name="location"
            value={selectedSuggestion}
            checked={location !== company.location}
            onChange={() => {
              setLocation(selectedSuggestion);
              setSameLocation(false);
            }}
          />
        </div>
      </div>
      {!sameLocation && (
        <div className="relative">
          <input
            type="text"
            value={selectedSuggestion}
            className="w-full border py-2 pl-8 outline-none my-5"
            placeholder="Enter property name or address..."
            onChange={handleInput}
            required
          />
          <CiLocationOn className="absolute top-8 left-2 text-xl font-bold" />
          {loading && <div className="absolute right-2 top-2">Loading...</div>}
          {noResults && !loading && (
            <div className="absolute right-2 top-2 text-red-500">
              No results found
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex items-center gap-4 justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 w-full"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!location}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

  useEffect(() => {
    const initialState = amenities.map((amenity) => ({
      name: amenity,
      checked: false,
    }));
    setSelectedAmenities(initialState);
  }, [amenities]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setSelectedAmenities((prevSelectedAmenities) =>
      prevSelectedAmenities.map((amenity) =>
        amenity.name === value ? { ...amenity, checked: checked } : amenity
      )
    );
  };

  const step4 = (
    <>
      <h2 className="text-2xl font-bold">
        What can guests use at your hotel ?
      </h2>
      <div className="flex gap-5">
        <div className="p-5 border mt-5 w-[652px]">
          {selectedAmenities &&
            selectedAmenities.map((item) => (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox w-6 h-6 text-slate-800 p-2 border border-gray-300 rounded-md mr-3"
                    value={item.name}
                    checked={item.checked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-lg">{item.name}</span>
                </div>
              </>
            ))}
        </div>
        <div className="flex gap-2 max-w-sm border p-5">
          <HiLightBulb className="text-4xl" />
          <div>
            <h3 className="font-semibold text-lg mb-4">
              This are the hotel amentities you choose at the time of
              registeration
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
              more facility
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap my-3">
        {amenities.length > 0 &&
          amenities.map((item, index) => {
            return (
              <span
                key={index}
                className="px-2 py-[2px] text-sm border rounded-sm flex items-center gap-1"
              >
                {item}
                <RiCloseLine
                  onClick={() => {
                    const filteredList = amenities.filter(
                      (data) => data != item
                    );
                    setAmenities(filteredList);
                  }}
                  className="cursor-pointer"
                />
              </span>
            );
          })}
      </div>
      {addFacility && (
        <>
          <div className="flex items-center h-10 gap-3 mt-4">
            <input
              type="text"
              className="w-full py-2 px-5 border ouline-none rounded-sm outline-none"
              placeholder="Add your hotel facilities vailable for this room"
              ref={amenityRef}
            />
            <button
              className="font-bold text-xl bg-gray-800 w-14 text-white rounded-md h-full"
              type="button"
              onClick={() => {
                setAmenities([...amenities, amenityRef.current.value]);
                amenityRef.current.value = "";
              }}
            >
              +
            </button>
          </div>
        </>
      )}
      <div className="flex items-center gap-4 justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 w-full"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!oneProperty && !multiplyProperty}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

  const step5 = (
    <>
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
        <h2 className="text-3xl font-bold">Tell us about parking situations</h2>
        <h3 className="font-semibold mt-4">Is parking space available?</h3>
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
      <div className="flex items-center gap-4 justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 w-full"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!oneProperty && !multiplyProperty}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

  const handlePhotoSelection = (event) => {
    const newPhotos = [...event.target.files]; // Convert to array
    setPhotos([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    const filteredPhotos = photos.filter((_, i) => i !== index);
    setPhotos(filteredPhotos);
  };

  const step6 = (
    <>
      <h2 className="text-3xl font-bold mb-5">Upload your rooms picture</h2>
      <div
        className="flex justify-center items-center h-52 rounded-lg border border-blue-300 my-3 cursor-pointer hover:bg-blue-100"
        onClick={() => photoRef.current.click()}
      >
        <RiUploadCloudLine className="text-blue-500 text-9xl" />
        <p className="text-center text-sm mt-4">Click here to upload photos</p>
      </div>

      <input
        type="file"
        ref={photoRef}
        multiple
        className="hidden"
        onChange={handlePhotoSelection}
      />

      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 px-2">
          {photos.map((item, index) => (
            <li
              key={index}
              className="flex items-center border rounded-md p-2 bg-gray-100"
            >
              <span className="text-sm mr-2">{item.name}</span>
              <RiCloseLine
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleRemovePhoto(index)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-4 justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 w-full"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!oneProperty && !multiplyProperty}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

  const token = localStorage.getItem("token");

  const [roomData, setRoomData] = useState({
    hotelOfThisType: oneProperty ? "Single" : "Multiple",
  });

  const step3 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        Room details
      </h2>
      <div className="py-5 px-3  my-4 max-w-md border bg-white shadow-md">
        <h3 className="font-semibold ">How many of this room do you have ?</h3>
        <input
          type="number"
          className="w-20 p-2 h-10 border outline-none rounded-lg mt-3"
          value={roomData.numberOfRoom}
          onChange={(e) =>
            setRoomData({ ...roomData, numberOfRoom: e.target.value })
          }
        />
        <h3 className="font-semi-bold my-4">Room name</h3>
        <input
          className="w-4/5 p-2 px-4 rounded-lg outline-none border"
          placeholder="(e.g) Deluxe Double Room wiith Extra bed"
          value={roomData.roomName}
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
        <p onClick={() => setMoreOption((prev) => !prev)} className="my-3">
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
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!oneProperty && !multiplyProperty}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

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
  const [value, setValue] = useState("");

  const step7 = (
    <>
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
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Next
        </button>
      </div>
    </>
  );

  const step8 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        Set the price per night for this room
      </h2>
      <div className="py-5 px-5  my-4 max-w-md border bg-white shadow-md">
        <h3 className="font-semibold ">
          How much do you want to charge per night ?
        </h3>
        <div>
          <label
            htmlFor="pricePerNight"
            className="mt-4 block text-sm"
          >
            Price guest pay
          </label>
          <div className="flex items-center mb-3">
            <span className="bg-slate-200 border py-2 px-3 rounded-l-md font-semibold">
              NGN
            </span>
            <input
              type="text"
              className="w-full border py-2 px-3 rounded-r-md outline-none"
              placeholder=""
              onChange={(e) =>
                setRoomData({ ...roomData, roomPricePerNight: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between mt-10">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 w-full"
          onClick={handlePrevStep}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          submit
        </button>
      </div>
    </>
  );

  if (!company) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError("");
    setLoading(true);

    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      // Upload photos to Firebase and get URLs
      const uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          const storageRef = ref(storage, "images/" + photo.name);
          const snapshot = await uploadBytes(storageRef, photo);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
        })
      );

      const dataToSend = {
        ...roomData,
        location,
        bedAvailable: [
          { type: "Full", count: fullBedNumber },
          { type: "Twin", count: twinBedNumber },
          { type: "Queen", count: queenBedNumber },
          { type: "King", count: kingBedNumber },
          { type: "Bunk", count: bunkBedNumber },
          { type: "Sofa", count: sofaBedNumber },
          { type: "Futon", count: futonBedNumber },
        ],
        roomFacility: selectedAmenities,
        childrenAllowed: childrenPolicy,
        petAllowed: petPolicy,
        parking: [{ parkingPaid, reservation, parkingAmount, parkingDay }],
        breakfast: {
          serve: breakfast,
          included: breakfastPaid,
        },
        description: value,
        numberOfGuest: numberOfGuestInRoom,
        isSmokingAllowed,
        roomPictures: uploadedPhotos,
      };
      const response = await fetch(
        "http://localhost:2024/api/room/create-room",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
          method: "POST",
        }
      );
      // if(response.error) {
      // }
      setError(response.message);
      console.log(response);
    } catch (e) {
      console.error("Error submitting form data:", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  const steps = [step1, step2, step3, step4, step5, step6, step7, step8];

  return (
    <div className="flex">
      <DashHeader />
      <SideBar />
      <form
        className="p-10 w-[768px] shadow-lg bg-white mx-auto"
        onSubmit={handleSubmit}
      >
        <span className="text-slate-400 block mb-5">
          Step {currentStep} of {steps.length}
        </span>
        {steps[currentStep - 1]}
      </form>
      {error && <span className={`text-red-400`}>{error}</span>}
    </div>
  );
}

export default UploadRooms;
