'use client';
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import SearchBar from "./search";

export default function NavBar() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false); // Close the menu
  };

  return (
    <div className="flex justify-between items-center text-black bg-white px-4 py-2">
      
      {/* Hamburger Menu for Devices Smaller than Tablet */}
      <div className="flex md:hidden items-center">
        <button onClick={toggleMenu} className="text-black">
          <FaBars/>
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center px-2">
        <b className="text-[#0D0E43] text-lg sm:text-2xl 2xl:text-4xl">Hekto</b>
      </div>

      {/* Desktop Navigation Links (visible for tablets and larger screens) */}
      <div className="hidden md:flex gap-4 px-2 text-lg sm:text-xl 2xl:text-4xl">
        <Link href="/pages/home" className="px-2">Home</Link>
        <Link href="/pages/products" className="px-2">Products</Link>
        <Link href="/pages/blog" className="px-2">Blog</Link>
        <Link href="/pages/about" className="px-2">Shop</Link>
        <Link href="/pages/contact" className="px-2">Contact</Link>
        <Link href="/pages/faq" className="px-2">Faqs</Link>
      </div>

      {/* Desktop Search Bar (visible for tablets and larger screens) */}
      <div className="hidden sm:flex items-center border shadow-black rounded-md p-1 w-1/2 sm:w-3/4 2xl:text-2xl 2xl:w-[660px] md:w-[55px] lg:w-auto">
        <SearchBar closeMenu={closeMenu} />
      </div>

      {/* Mobile to Tablet Dropdown Menu (visible when hamburger is toggled) */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg ${menu ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link href="/pages/home" className="px-2" onClick={() => setMenu(false)}>Home</Link>
          <Link href="/pages/faq" className="px-2" onClick={() => setMenu(false)}>Faqs</Link>
          <Link href="/pages/product" className="px-2" onClick={() => setMenu(false)}>Products</Link>
          <Link href="/pages/blog" className="px-2" onClick={() => setMenu(false)}>Blog</Link>
          <Link href="/pages/aboutus" className="px-2" onClick={() => setMenu(false)}>Shop</Link>
          <Link href="/pages/contactus" className="px-2" onClick={() => setMenu(false)}>Contact</Link>

          {/* Mobile Search Bar */}
          <SearchBar closeMenu={closeMenu} />
        </div>
      </div>
    </div>
  );
}
