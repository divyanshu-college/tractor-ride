import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {

  const navigate = useNavigate();

  const [tractors, setTractors] = useState([]);
  const [filteredTractors, setFilteredTractors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("All");

  // Farmer username
  const [username, setUsername] = useState("");

  // My bookings
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);

  const services = [
    { name: "All", icon: "🌾" },
    { name: "Ploughing", icon: "🚜" },
    { name: "Sowing", icon: "🌱" },
    { name: "Harvesting", icon: "🌾" },
    { name: "Loading", icon: "📦" },
  ];


  // ================= FETCH TRACTORS =================

  const fetchTractors = async () => {

    try {

      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/tractors/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      setTractors(data);
      setFilteredTractors(data);

    } catch (error) {

      console.log("Error:", error);

    } finally {

      setLoading(false);

    }
  };


  // ================= FETCH BOOKINGS =================

  const fetchBookings = async () => {

    try {

      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/bookings/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        console.log("Booking error:", data);

        return;
      }

      setBookings(data);

    } catch (error) {

      console.log("Booking fetch error:", error);

    } finally {

      setBookingLoading(false);

    }
  };


  // ================= LOAD DATA =================

  useEffect(() => {

    const savedUsername = localStorage.getItem("username");

    setUsername(savedUsername || "Farmer");

    fetchTractors();
    fetchBookings();

  }, []);


  // ================= SEARCH =================

  useEffect(() => {

    let result = tractors;

    if (search.trim() !== "") {

      result = result.filter((tractor) => {

        const name = tractor.name || "";
        const location = tractor.location || "";

        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          location.toLowerCase().includes(search.toLowerCase())
        );

      });

    }

    setFilteredTractors(result);

  }, [search, tractors]);


  // ================= LOGOUT =================

  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    window.location.href = "/login";

  };


  // ================= STATUS COLOR =================

  const getStatusStyle = (status) => {

    if (status === "pending") {

      return "bg-yellow-100 text-yellow-700";

    }

    if (status === "accepted") {

      return "bg-green-100 text-green-700";

    }

    if (status === "rejected") {

      return "bg-red-100 text-red-700";

    }

    if (status === "completed") {

      return "bg-blue-100 text-blue-700";

    }

    if (status === "cancelled") {

      return "bg-gray-100 text-gray-600";

    }

    return "bg-gray-100 text-gray-600";

  };


  // ================= STATUS ICON =================

  const getStatusIcon = (status) => {

    if (status === "pending") return "🟡";

    if (status === "accepted") return "🟢";

    if (status === "rejected") return "🔴";

    if (status === "completed") return "🔵";

    if (status === "cancelled") return "⚪";

    return "⚪";

  };


  return (

    <div className="min-h-screen bg-[#F5F9F6]">


      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-[#12372A]/95 backdrop-blur-xl border-b border-white/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">


          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#95D5B2] to-[#2D6A4F] flex items-center justify-center text-2xl shadow-lg">
              🚜
            </div>

            <div>

              <h1 className="text-white font-bold text-xl">
                TractorRide
              </h1>

              <p className="text-green-300 text-xs">
                Smart Farming Platform
              </p>

            </div>

          </div>


          {/* User */}

          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">

              <p className="text-white text-sm font-semibold">
                {username}
              </p>

              <p className="text-green-300 text-xs">
                Welcome back 👋
              </p>

            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">


        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#52B788] p-7 sm:p-10 text-white shadow-2xl">

          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -left-20 -bottom-32 w-80 h-80 rounded-full bg-[#95D5B2]/20 blur-3xl"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-green-100">

                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>

                Tractor services available near you

              </div>


              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mt-5">

                Your farm.
                <br />

                <span className="text-[#B7E4C7]">
                  Your tractor.
                </span>

              </h2>


              <p className="text-green-100/80 text-lg max-w-xl mt-5 leading-relaxed">

                Book reliable tractors whenever you need them.
                From ploughing to harvesting, TractorRide makes
                farming easier.

              </p>


              <div className="flex flex-wrap gap-3 mt-7">

                <button
                  onClick={() =>
                    document
                      .getElementById("tractors")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="bg-white text-[#1B4332] px-6 py-3.5 rounded-2xl font-bold hover:scale-105 transition shadow-xl"
                >
                  Find a Tractor →
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("bookings")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="px-5 py-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
                >
                  📋 My Bookings
                </button>

              </div>

            </div>


            {/* Tractor Illustration */}

            <div className="hidden lg:flex justify-center">

              <div className="relative">

                <div className="absolute inset-0 bg-green-300/30 blur-3xl rounded-full"></div>

                <div className="relative w-72 h-72 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">

                  <div className="text-[135px] hover:scale-110 transition duration-500">
                    🚜
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7">

          <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">

            <div className="text-2xl">
              🚜
            </div>

            <p className="text-2xl font-black text-[#12372A] mt-3">
              {tractors.length}
            </p>

            <p className="text-gray-500 text-sm">
              Available Tractors
            </p>

          </div>


          <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">

            <div className="text-2xl">
              📋
            </div>

            <p className="text-2xl font-black text-[#12372A] mt-3">
              {bookings.length}
            </p>

            <p className="text-gray-500 text-sm">
              My Bookings
            </p>

          </div>


          <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">

            <div className="text-2xl">
              ⚡
            </div>

            <p className="text-2xl font-black text-[#12372A] mt-3">
              Fast
            </p>

            <p className="text-gray-500 text-sm">
              Booking Process
            </p>

          </div>


          <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">

            <div className="text-2xl">
              🛡️
            </div>

            <p className="text-2xl font-black text-[#12372A] mt-3">
              Trusted
            </p>

            <p className="text-gray-500 text-sm">
              Platform
            </p>

          </div>

        </section>


        {/* ================= MY BOOKINGS ================= */}

        <section
          id="bookings"
          className="mt-12"
        >

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>

              <p className="text-green-600 text-sm font-bold uppercase tracking-wider">
                Your Activity
              </p>

              <h3 className="text-3xl sm:text-4xl font-black text-[#12372A]">
                My Bookings
              </h3>

              <p className="text-gray-500 mt-2">
                Track your tractor bookings and their status.
              </p>

            </div>


            <button
              onClick={fetchBookings}
              className="px-5 py-3 rounded-xl bg-white border border-green-200 text-[#1B4332] font-semibold hover:bg-green-50 transition"
            >
              ↻ Refresh
            </button>

          </div>


          {/* Booking Loading */}

          {bookingLoading && (

            <div className="grid lg:grid-cols-2 gap-5">

              {[1, 2].map((item) => (

                <div
                  key={item}
                  className="bg-white rounded-3xl p-6 animate-pulse"
                >

                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>

                  <div className="h-4 bg-gray-200 rounded mt-4 w-2/3"></div>

                  <div className="h-4 bg-gray-200 rounded mt-3 w-1/2"></div>

                  <div className="h-10 bg-gray-200 rounded-xl mt-6"></div>

                </div>

              ))}

            </div>

          )}


          {/* No Bookings */}

          {!bookingLoading &&
            bookings.length === 0 && (

              <div className="bg-white rounded-[28px] border border-green-100 p-12 text-center shadow-sm">

                <div className="text-7xl">
                  📋
                </div>

                <h3 className="text-2xl font-black text-[#12372A] mt-5">
                  No bookings yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Book a tractor and your booking will appear here.
                </p>

                <button
                  onClick={() =>
                    document
                      .getElementById("tractors")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="mt-6 px-6 py-3 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#245C45] transition"
                >
                  Find a Tractor →
                </button>

              </div>

            )}


          {/* Booking Cards */}

          {!bookingLoading &&
            bookings.length > 0 && (

              <div className="grid lg:grid-cols-2 gap-5">

                {bookings.map((booking) => (

                  <div
                    key={booking.id}
                    className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition"
                  >

                    {/* Top */}

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs uppercase tracking-wider text-green-600 font-bold">
                          Booking #{booking.id}
                        </p>

                        <h4 className="text-xl font-black text-[#12372A] mt-1">
                          {booking.service_type
                            ? booking.service_type.charAt(0).toUpperCase() +
                              booking.service_type.slice(1)
                            : "Farming Service"}
                        </h4>

                      </div>


                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                          booking.status
                        )}`}
                      >

                        {getStatusIcon(booking.status)}{" "}
                        {booking.status
                          ? booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)
                          : "Unknown"}

                      </span>

                    </div>


                    {/* Details */}

                    <div className="grid grid-cols-2 gap-4 mt-6">

                      <div className="bg-[#F5F9F6] rounded-2xl p-4">

                        <p className="text-xs text-gray-400">
                          📅 Date
                        </p>

                        <p className="font-bold text-gray-700 mt-1">
                          {booking.date}
                        </p>

                      </div>


                      <div className="bg-[#F5F9F6] rounded-2xl p-4">

                        <p className="text-xs text-gray-400">
                          ⏱️ Hours
                        </p>

                        <p className="font-bold text-gray-700 mt-1">
                          {booking.hours} hrs
                        </p>

                      </div>


                      <div className="bg-[#F5F9F6] rounded-2xl p-4">

                        <p className="text-xs text-gray-400">
                          📍 Location
                        </p>

                        <p className="font-bold text-gray-700 mt-1 truncate">
                          {booking.location}
                        </p>

                      </div>


                      <div className="bg-[#E8F5E9] rounded-2xl p-4">

                        <p className="text-xs text-green-600">
                          💰 Total
                        </p>

                        <p className="font-black text-green-700 text-lg mt-1">
                          ₹{booking.total_price}
                        </p>

                      </div>

                    </div>


                    {/* Status Message */}

                    <div className="mt-5 pt-5 border-t border-gray-100">

                      {booking.status === "pending" && (

                        <p className="text-sm text-yellow-700 bg-yellow-50 rounded-xl px-4 py-3">
                          ⏳ Waiting for the tractor owner to accept your booking.
                        </p>

                      )}

                      {booking.status === "accepted" && (

                        <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-3">
                          ✅ Your booking has been accepted by the tractor owner.
                        </p>

                      )}

                      {booking.status === "rejected" && (

                        <p className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
                          ❌ The tractor owner rejected this booking.
                        </p>

                      )}

                      {booking.status === "completed" && (

                        <p className="text-sm text-blue-700 bg-blue-50 rounded-xl px-4 py-3">
                          🎉 Your tractor service has been completed.
                        </p>

                      )}

                      {booking.status === "cancelled" && (

                        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                          This booking was cancelled.
                        </p>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>


        {/* ================= SERVICES ================= */}

        <section className="mt-12">

          <div className="mb-6">

            <p className="text-green-600 text-sm font-bold uppercase tracking-wider">
              What do you need?
            </p>

            <h3 className="text-3xl font-black text-[#12372A] mt-1">
              Choose a farming service
            </h3>

          </div>


          <div className="flex gap-3 overflow-x-auto pb-3">

            {services.map((service) => (

              <button
                key={service.name}
                onClick={() =>
                  setSelectedService(service.name)
                }
                className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-2xl font-semibold transition ${
                  selectedService === service.name
                    ? "bg-[#1B4332] text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
                }`}
              >

                <span>
                  {service.icon}
                </span>

                {service.name}

              </button>

            ))}

          </div>

        </section>


        {/* ================= TRACTOR SECTION ================= */}

        <section
          id="tractors"
          className="mt-10"
        >

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">

            <div>

              <p className="text-green-600 text-sm font-bold uppercase tracking-wider">
                Explore
              </p>

              <h3 className="text-3xl sm:text-4xl font-black text-[#12372A]">
                Available Tractors
              </h3>

              <p className="text-gray-500 mt-2">
                Pick the right machine for your farm.
              </p>

            </div>


            {/* Search */}

            <div className="relative w-full lg:w-80">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search tractor or location..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              />

            </div>

          </div>


          {/* Loading */}

          {loading && (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="bg-white p-5 rounded-3xl animate-pulse"
                >

                  <div className="h-48 bg-gray-200 rounded-2xl"></div>

                  <div className="h-5 bg-gray-200 rounded mt-5"></div>

                  <div className="h-4 bg-gray-200 rounded mt-3 w-2/3"></div>

                  <div className="h-12 bg-gray-200 rounded-xl mt-6"></div>

                </div>

              ))}

            </div>

          )}


          {/* Empty */}

          {!loading &&
            filteredTractors.length === 0 && (

              <div className="bg-white rounded-3xl p-14 text-center border border-green-100">

                <div className="text-7xl">
                  🔎
                </div>

                <h3 className="text-2xl font-bold text-[#12372A] mt-5">
                  No tractors found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try another tractor name or location.
                </p>

              </div>

            )}


          {/* Cards */}

          {!loading &&
            filteredTractors.length > 0 && (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredTractors.map((tractor) => (

                  <div
                    key={tractor.id}
                    className="group bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >

                    {/* Image */}

                    <div className="relative h-48 rounded-2xl bg-gradient-to-br from-[#E8F5E9] via-[#D8F3DC] to-[#B7E4C7] flex items-center justify-center overflow-hidden">

                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-green-700 text-xs font-bold">
                        ● Available
                      </div>

                      <div className="absolute top-4 right-4 bg-white/70 backdrop-blur w-9 h-9 rounded-full flex items-center justify-center">
                        ❤️
                      </div>

                      <div className="text-8xl group-hover:scale-110 group-hover:rotate-2 transition duration-500">
                        🚜
                      </div>

                    </div>


                    {/* Content */}

                    <div className="pt-5">

                      <div className="flex justify-between items-start">

                        <div>

                          <h4 className="text-xl font-black text-[#12372A]">
                            {tractor.name ||
                              `Tractor ${tractor.id}`}
                          </h4>

                          <p className="text-gray-400 text-sm mt-1">
                            Farm Utility Tractor
                          </p>

                        </div>

                        <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1.5 rounded-lg text-sm">
                          ⭐ 4.8
                        </div>

                      </div>


                      <div className="mt-5 space-y-3">

                        <div className="flex justify-between items-center">

                          <span className="text-gray-500 text-sm">
                            📍 Location
                          </span>

                          <span className="font-semibold text-gray-700 text-sm">
                            {tractor.location ||
                              "Not specified"}
                          </span>

                        </div>


                        <div className="flex justify-between items-center">

                          <span className="text-gray-500 text-sm">
                            💰 Per hour
                          </span>

                          <span className="text-green-700 font-black text-lg">
                            ₹{tractor.price_per_hour ||
                              "N/A"}
                            {tractor.price_per_hour &&
                              "/hr"}
                          </span>

                        </div>

                      </div>


                      <button
                        onClick={() =>
                          navigate("/booking", {
                            state: {
                              tractor: tractor,
                            },
                          })
                        }
                        className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1B4332] to-[#40916C] text-white font-bold hover:shadow-xl hover:shadow-green-800/20 hover:scale-[1.02] transition"
                      >
                        Book This Tractor →
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>


        {/* ================= BOTTOM CTA ================= */}

        <section className="mt-12 mb-8 relative overflow-hidden rounded-3xl bg-[#D8F3DC] border border-green-200 p-7 sm:p-9">

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <span className="text-green-700 text-sm font-bold">
                🚜 TractorRide AI
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-[#12372A] mt-2">
                Farming made simple.
              </h3>

              <p className="text-green-800/70 mt-2">
                Book the machine you need, when you need it.
              </p>

            </div>


            <button
              onClick={() =>
                document
                  .getElementById("tractors")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="px-7 py-3.5 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#245C45] hover:scale-105 transition"
            >
              Browse Tractors →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default FarmerDashboard;