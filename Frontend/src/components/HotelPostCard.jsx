/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from "react-icons/hi";
function HotelPostCard({ hotelType, img, roomAvailable, location }) {
  return (
    <div className="shadow-md rounded-md w-[320px] overflow-hidden pb-4 cursor-pointer">
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
        <span>{location}</span>
      </div>
      <p className="mx-4">Fast filling: {roomAvailable} Room Available</p>
    </div>
  );
}

export default HotelPostCard;
