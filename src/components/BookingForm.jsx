import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tractor = location.state?.tractor;

  const [serviceType, setServiceType] = useState("ploughing");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(1);
  const [bookingLocation, setBookingLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const pricePerHour = Number(tractor?.price_per_hour || 0);
  const totalPrice = pricePerHour * Number(hours);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!tractor) {
      alert("Tractor information not found");
      return;
    }

    try {
      setLoading(true);

      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            tractor: tractor.id,
            service_type: serviceType,
            date: date,
            hours: Number(hours),
            location: bookingLocation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        alert("Booking failed");
        return;
      }

      alert("Booking created successfully! 🚜");

      navigate("/farmer-dashboard");
    } catch (error) {
      console.log(error);
      alert("Server se connect nahi ho pa raha");
    } finally {
      setLoading(false);
    }
  };

  if (!tractor) {
    return (
      <div className="min-h-screen bg-[#F5F9F6] flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <div className="text-6xl">
            🚜
          </div>

          <h2 className="text-2xl font-bold text-[#12372A] mt-4">
            Tractor not found
          </h2>

          <button
            onClick={() => navigate("/farmer-dashboard")}
            className="mt-6 px-6 py-3 rounded-xl bg-[#1B4332] text-white font-semibold"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F9F6]">

      {/* Navbar */}

      <nav className="bg-[#12372A] px-5 sm:px-10 py-4">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-[#95D5B2] flex items-center justify-center text-2xl">
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

          <button
            onClick={() => navigate("/farmer-dashboard")}
            className="text-white bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            ← Back
          </button>

        </div>

      </nav>


      {/* Main */}

      <main className="max-w-5xl mx-auto px-5 py-10">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Tractor Preview */}

          <div>

            <p className="text-green-600 text-sm font-bold uppercase tracking-wider">
              Booking
            </p>

            <h2 className="text-4xl font-black text-[#12372A] mt-2">
              Book Your Tractor
            </h2>

            <p className="text-gray-500 mt-3">
              Fill in your farming requirements and confirm your booking.
            </p>


            <div className="mt-8 bg-white rounded-[28px] p-6 shadow-lg border border-green-100">

              <div className="h-60 rounded-2xl bg-gradient-to-br from-[#E8F5E9] via-[#D8F3DC] to-[#B7E4C7] flex items-center justify-center">

                <div className="text-[130px]">
                  🚜
                </div>

              </div>


              <div className="mt-6 flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-black text-[#12372A]">
                    {tractor.name || `Tractor ${tractor.id}`}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Farm Utility Tractor
                  </p>

                </div>

                <div className="bg-green-50 px-3 py-2 rounded-xl">

                  <p className="text-green-700 font-black">
                    ₹{pricePerHour}
                  </p>

                  <p className="text-gray-400 text-xs">
                    / hour
                  </p>

                </div>

              </div>


              <div className="mt-5 flex justify-between border-t pt-4">

                <span className="text-gray-500">
                  📍 Location
                </span>

                <span className="font-semibold text-gray-700">
                  {tractor.location || "Not specified"}
                </span>

              </div>

            </div>

          </div>


          {/* Booking Form */}

          <div className="bg-white rounded-[28px] shadow-xl p-7 sm:p-9">

            <h3 className="text-2xl font-black text-[#12372A]">
              Booking Details
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Tell us what you need
            </p>


            <form
              onSubmit={handleBooking}
              className="mt-7 space-y-5"
            >

              {/* Service */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Farming Service
                </label>

                <select
                  value={serviceType}
                  onChange={(e) =>
                    setServiceType(e.target.value)
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >

                  <option value="ploughing">
                    🚜 Ploughing
                  </option>

                  <option value="sowing">
                    🌱 Sowing
                  </option>

                  <option value="harvesting">
                    🌾 Harvesting
                  </option>

                  <option value="loading">
                    📦 Loading
                  </option>

                </select>

              </div>


              {/* Date */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Booking Date
                </label>

                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Hours */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Required Hours
                </label>

                <input
                  type="number"
                  min="1"
                  max="24"
                  value={hours}
                  onChange={(e) =>
                    setHours(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Location */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Farm Location
                </label>

                <input
                  type="text"
                  placeholder="Enter your farm location"
                  value={bookingLocation}
                  onChange={(e) =>
                    setBookingLocation(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Price */}

              <div className="bg-[#E8F5E9] rounded-2xl p-5">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-600">
                    Tractor price
                  </span>

                  <span className="font-semibold">
                    ₹{pricePerHour}/hr
                  </span>

                </div>


                <div className="flex justify-between text-sm mt-2">

                  <span className="text-gray-600">
                    Hours
                  </span>

                  <span className="font-semibold">
                    × {hours}
                  </span>

                </div>


                <div className="border-t border-green-200 mt-4 pt-4 flex justify-between">

                  <span className="font-bold text-[#12372A]">
                    Estimated Total
                  </span>

                  <span className="text-2xl font-black text-green-700">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>


              {/* Confirm */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#40916C] text-white font-bold text-lg hover:scale-[1.02] hover:shadow-xl transition disabled:opacity-60 disabled:hover:scale-100"
              >

                {loading
                  ? "Creating Booking..."
                  : "Confirm Booking 🚜"}

              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
};

export default BookingForm;