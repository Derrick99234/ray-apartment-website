import SideBar from "../../components/sideBar";

function UploadRooms() {
  return (
    <div className="flex">
      <SideBar />
      <form className="p-10 w-[768px] shadow-lg bg-white">
        <h2 className="bg-gray-900 py-2 px-4 text-white font-semibold">
          MAKE YOUR PROPERTY VISIBLE BY UPLOADING THEM
        </h2>
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
      </form>
    </div>
  );
}

export default UploadRooms;
