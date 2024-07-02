/* eslint-disable react/prop-types */
import { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function EnlistHotelPopUp({ onClose }) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="bg-black/70 h-screen fixed w-full top-0 left-0 bottom-0 z-[100]">
      <div className="bg-white h-[90vh] flex justify-end absolute bottom-0 w-full left-0 right-0 rounded-t-3xl overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2020/05/09/09/13/house-5148865_640.jpg"
          className="w-1/2 h-[800px] rounded-3xl absolute top-[0] left-[0] object-fill"
          alt=""
        />
        <div className=" w-1/2 p-10">
          <h2 className="text-2xl font-bold ">RAY APARTMENT</h2>
          <p className="text-base my-3">
            For over 25 years, we’ve learned what travelers seek, what makes
            properties attractive, and how to bring the two together. Discover
            how this helps you.
          </p>
          <div className="p-5 border-l-4 border-blue my-8 bg-blue/10">
            <h3 className="text-xl font-semibold mb-3">
              Explore the benefits of working with us
            </h3>
            <p className="text-base">
              Reach the guests you want, those who truly value your property,
              with RAY APARTMENT. Signing up now and partner with RAY APARTMENT,
              It&apos;s is free, fast, and easy.
            </p>
          </div>

          <h2 className="text-xl font-semibold my-3">Ready to get started?</h2>
          <p className="text-base">
            Join us today and unlock access to high-value guests.
          </p>

          <button
            className="bg-blue py-2 px-5 text-white text-base mt-2"
            onClick={() => {
              if (userInfo && userInfo._id) {
                return navigate(`/upload/v2/${userInfo._id}`);
              } else {
                return navigate(`/login`);
              }
            }}
          >
            List your property now
          </button>
        </div>
      </div>
      <RiCloseLine
        className="absolute top-20 right-10 text-3xl font-bold cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}

export default EnlistHotelPopUp;
