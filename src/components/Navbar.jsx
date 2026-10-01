import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#1B4332]/90 border-b border-gray-200 dark:border-gray-700">

      {/* Logo */}
      <a href="#home">
        <img
          src={assets.newlogo1}
          alt="TractorRide AI"
          className="w-32 sm:w-36"
        />
      </a>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-10 text-[15px] font-semibold">

        <a
          href="#home"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Home
        </a>

        <a
          href="#services"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Services
        </a>

        <a
          href="#why-choose"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Why Choose
        </a>

        <a
          href="#developer"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Developers
        </a>

        <a
          href="#contact"
          className="hover:text-green-600 dark:hover:text-green-400 transition"
        >
          Contact
        </a>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <ThemeToggleBtn
          theme={theme}
          setTheme={setTheme}
        />

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-300"
        >
          Login

          <img
            src={assets.arrow}
            alt=""
            className="w-3.5 h-3.5 invert"
          />
        </Link>

        {/* Mobile Menu */}
        <img
          src={assets.list}
          alt="Menu"
          onClick={() => setSidebarOpen(true)}
          className="w-7 sm:hidden cursor-pointer"
        />

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-[#1B4332] text-white z-50 flex flex-col pt-16 pl-8 gap-7 transition-transform duration-300 sm:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <img
          src={assets.cross}
          alt="Close"
          onClick={() => setSidebarOpen(false)}
          className="w-4 absolute top-5 right-5 cursor-pointer invert"
        />

        <a href="#home" onClick={() => setSidebarOpen(false)}>
          Home
        </a>

        <a href="#services" onClick={() => setSidebarOpen(false)}>
          Services
        </a>

        <a href="#why-choose" onClick={() => setSidebarOpen(false)}>
          Why Choose
        </a>

        <a href="#developer" onClick={() => setSidebarOpen(false)}>
          Developers
        </a>

        <a href="#contact" onClick={() => setSidebarOpen(false)}>
          Contact
        </a>

        {/* Mobile Login */}
        <Link
          to="/login"
          onClick={() => setSidebarOpen(false)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 rounded-full w-fit"
        >
          Login
        </Link>

      </div>

    </div>
  );
};

export default Navbar;