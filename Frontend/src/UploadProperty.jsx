import { CiLocationOn } from "react-icons/ci";
import Header from "./components/Header";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { RiAddLine, RiCloseLine, RiUploadCloudLine } from "react-icons/ri";
import { UserContext } from "./context/userContext";

function UploadProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userInfo } = useContext(UserContext);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    website: "",
  });
  const [detailedDescription, setDetailedDescription] = useState("");
  //   const [roomTypes, setRoomTypes] = useState([]);
  //   const [roomType, setRoomType] = useState("");
  //   const [roomDescription, setRoomDescription] = useState("");
  //   const [roomRate, setRoomRate] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState({
    checkIn: "",
    checkOut: "",
    cancellation: "",
    childPolicy: "",
    petPolicy: "",
  });
  const [photos, setPhotos] = useState([]);
  //   const [bookingInfo, setBookingInfo] = useState("");
  const [nearbyAttractions, setNearbyAttractions] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const amenitiesRef = useRef();
  const photoRef = useRef();

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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //   const handleAddRoomType = () => {
  //     if (roomType && roomDescription && roomRate) {
  //       setRoomTypes([
  //         ...roomTypes,
  //         { type: roomType, description: roomDescription, rate: roomRate },
  //       ]);
  //       setRoomType("");
  //       setRoomDescription("");
  //       setRoomRate("");
  //     }
  //   };

  const step1Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Where is your property located
      </h2>
      <p>
        Start with your property name, like Hilton Downtown Los Angeles. This
        will make it easier to find your address.
      </p>
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
          <ul className="absolute bg-white border w-full mt-1 max-h-60 overflow-y-auto">
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
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
        type="submit"
      >
        Next
      </button>
    </>
  );

  const step2Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Basic Information
      </h2>
      <input
        type="text"
        value={propertyName}
        onChange={(e) => setPropertyName(e.target.value)}
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter property name..."
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter hotel address..."
      />
      <input
        type="text"
        value={contactInfo.phone}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, phone: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter phone number..."
      />
      <input
        type="email"
        value={contactInfo.email}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, email: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter email..."
      />
      <input
        type="url"
        value={contactInfo.website}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, website: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter website URL..."
      />
      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );

  const step3Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Property Description
      </h2>
      <textarea
        value={detailedDescription}
        onChange={(e) => setDetailedDescription(e.target.value)}
        className="w-full border py-2 px-4 outline-none my-5 resize-none h-40"
        placeholder="Enter detailed description..."
      />
      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );

  //   const step4Content = (
  //     <>
  //       <h2 className="font-semibold text-2xl text-slate-900 mb-3">
  //         Room Information
  //       </h2>
  //       <input
  //         type="text"
  //         value={roomType}
  //         onChange={(e) => setRoomType(e.target.value)}
  //         className="w-full border py-2 px-4 outline-none my-5"
  //         placeholder="Enter room type..."
  //       />
  //       <textarea
  //         value={roomDescription}
  //         onChange={(e) => setRoomDescription(e.target.value)}
  //         className="w-full border py-2 px-4 outline-none my-5"
  //         placeholder="Enter room description..."
  //       />
  //       <input
  //         type="text"
  //         value={roomRate}
  //         onChange={(e) => setRoomRate(e.target.value)}
  //         className="w-full border py-2 px-4 outline-none my-5"
  //         placeholder="Enter room rate..."
  //       />
  //       <button
  //         className="bg-green-500 text-white py-2 w-full mb-2"
  //         onClick={handleAddRoomType}
  //       >
  //         Add Room Type
  //       </button>
  //       {roomTypes.length > 0 && (
  //         <ul className="w-full border py-2 px-4 outline-none my-5">
  //           {roomTypes.map((room, index) => (
  //             <li key={index} className="my-2">
  //               <strong>Type:</strong> {room.type}
  //               <br />
  //               <strong>Description:</strong> {room.description}
  //               <br></br>
  //               <strong>Rate:</strong> {room.rate}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //       <button
  //         className="bg-gray-300 text-black py-2 w-full mb-2"
  //         onClick={handlePrevStep}
  //       >
  //         Back
  //       </button>
  //       <button
  //         className="bg-blue text-white py-2 w-full"
  //         onClick={handleNextStep}
  //       >
  //         Next
  //       </button>
  //     </>
  //   );

  const step4Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Hotel Amenities and Policies
      </h2>
      <input
        type="text"
        value={policies.checkIn}
        onChange={(e) => setPolicies({ ...policies, checkIn: e.target.value })}
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter check-in time..."
      />
      <input
        type="text"
        value={policies.checkOut}
        onChange={(e) => setPolicies({ ...policies, checkOut: e.target.value })}
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter check-out time..."
      />
      <input
        type="text"
        value={policies.cancellation}
        onChange={(e) =>
          setPolicies({ ...policies, cancellation: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter cancellation policy..."
      />
      <input
        type="text"
        value={policies.childPolicy}
        onChange={(e) =>
          setPolicies({ ...policies, childPolicy: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter child policy..."
      />
      <input
        type="text"
        value={policies.petPolicy}
        onChange={(e) =>
          setPolicies({ ...policies, petPolicy: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter pet policy..."
      />
      <div className="flex items-center gap-3 flex-wrap">
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
      <div className="flex items-center gap-5">
        <input
          type="text"
          ref={amenitiesRef}
          className="w-full border py-2 px-4 outline-none my-5"
          placeholder="Enter hotel amenities..."
        />
        <RiAddLine
          className="text-3xl text-blue font-bold rounded-md cursor-pointer"
          onClick={() => {
            setAmenities([...amenities, amenitiesRef.current.value]);
            amenitiesRef.current.value = "";
          }}
        />
      </div>
      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
      >
        Next
      </button>
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

  const step5Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Give us a picture of your hotel or property
      </h2>

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

      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
      >
        Next
      </button>
    </>
  );

  //   const step6Content = (
  //     <>
  //       <h2 className="font-semibold text-2xl text-slate-900 mb-3">
  //         Booking Information
  //       </h2>
  //       <input
  //         type="text"
  //         value={bookingInfo}
  //         onChange={(e) => setBookingInfo(e.target.value)}
  //         className="w-full border py-2 px-4 outline-none my-5"
  //         placeholder="Enter booking information..."
  //       />
  //       <button
  //         className="bg-gray-300 text-black py-2 w-full mb-2"
  //         onClick={handlePrevStep}
  //       >
  //         Back
  //       </button>
  //       <button
  //         className="bg-blue text-white py-2 w-full"
  //         onClick={handleNextStep}
  //       >
  //         Next
  //       </button>
  //     </>
  //   );

  const step6Content = (
    <>
      <h2 className="font-semibold text-2xl text-slate-900 mb-3">
        Nearby Attractions and Social Media
      </h2>
      <input
        type="text"
        value={nearbyAttractions}
        onChange={(e) => setNearbyAttractions(e.target.value)}
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter nearby attractions..."
      />
      <input
        type="url"
        value={socialMedia.facebook}
        onChange={(e) =>
          setSocialMedia({ ...socialMedia, facebook: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter Facebook URL..."
      />
      <input
        type="url"
        value={socialMedia.instagram}
        onChange={(e) =>
          setSocialMedia({ ...socialMedia, instagram: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter Instagram URL..."
      />
      <input
        type="url"
        value={socialMedia.twitter}
        onChange={(e) =>
          setSocialMedia({ ...socialMedia, twitter: e.target.value })
        }
        className="w-full border py-2 px-4 outline-none my-5"
        placeholder="Enter Twitter URL..."
      />
      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      {/* <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
      >
        Next
      </button> */}
    </>
  );

  const steps = [
    step1Content,
    step2Content,
    step3Content,
    step4Content,
    step5Content,
    step6Content,
  ];

  return (
    <>
      <Header user={userInfo} />
      <main className="p-16 flex justify-center items-center min-h-screen">
        <form
          className={`p-5 shadow-md w-full ${
            currentStep > 1 ? "max-w-[700px]" : "max-w-[500px]"
          }`}
        >
          <span className="text-slate-400">
            Step {currentStep} of {steps.length}
          </span>
          {steps[currentStep - 1]}
        </form>
      </main>
    </>
  );
}

export default UploadProperty;
