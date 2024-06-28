import { RiCloseLine } from "react-icons/ri";
import Header from "../../components/Header";
import { CiFilter } from "react-icons/ci";
import HotelPostCard from "../../components/HotelPostCard";

function LandingPage() {
  return (
    <>
      <Header />
      <main className="p-16 pt-20">
        <div className="flex justify-between items-center ">
          <div className="flex justify-between items-center gap-3">
            <span className="flex justify-between items-center px-2 gap-2 py-1 rounded-md border text-sm">
              royal <RiCloseLine />
            </span>
          </div>
          <div className="border py-[2px] px-5 rounded-lg flex items-center gap-2">
            Filter <CiFilter />
          </div>
        </div>
        <p className="font-bold text-2xl mt-8">Result: 207 hotels found</p>
        <div className="grid grid-cols-4 gap-5 mt-10 ">
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
          <HotelPostCard
            img="https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_640.jpg"
            roomAvailable={2}
            person="3"
            hotelType="Royal room"
            price="4000"
            night="4"
          />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
