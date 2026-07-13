import React from "react";
import assets from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-br from-green-50 via-white to-sky-50 dark:from-[#0B1C14] dark:via-[#0F172A] dark:to-[#0B1220] pt-16 pb-8 px-4 sm:px-8 lg:px-16 xl:px-24">

      {/* CTA Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          Ready to Book Your Tractor?
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Join TractorRide AI and get fast, reliable and affordable tractor services for your farm.
        </p>

        <button className="mt-8 px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-sky-500 text-white font-semibold hover:scale-105 active:scale-95 transition">
          Get Started 🚜
        </button>
      </div>

      {/* Footer Content */}
      <div className="grid md:grid-cols-3 gap-10 border-t border-gray-200 dark:border-gray-700 pt-10">

        {/* Logo */}
        <div>
          <img src={assets.logo4} alt="TractorRide AI Logo" className="w-28" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            TractorRide AI helps farmers connect with verified tractor owners for fast and easy booking.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="hover:text-green-500 cursor-pointer transition">Home</li>
            <li className="hover:text-green-500 cursor-pointer transition">Services</li>
            <li className="hover:text-green-500 cursor-pointer transition">Why Choose Us</li>
            <li className="hover:text-green-500 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
            Contact Info
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            📍 India <br />
            📧 support@tractorride.ai <br />
            📞 +917256980582
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
        © 2026 TractorRide AI. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;