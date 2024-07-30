import logo from "../assets/white stacked.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="p-5 py-8 max-[768px]:px-10 bg-black flex items-center gap-4 flex-col text-white">
        <div className="grid grid-cols-5 max-[768px]:grid-cols-2 max-[430px]:grid-cols-1 gap-10 w-full">
          <img src={logo} alt="" className="w-64" />
          <div className="flex flex-col gap-3 min-w-[250px]">
            <h2 className="font-semibold text-2xl">Company</h2>
            <Link>About Us</Link>
            <Link>Privacy Policy</Link>
            <Link>Term of service</Link>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px]">
            <h2 className="font-semibold text-2xl">Communities</h2>
            <Link>Twitter</Link>
            <Link>Instagram</Link>
            <Link>Facebook</Link>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px]">
            <h2 className="font-semibold text-2xl">Top Destination</h2>
            <Link>Abuja</Link>
            <Link>Lagos</Link>
            <Link>LA</Link>
          </div>
          <div className="flex flex-col gap-3 min-w-[250px]">
            <h2 className="font-semibold text-2xl">Top Hotels</h2>
            <Link>Deritech Hotel</Link>
            <Link>YJ Homes</Link>
            <Link>ChitraResort</Link>
          </div>
        </div>
        <hr className="bg-white h-[2px] mt-3 w-full" />
        <p className="flex items-center gap-4">
          <span>
            Copyright © 2024 Hotel Booking Limited All Rights Reserved
          </span>
          <FaXTwitter className="text-white" />
          <FaInstagram className="text-white" />
          <FaFacebook className="text-white" />
        </p>
      </footer>
    </>
  );
}

export default Footer;
