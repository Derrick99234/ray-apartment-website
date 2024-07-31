import { useContext, useState } from "react";
import SideBar from "../../components/sideBar";
import { CompanyContext } from "../../context/companyContext";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";

function CompanyProfile() {
  const { company } = useContext(CompanyContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? company.hotelPictureURLs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === company.hotelPictureURLs.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <>
      <SideBar />
      <main className="pl-[250px] p-4">
        <div className="flex items-center justify-center flex-col">
          <div className="relative">
            {company.hotelPictureURLs.length > 1 && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={handlePrev}
              >
                <HiChevronLeft size={30} />
              </button>
            )}
            <div className="flex overflow-hidden">
              {company &&
                company.hotelPictureURLs &&
                company.hotelPictureURLs.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    className={`h-[70vh] w-full flex-shrink-0 transition-transform duration-300 ${
                      index === currentIndex ? "block" : "hidden"
                    }`}
                  />
                ))}
            </div>
            {company.hotelPictureURLs.length > 1 && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={handleNext}
              >
                <HiChevronRight size={30} />
              </button>
            )}
            <FiEdit2 className="text-4xl bg-white  p-2 absolute bottom-3 -right-0 rounded-full" />
          </div>
          <h2 className="font-semibold text-2xl my-3">
            {company && company.companyName}
          </h2>
          <p className="flex items-center justify-center gap-2">
            <HiOutlineLocationMarker />
            {company && company.location}
          </p>
          <div className="flex justify-between items-start gap-5 mt-6 flex-wrap max-w-[95%]">
            <div className="p-4 bg-white shadow-lg grid grid-cols-[150px,300px] gap-4 rounded-md">
              <span className="font-semibold">Email:</span>
              <p className="font-sm text-gray-500">
                {company && company.email}
              </p>
              <span className="font-semibold">Phone:</span>
              <p className="font-sm text-gray-500">{company && company.tel}</p>
              <span className="font-semibold">Website:</span>
              <p className="font-sm text-gray-500">
                {company && company.websiteURL}
              </p>
              <span className="font-semibold">Near by Attraction:</span>
              <p className="font-sm text-gray-500">
                {company && company.nearByAttractions}
              </p>
            </div>
            <div className="p-4 bg-white shadow-lg grid grid-cols-[150px,300px] gap-4 rounded-md">
              <span className="font-semibold">Description:</span>
              <p className="font-sm text-gray-500">
                {company && company.description}
              </p>
              <span className="font-semibold">Chech in Time:</span>
              <p className="font-sm text-gray-500">
                {company && company.checkInTime}
              </p>
              <span className="font-semibold">Check out Time:</span>
              <p className="font-sm text-gray-500">
                {company && company.checkOutTime}
              </p>
            </div>
            <div className="p-4 bg-white shadow-lg grid grid-cols-[150px,300px] gap-4 rounded-md">
              <span className="font-semibold">Cancellation Policy:</span>
              <p className="font-sm text-gray-500">
                {company && company.cancellationPolicy}
              </p>
              <span className="font-semibold">Childs Policy</span>
              <p className="font-sm text-gray-500">
                {company && company.childPolicy}
              </p>
              <span className="font-semibold">Pet Policy:</span>
              <p className="font-sm text-gray-500">
                {company && company.petPolicy}
              </p>
              <span className="font-semibold">Email:</span>
              <p className="font-sm text-gray-500">
                {company && company.email}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CompanyProfile;
