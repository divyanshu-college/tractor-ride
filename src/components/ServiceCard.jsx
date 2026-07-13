import React, { useState } from "react";

const ServiceCard = ({ service }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setVisible(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setVisible(false)}
      className="relative overflow-hidden rounded-3xl border border-green-200 dark:border-green-700 bg-white/70 dark:bg-[#0d1b12]/80 backdrop-blur-xl shadow-xl hover:shadow-green-300/30 dark:hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Mouse Glow */}
      <div
        className="pointer-events-none absolute w-72 h-72 rounded-full transition-all duration-200"
        style={{
          left: position.x - 144,
          top: position.y - 144,
          opacity: visible ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(59,130,246,0.25) 45%, transparent 75%)",
          filter: "blur(35px)",
        }}
      ></div>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-[#112218] dark:via-[#152b1f] dark:to-[#0b1510]" />

      {/* Decorative Hills */}
      <div className="absolute -bottom-16 -left-10 w-60 h-40 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="absolute -top-10 -right-10 w-52 h-52 bg-emerald-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-6 p-8">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-green-900 shadow-lg">
          <img
            src={service.icon}
            alt={service.title}
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {service.title}
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;