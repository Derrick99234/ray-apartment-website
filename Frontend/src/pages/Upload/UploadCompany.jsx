import { CiLocationOn } from "react-icons/ci";
import Header from "../../components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { RiCloseLine, RiUploadCloudLine } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig";

function UploadCompany() {
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    website: "",
  });
  const [detailedDescription, setDetailedDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState({
    checkIn: "",
    checkOut: "",
    cancellation: "",
    childPolicy: "",
    petPolicy: "",
  });

  const [photos, setPhotos] = useState([]);
  const [nearbyAttractions, setNearbyAttractions] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(null);

  const amenitiesRef = useRef();
  const photoRef = useRef();

  const API_KEY = "86dd5eb3f5f44a0899e450a627f3d2e3";

  const handleInput = async (e) => {
    const query = e.target.value;
    setSelectedSuggestion(query);

    if (query.length > 1) {
      try {
        const response = await axios.get(
          "https://api.geoapify.com/v1/geocode/search",
          {
            params: {
              text: query,
              apiKey: API_KEY,
              limit: 20,
            },
          }
        );

        if (response.data.features.length > 0) {
          setSuggestions(response.data.features);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setSelectedSuggestion(suggestion.properties.formatted);
    setAddress(suggestion.properties.formatted);
    setSuggestions([]);
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
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.properties.place_id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
        type="button"
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
        type="button"
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
        type="button"
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
        type="button"
      >
        Back
      </button>
      <button
        className="bg-blue text-white py-2 w-full"
        onClick={handleNextStep}
        type="button"
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
      <div className="relative">
        <label
          className="absolute top-7 right-5 text-base font-bold"
          htmlFor="checkIn"
        >
          CHECK IN TIME
        </label>
        <input
          type="time"
          value={policies.checkIn}
          onChange={(e) =>
            setPolicies({ ...policies, checkIn: e.target.value })
          }
          className="w-full border py-2 px-4 outline-none my-5"
          placeholder="Enter check-in time..."
        />
      </div>
      <div className="relative">
        <label
          className="absolute top-7 right-5 text-base font-bold"
          htmlFor="checkOut"
        >
          CHECK OUT TIME
        </label>
        <input
          type="time"
          value={policies.checkOut}
          onChange={(e) =>
            setPolicies({ ...policies, checkOut: e.target.value })
          }
          className="w-full border py-2 px-4 outline-none my-5"
          placeholder="Enter check-out time..."
        />
      </div>
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
                {item.name}
                <RiCloseLine
                  onClick={() => {
                    const filteredList = amenities.filter(
                      (data) => data.name != item.name
                    );
                    setAmenities(filteredList);
                  }}
                  className="cursor-pointer"
                />
              </span>
            );
          })}
      </div>
      <div>
        <label htmlFor="" className="mt-5 block mb-1 text-[1rem]">
          Select the facilities you want to offer in your room or property.
        </label>
        <div className="flex items-center gap-5 mb-5">
          <input
            type="text"
            ref={amenitiesRef}
            className="w-full border py-2 px-4 outline-none"
            placeholder="resturants..spa..free wifi..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setAmenities([
                  ...amenities,
                  { name: amenitiesRef.current.value, checked: false },
                ]);
                amenitiesRef.current.value = "";
              }
            }}
          />
          <div
            className="text-lg px-5 py-2 text-white bg-blue font-bold rounded-md cursor-pointer"
            onClick={() => {
              setAmenities([
                ...amenities,
                { name: amenitiesRef.current.value.trim(), checked: false },
              ]);
              amenitiesRef.current.value = "";
            }}
          >
            ADD
          </div>
        </div>
      </div>
      <button
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
        type="button"
      >
        Back
      </button>
      <button
        type="button"
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
        type="button"
        className="bg-gray-300 text-black py-2 w-full mb-2"
        onClick={handlePrevStep}
      >
        Back
      </button>
      <button
        type="button"
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

  const token = localStorage.getItem("token");

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

      // Create an object with the form data
      const companyData = {
        location: address,
        companyName: propertyName,
        tel: contactInfo.phone,
        email: contactInfo.email,
        websiteURL: contactInfo.website,
        description: detailedDescription,
        checkInTime: policies.checkIn,
        checkOutTime: policies.checkOut,
        cancellationPolicy: policies.cancellation,
        childPolicy: policies.childPolicy,
        petPolicy: policies.petPolicy,
        hotelAmenities: amenities,
        hotelPictureURLs: uploadedPhotos,
        nearByAttractions: nearbyAttractions,
        facebookURL: socialMedia.facebook,
        twitterURL: socialMedia.twitter,
        instaURL: socialMedia.instagram,
      };

      // Send form data to the backend
      const response = await fetch(
        "https://ray-apartment-website.onrender.com/api/company/create-page",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(companyData),
          method: "POST",
        }
      );

      const result = await response.json();

      if (result === "Unauthorized") {
        localStorage.removeItem("token");
        navigate("/login");
      }

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        setError("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await fetch(
          "https://ray-apartment-website.onrender.com/api/user/get_user",
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!data.error) {
          setUserInfo(data.user);
          console.log(data.user);
        }
      } catch (e) {
        console.log(e);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserDetail();
  }, [token, navigate, setUserInfo]);

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
        type="button"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue text-white py-2 w-full"
      >
        submit
      </button>
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
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="text-slate-400">
            Step {currentStep} of {steps.length}
          </span>
          {steps[currentStep - 1]}
          {error && <span className="text-red-500 mt-5">{error}</span>}
        </form>
      </main>
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/20">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default UploadCompany;
