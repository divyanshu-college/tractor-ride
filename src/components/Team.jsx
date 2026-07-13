import React from "react";
import Tittle from "./Tittle";
import assets from "../assets/assets";

const Team = () => {
  return (
    <section
      id="developer"
      className=" scroll-mt-24 w-full py-16 px-4 sm:px-8 lg:px-16 bg-transparent"
    >
      <div
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[40px]
        bg-gradient-to-br
        from-[#F8FFF7]
        via-[#F6FBFF]
        to-[#EEF8FF]
        dark:from-[#0B1220]
        dark:via-[#111827]
        dark:to-[#0F172A]
        px-6 sm:px-10 lg:px-16 py-14"
      >
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-green-300/20 blur-3xl"></div>

        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl"></div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-300/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">

          <Tittle
            tittle="Meet the Developer"
            description="The passionate developer behind TractorRide AI, building smart technology to make farming easier and more connected."
          />

          <div className="mt-10">

            <div
              className="group w-[340px] rounded-3xl
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
              border border-white/40 dark:border-white/10
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all duration-500
              p-8"
            >
              <img
                src={assets.profile}
                alt="Divyanshu Pandey"
                className="w-36 h-36 mx-auto rounded-full object-cover border-4 border-green-500"
              />

              <h2 className="mt-6 text-center text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                Divyanshu Pandey
              </h2>

              <p className="mt-2 text-center text-green-600 dark:text-green-400 font-semibold">
                Full Stack Developer
              </p>

              <p className="mt-5 text-center text-gray-600 dark:text-gray-300 leading-7">
                Passionate about building AI-powered web applications and modern
                digital solutions that help farmers connect with trusted tractor
                services.
              </p>

              <button
                className="mt-8 w-full py-3 rounded-full
                bg-gradient-to-r
                from-green-500
                via-emerald-500
                to-sky-500
                text-white
                font-semibold
                hover:scale-105
                transition"
              >
                Contact Me
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;