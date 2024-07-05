import { HiUserGroup } from "react-icons/hi";

function DashHeader() {
  return (
    <div className="py-3 pl-4 pr-8 rounded-full shadow-2xl absolute top-5 right-5 bg-slate-100 flex items-center gap-3">
      <HiUserGroup className="font-semibold text-2xl" /> <span>Profile</span>
    </div>
  );
}

export default DashHeader;
