import { Link } from 'lucide-react';
import { FaEnvelope, FaChevronDown, FaPhoneAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function Breadcrum() {
  return (
    <div className="bg-[#7E33E0] w-full">
      {/* Grid layout for desktop/tablet, flex for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2 px-4 items-center">

        {/* Left section: Contact Info (Email, Phone) - Hidden on mobile */}
        <div className="text-white flex justify-start gap-4 sm:block">
          <div className="flex gap-2 items-center text-xs sm:text-sm md:text-base">
            <FaEnvelope />
            mhhasanul@gmail.com
          </div>
          <div className="flex gap-2 items-center text-xs sm:text-sm md:text-base">
            <FaPhoneAlt />
            0348292222
          </div>
        </div>

        {/* Right section: Language, Currency, Login & Icons */}
        <div className="flex justify-between sm:justify-end gap-4 items-center text-white text-xs sm:text-sm md:text-base w-full">

          {/* Language Selector */}
          <p className="flex gap-2 py-2 px-4 cursor-pointer">
            English <FaChevronDown />
          </p>

          {/* Currency Selector */}
          <p className="flex gap-2 py-2 px-4 cursor-pointer">
            USD <FaChevronDown />
          </p>

          {/* Login Link */}
          <a href="/login" className="flex gap-2 text-white py-2 px-4 cursor-pointer">
            Login
          </a>

          {/* Icons (Heart & Cart) */}
          <div className="flex gap-4 justify-center sm:justify-start items-center text-white">
            <FaHeart className="text-white text-xl cursor-pointer" />
           <a href='/pages/cart'>
           <FaShoppingCart className="text-white text-xl cursor-pointer"/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
