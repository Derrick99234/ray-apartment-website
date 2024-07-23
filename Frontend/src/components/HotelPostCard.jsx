/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

function HotelPostCard({ hotelType, img, roomAvailable, location, id }) {
  const navigate = useNavigate();

  const address = useReverseGeocoding(location[0], location[1]);

  // const getAddressFromCoordinates = async (lat, lon) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
  //     );
  //     console.log(response.data);
  //     if (
  //       response.data &&
  //       response.data.features &&
  //       response.data.features.length > 0
  //     ) {
  //       return (
  //         response.data.features[0].properties.city +
  //         " " +
  //         response.data.features[0].properties.state
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching address data", error);
  //   }
  //   return "Unknown location";
  // };

  // const [address, setAddress] = useState("");

  // useEffect(() => {
  //   const fetchAddress = async () => {
  //     if (Array.isArray(location) && location.length === 2) {
  //       const [lat, lon] = location;
  //       const fetchedAddress = await getAddressFromCoordinates(lat, lon);
  //       setAddress(fetchedAddress);
  //     }
  //   };
  //   fetchAddress();
  // }, [location]);

  const handleClick = () => {
    navigate(`room-detail/hotel/${hotelType}/${id}`);
  };

  return (
    <div
      className="shadow-md rounded-md w-[320px] overflow-hidden pb-4 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={img}
        alt="hotel image"
        className="w-full h-[190px] object-cover hover:scale-x-110 transition-transform duration-500 hover:mix-blend-multiply hover:bg-black"
      />
      <div className="flex justify-between items-center mx-4">
        <h2 className="font-semibold text-2xl text-black/90">{hotelType}</h2>
      </div>
      <div className="flex gap-2 items-center mx-4 my-2">
        <HiOutlineLocationMarker />
        <span>{address[0]}</span>
      </div>
      <p className="mx-4">Fast filling: {roomAvailable} Room Available</p>
    </div>
  );
}

export default HotelPostCard;
