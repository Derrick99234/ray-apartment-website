/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

function Toast({ showToastMsg, setShowToastMsg }) {
  useEffect(() => {
    if (showToastMsg.isShown) {
      const handleToastClose = () => {
        setShowToastMsg({ isShown: false, message: "" });
      };
      const timeOutID = setTimeout(() => {
        handleToastClose();
      }, 5000);

      return () => clearTimeout(timeOutID);
    }
  }, [showToastMsg, setShowToastMsg]);

  return (
    <div
      className={`z-[1000] absolute top-10 right-6 transition-all duration-400 ${
        showToastMsg.isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          showToastMsg.type === "error"
            ? "after:bg-red-500"
            : "after:bg-green-500"
        } after:absolute after:top-0 after:left-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full ${
              showToastMsg.type === "error" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {showToastMsg.type === "error" ? (
              <MdOutlineReportGmailerrorred className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{showToastMsg.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
