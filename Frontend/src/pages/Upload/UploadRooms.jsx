import { useContext, useRef, useState } from "react";
import axios from "axios";
import DashHeader from "../../components/DashHeader";
import SideBar from "../../components/sideBar";
import { HiCheckCircle, HiLightBulb } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { CompanyContext } from "../../context/companyContext";
import { LuBedSingle, LuBedDouble, LuSofa } from "react-icons/lu";
import { GiBunkBeds } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";

function UploadRooms() {
  const [currentStep, setCurrentStep] = useState(1);
  const [oneProperty, setOneProperty] = useState(false);
  const [multiplyProperty, setMultiplyProperty] = useState(false);
  const [numberOfProperty, setNumberOfProperties] = useState(2);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sameLocation, setSameLocation] = useState(true);
  const [error, setError] = useState("");

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

  const amenityRef = useRef();

  const [moreOption, setMoreOption] = useState(false);
  const { company } = useContext(CompanyContext);

  const [amenities, setAmenities] = useState([...company.hotelAmenities]);

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
          Multiple hotel with with one or multiple rooms that guests can book
          <HiCheckCircle className="text-2xl absolute bottom-3 right-3" />
        </div>
      </div>
      {multiplyProperty && (
        <>
          <div>
            <label htmlFor="">Number of properties</label>
            <input
              type="number"
              value={numberOfProperty}
              onChange={(e) => {
                if (numberOfProperty < 2) {
                  setError("can not be less than 2");
                } else {
                  setError("");
                }
                setNumberOfProperties(e.target.value);
              }}
              className="block mt-2 w-20 p-2 h-10 border outline-none rounded-lg"
            />
          </div>
        </>
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
    setAddress(suggestion.display_name);
    setSuggestions([]);
    setNoResults(false);
  };

  const step2 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        MAKE YOUR PROPERTY VISIBLE BY UPLOADING THEM
      </h2>
      <h3 className="text-xl mt-3">
        is it located at {company.location} your property location?
      </h3>
      <div className="my-5">
        <div>
          <label htmlFor="yes" className="mr-4">
            Yes
          </label>
          <input
            type="radio"
            name="location"
            id=""
            checked={sameLocation}
            onChange={() => {
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
            id=""
            onChange={() => {
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
          disabled={!oneProperty && !multiplyProperty}
          className="bg-slate-700 hover:bg-slate-800 text-white py-2 w-full disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );

  const step3 = (
    <>
      <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
        Room details
      </h2>
      <div className="py-5 px-3  my-4 max-w-md border bg-white shadow-md">
        <h3 className="font-semibold ">How many of this room do you have ?</h3>
        <input
          type="number"
          name=""
          id=""
          className="w-20 p-2 h-10 border outline-none rounded-lg mt-3"
        />
        <h3 className="font-semi-bold my-4">Room name</h3>
        <input
          className="w-4/5 p-2 px-4 rounded-lg outline-none border"
          placeholder="(e.g) Deluxe Double Room wiith Extra bed"
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
            onClick={() => setTwinBedNumber((prev) => prev - 1)}
          >
            -
          </div>
          <div className="p-4 py-2">{twinBedNumber}</div>
          <div
            className="p-4 hover:bg-gray-600 py-2 font-semibold hover:text-white text-xl cursor-pointer"
            onClick={() => setTwinBedNumber((prev) => prev + 1)}
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
            <input type="radio" name="smoking" id="" />
          </div>
          <div>
            <label htmlFor="no" className="mr-4">
              No
            </label>
            <input type="radio" name="smoking" id="" checked />
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

  const step4 = (
    <>
      <h2 className="text-2xl font-bold">
        What can guests use at your hotel ?
      </h2>
      <div className="flex gap-5">
        <div className="p-5 border mt-5 w-[652px]">
          {amenities &&
            amenities.map((item) => (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox w-6 h-6 text-slate-800 p-2 border border-gray-300 rounded-md mr-3"
                  />
                  <span className="text-lg">{item}</span>
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
                className="text-blue"
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

  const steps = [step1, step2, step3, step4];

  return (
    <div className="flex">
      <DashHeader />
      <SideBar />
      <form className="p-10 w-[768px] shadow-lg bg-white mx-auto">
        {steps[currentStep - 1]}
      </form>
    </div>
  );
}

export default UploadRooms;

/* 
  <label
          htmlFor="roomeNamme"
          className="font-semibold text-xl mt-8 mb-3 block"
        >
          Room Type
        </label>
        <input
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          className="w-full py-3 px-4 rounded-sm mb-5 border outline-none"
        />
        <label
          htmlFor="roomeNamme"
          className="font-semibold text-xl mt-8 mb-3 block"
        >
          Room Type
        </label>
        <input
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          className="w-full py-3 px-4 rounded-sm mb-5 border outline-none"
        />
        <label
          htmlFor="roomeNamme"
          className="font-semibold text-xl mt-8 mb-3 block"
        >
          Room Type
        </label>
        <input
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          className="w-full py-3 px-4 rounded-sm mb-5 border outline-none"
        />
*/
