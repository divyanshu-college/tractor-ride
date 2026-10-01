import React from "react";
import { Link } from "react-router-dom";

const LoginChoice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E8] via-[#F8FFF5] to-[#EAF7FF] flex items-center justify-center px-4">

      <div className="w-full max-w-4xl">

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Welcome to TractorRide
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Choose how you want to continue
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Farmer */}
          <Link
            to="/farmer-login"
            className="group bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
          >

            <div className="text-7xl mb-6">
              👨‍🌾
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Farmer
            </h2>

            <p className="text-gray-500 mt-3">
              Book tractors for your farming work
            </p>

            <div className="mt-7 inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full">
              Farmer Login
            </div>

          </Link>


          {/* Tractor Owner */}
          <Link
            to="/owner-login"
            className="group bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
          >

            <div className="text-7xl mb-6">
              🚜
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Tractor Owner
            </h2>

            <p className="text-gray-500 mt-3">
              List your tractor and manage bookings
            </p>

            <div className="mt-7 inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full">
              Owner Login
            </div>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default LoginChoice;