import React from "react";
import assets from "../assets/assets";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-24
      bg-gradient-to-br
      from-emerald-50
      via-lime-50
      to-sky-100
      dark:from-[#081C15]
      dark:via-[#1B4332]
      dark:to-[#0F172A]
      py-20 px-4 sm:px-12 lg:px-24 xl:px-40"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-yellow-300/30 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-300/30 rounded-full blur-[120px]"></div>

      <div className="absolute top-20 right-0 w-80 h-80 bg-sky-300/30 rounded-full blur-[120px]"></div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-green-200 dark:border-green-700 rounded-full px-2 py-2 pr-5 shadow-lg hover:scale-105 transition duration-300">

          <img
            src={assets.people}
            alt="People"
            className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
          />

          <p className="text-sm font-semibold text-green-700 dark:text-green-300">
            Trusted by 10,000+ Farmers 🚜
          </p>

        </div>

        {/* Heading */}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 dark:text-white max-w-5xl">

          Book Tractor Rides

          <span className="block mt-2 bg-gradient-to-r from-green-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">

            Instantly for Your Farm

          </span>

        </h1>

        {/* Description */}

        <p className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg leading-8">

          Making farming easier with fast, affordable and reliable tractor
          booking services. Find verified tractor owners near you in just a few
          clicks.

        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 mt-3">

          <a
            href="#contact"
            className="px-8 py-3 rounded-full
            bg-gradient-to-r from-green-500 to-emerald-600
            text-white font-semibold
            hover:scale-105 hover:shadow-xl
            transition-all duration-300"
          >
            Book Now 🚜
          </a>

          <a
            href="#services"
            className="px-8 py-3 rounded-full
            bg-white/80 dark:bg-white/10
            border border-green-300 dark:border-green-700
            backdrop-blur-xl
            hover:bg-green-50 dark:hover:bg-green-900/20
            transition"
          >
            Explore Services
          </a>

        </div>

        {/* Tractor Image */}

        <div className="relative mt-12">

          <img
            src={assets.tractor1}
            alt="Tractor"
            className="w-full max-w-5xl hover:scale-105 transition duration-500"
          />

          {/* Plant Left */}

          <img
            src={assets.plant}
            alt=""
            className="absolute -left-12 bottom-0 w-28 hidden lg:block animate-bounce"
          />

          {/* Plant Right */}

          <img
            src={assets.plant2}
            alt=""
            className="absolute -right-12 top-0 w-28 hidden lg:block animate-pulse"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;