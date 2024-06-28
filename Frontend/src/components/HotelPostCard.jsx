/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from "react-icons/hi";
function HotelPostCard({
  hotelType,
  img,
  price,
  roomAvailable,
  night,
  person,
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md w-[280px]">
      <img
        src={img}
        alt="hotel image"
        className="w-full h-[190px] object-cover"
      />
      <div className="flex justify-between items-center p-2">
        <h2>{hotelType}</h2>
        <HiOutlineLocationMarker />
      </div>
      <div className="p-1 flex flex-col gap-2">
        <strong>${price}</strong>
        <span>
          {night} Night, {person} Person
        </span>
      </div>
      <p>Fast filling: {roomAvailable} Room Available</p>
    </div>
  );
}

export default HotelPostCard;
