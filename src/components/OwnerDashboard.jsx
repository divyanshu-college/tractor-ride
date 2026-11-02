import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]);

  // Add / Edit Tractor
  const [showAddTractor, setShowAddTractor] = useState(false);
  const [tractorModel, setTractorModel] = useState("");
  const [tractorNumber, setTractorNumber] = useState("");
  const [tractorPrice, setTractorPrice] = useState("");
  const [tractorLocation, setTractorLocation] = useState("");
  const [tractorAvailable, setTractorAvailable] = useState(true);
  const [tractorLoading, setTractorLoading] = useState(false);
  const [editingTractor, setEditingTractor] = useState(null);
  const [tractorImage, setTractorImage] = useState(null);
const [tractorVideo, setTractorVideo] = useState(null);

  // Fetch bookings
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
        console.log(data);
        return;
      }

      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tractors
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
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/reviews/",
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

      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate tractor rating
  const getTractorRating = (tractorId) => {
    const tractorReviews = reviews.filter(
      (review) => Number(review.tractor) === Number(tractorId)
    );

    if (tractorReviews.length === 0) {
      return {
        average: 0,
        count: 0,
      };
    }

    const total = tractorReviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return {
      average: (total / tractorReviews.length).toFixed(1),
      count: tractorReviews.length,
    };
  };

  // Load data
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      setUsername(savedUsername);
    }

    fetchBookings();
    fetchTractors();
    fetchReviews();
  }, []);

  // Accept / Reject / Complete booking
  const handleAction = async (bookingId, action) => {
    try {
      const access = localStorage.getItem("access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/bookings/${bookingId}/${action}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Action failed");
        return;
      }

      alert(data.message);

      fetchBookings();
      fetchTractors();
    } catch (error) {
      console.log(error);
      alert("Server se connect nahi ho pa raha");
    }
  };

  // Add Tractor
  const handleAddTractor = async (e) => {
    e.preventDefault();

    try {
      setTractorLoading(true);

      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/tractors/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            model: tractorModel,
            tractor_number: tractorNumber,
            price_per_hour: Number(tractorPrice),
            location: tractorLocation,
            available: tractorAvailable,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        alert("Tractor add nahi hua");
        return;
      }

      alert("Tractor added successfully 🚜");

      setTractorModel("");
      setTractorNumber("");
      setTractorPrice("");
      setTractorLocation("");
      setTractorAvailable(true);

      setShowAddTractor(false);

      fetchTractors();
    } catch (error) {
      console.log(error);
      alert("Server se connect nahi ho pa raha");
    } finally {
      setTractorLoading(false);
    }
  };

  // Start Edit Tractor
  const handleEditTractor = (tractor) => {
    setEditingTractor(tractor);

    setTractorModel(tractor.model);
    setTractorNumber(tractor.tractor_number);
    setTractorPrice(tractor.price_per_hour);
    setTractorLocation(tractor.location);
    setTractorAvailable(tractor.available);

    setShowAddTractor(true);
  };

  // Update Tractor
  const handleUpdateTractor = async (e) => {
    e.preventDefault();

    if (!editingTractor) {
      return;
    }

    try {
      setTractorLoading(true);

      const access = localStorage.getItem("access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/tractors/${editingTractor.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            model: tractorModel,
            tractor_number: tractorNumber,
            price_per_hour: Number(tractorPrice),
            location: tractorLocation,
            available: tractorAvailable,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        alert(data.error || "Tractor update nahi hua");
        return;
      }

      alert("Tractor updated successfully 🚜");

      setEditingTractor(null);
      setTractorModel("");
      setTractorNumber("");
      setTractorPrice("");
      setTractorLocation("");
      setTractorAvailable(true);
      setShowAddTractor(false);

      fetchTractors();
    } catch (error) {
      console.log(error);
      alert("Server se connect nahi ho pa raha");
    } finally {
      setTractorLoading(false);
    }
  };

  // Delete Tractor
  const handleDeleteTractor = async (tractorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tractor?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const access = localStorage.getItem("access");

      const response = await fetch(
        `http://127.0.0.1:8000/api/tractors/${tractorId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(data.error || "Tractor delete nahi hua");
        return;
      }

      alert("Tractor deleted successfully 🚜");

      fetchTractors();
    } catch (error) {
      console.log(error);
      alert("Server se connect nahi ho pa raha");
    }
  };

  // Cancel Add / Edit
  const handleCancelTractorForm = () => {
    setShowAddTractor(false);
    setEditingTractor(null);

    setTractorModel("");
    setTractorNumber("");
    setTractorPrice("");
    setTractorLocation("");
    setTractorAvailable(true);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F9F6]">

      {/* Navbar */}
      <nav className="bg-[#12372A] px-5 sm:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-[#95D5B2] flex items-center justify-center text-2xl">
              🚜
            </div>

            <div>
              <h1 className="text-white font-bold text-xl">
                TractorRide
              </h1>

              <p className="text-green-300 text-xs">
                Owner Dashboard
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="bg-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 sm:px-10 py-10">

        {/* Welcome */}
        <div className="mb-8">

          <p className="text-green-600 font-bold text-sm uppercase">
            Tractor Owner
          </p>

          <h1 className="text-4xl font-black text-[#12372A] mt-2">
            Welcome back, {username || "Owner"} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your tractor bookings from here.
          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-500">
              Total Bookings
            </p>

            <h2 className="text-3xl font-black text-[#12372A] mt-2">
              {bookings.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-500">
              Pending
            </p>

            <h2 className="text-3xl font-black text-orange-500 mt-2">
              {
                bookings.filter(
                  (booking) => booking.status === "pending"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
            <p className="text-gray-500">
              Completed
            </p>

            <h2 className="text-3xl font-black text-green-600 mt-2">
              {
                bookings.filter(
                  (booking) => booking.status === "completed"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* My Tractors */}
        <div className="mb-10">

          {/* Heading + Add Tractor */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

            <div>
              <h2 className="text-2xl font-black text-[#12372A]">
                My Tractors
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Tractors managed by you
              </p>
            </div>

            <div className="flex items-center gap-3">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                {tractors.length} Tractor
                {tractors.length !== 1 ? "s" : ""}
              </span>

              <button
                onClick={() => {
                  if (showAddTractor) {
                    handleCancelTractorForm();
                  } else {
                    setShowAddTractor(true);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#1B4332] text-white font-semibold hover:bg-[#12372A]"
              >
                {showAddTractor
                  ? "✕ Close"
                  : "+ Add Tractor"}
              </button>

            </div>

          </div>

          {/* Add / Edit Tractor Form */}
          {showAddTractor && (
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-green-100 mb-6">

              <h3 className="text-2xl font-black text-[#12372A]">
                {editingTractor
                  ? "Edit Tractor 🚜"
                  : "Add New Tractor 🚜"}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {editingTractor
                  ? "Update your tractor details"
                  : "Add your tractor details"}
              </p>

              <form
                onSubmit={
                  editingTractor
                    ? handleUpdateTractor
                    : handleAddTractor
                }
                className="mt-6 grid md:grid-cols-2 gap-5"
              >

                {/* Model */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tractor Model
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Mahindra 575 DI"
                    value={tractorModel}
                    onChange={(e) =>
                      setTractorModel(e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Tractor Number */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tractor Number
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. PB10AB1234"
                    value={tractorNumber}
                    onChange={(e) =>
                      setTractorNumber(e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price Per Hour
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 800"
                    value={tractorPrice}
                    onChange={(e) =>
                      setTractorPrice(e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Chandigarh"
                    value={tractorLocation}
                    onChange={(e) =>
                      setTractorLocation(e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {/* Tractor Image */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">
    Tractor Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setTractorImage(e.target.files[0])}
    className="w-full px-4 py-3 rounded-xl border border-gray-200"
  />
</div>

{/* Tractor Video */}
<div>
  <label className="block text-sm font-bold text-gray-700 mb-2">
    Tractor Video
  </label>

  <input
    type="file"
    accept="video/*"
    onChange={(e) => setTractorVideo(e.target.files[0])}
    className="w-full px-4 py-3 rounded-xl border border-gray-200"
  />
</div>

                {/* Available */}
                <div className="md:col-span-2">

                  <label className="flex items-center gap-3 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={tractorAvailable}
                      onChange={(e) =>
                        setTractorAvailable(
                          e.target.checked
                        )
                      }
                      className="w-5 h-5"
                    />

                    <span className="font-semibold text-gray-700">
                      Tractor is available for booking
                    </span>

                  </label>

                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex gap-3">

                  <button
                    type="submit"
                    disabled={tractorLoading}
                    className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-60"
                  >
                    {tractorLoading
                      ? editingTractor
                        ? "Updating..."
                        : "Adding..."
                      : editingTractor
                      ? "Update Tractor 🚜"
                      : "Add Tractor 🚜"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelTractorForm}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          )}

          {/* Tractor List */}
          {tractors.length === 0 ? (

            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

              <div className="text-5xl">
                🚜
              </div>

              <h3 className="text-xl font-bold text-[#12372A] mt-3">
                No tractors added
              </h3>

              <p className="text-gray-500 mt-2">
                Your tractors will appear here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {tractors.map((tractor) => {

                const rating = getTractorRating(
                  tractor.id
                );

                return (
                  <div
                    key={tractor.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-green-100"
                  >

                 <div className="h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8F5E9] to-[#B7E4C7] flex items-center justify-center">

  {tractor.image ? (
    <img
      src={
        tractor.image.startsWith("http")
          ? tractor.image
          : `http://127.0.0.1:8000${tractor.image}`
      }
      alt={tractor.model || "Tractor"}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="text-7xl">
      🚜
    </div>
  )}

</div>

{tractor.video && (
  <div className="mt-3 rounded-2xl overflow-hidden bg-black">
    <video
      src={
        tractor.video.startsWith("http")
          ? tractor.video
          : `http://127.0.0.1:8000${tractor.video}`
      }
      controls
      className="w-full h-40 object-cover"
    >
      Your browser does not support the video tag.
    </video>
  </div>
)}

                    <div className="mt-5">

                      <div className="flex justify-between items-start gap-3">

                        <div>

                          <h3 className="text-xl font-black text-[#12372A]">
                            {tractor.model}
                          </h3>

                          <p className="text-gray-500 text-sm mt-1">
                            #{tractor.tractor_number}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            tractor.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {tractor.available
                            ? "Available"
                            : "Unavailable"}
                        </span>

                      </div>

                      {/* Rating */}
                      <div className="mt-4">

                        {rating.count > 0 ? (

                          <div className="flex items-center gap-2">

                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map(
                                (star) => (
                                  <span key={star}>
                                    {star <=
                                    Math.round(
                                      Number(
                                        rating.average
                                      )
                                    )
                                      ? "★"
                                      : "☆"}
                                  </span>
                                )
                              )}
                            </div>

                            <span className="font-bold text-gray-800">
                              {rating.average}/5
                            </span>

                            <span className="text-sm text-gray-500">
                              ({rating.count}{" "}
                              {rating.count === 1
                                ? "review"
                                : "reviews"})
                            </span>

                          </div>

                        ) : (

                          <p className="text-sm text-gray-400">
                            ⭐ No reviews yet
                          </p>

                        )}

                      </div>

                      <div className="mt-5 space-y-3">

                        <div className="flex justify-between gap-4">

                          <span className="text-gray-500">
                            📍 Location
                          </span>

                          <span className="font-semibold text-gray-700 text-right">
                            {tractor.location}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-gray-500">
                            💰 Price
                          </span>

                          <span className="font-black text-green-700">
                            ₹{tractor.price_per_hour}/hr
                          </span>

                        </div>

                        <div className="flex gap-2 mt-5">

                          <button
                            onClick={() =>
                              handleEditTractor(
                                tractor
                              )
                            }
                            className="flex-1 px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteTractor(
                                tractor.id
                              )
                            }
                            className="flex-1 px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200"
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* Customer Reviews */}
        <div className="mb-10">

          <div className="mb-5">

            <h2 className="text-2xl font-black text-[#12372A]">
              Customer Reviews ⭐
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Reviews given by farmers for your tractors
            </p>

          </div>

          {reviews.length === 0 ? (

            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-green-100">

              <div className="text-5xl">
                ⭐
              </div>

              <h3 className="text-xl font-bold text-[#12372A] mt-3">
                No reviews yet
              </h3>

              <p className="text-gray-500 mt-2">
                Customer reviews will appear here after completed bookings.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-green-100"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Tractor #{review.tractor}
                      </p>

                      <h3 className="font-bold text-[#12372A] mt-1">
                        Farmer #{review.farmer}
                      </h3>

                    </div>

                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                      ⭐ {review.rating}/5
                    </div>

                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mt-4 text-xl">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <span
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      )
                    )}

                  </div>

                  {/* Comment */}
                  <div className="mt-4 bg-gray-50 rounded-2xl p-4">

                    <p className="text-gray-700">
                      "{review.comment ||
                        "No written comment"}"
                    </p>

                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(
                      review.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Incoming Bookings */}
        <div>

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-2xl font-black text-[#12372A]">
                Incoming Bookings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Manage requests from farmers
              </p>

            </div>

            <button
              onClick={() => {
                fetchBookings();
                fetchTractors();
                fetchReviews();
              }}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200"
            >
              🔄 Refresh
            </button>

          </div>

          {loading ? (

            <div className="bg-white rounded-3xl p-10 text-center">

              <p className="text-gray-500">
                Loading bookings...
              </p>

            </div>

          ) : bookings.length === 0 ? (

            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

              <div className="text-6xl">
                📭
              </div>

              <h3 className="text-xl font-bold text-[#12372A] mt-4">
                No bookings yet
              </h3>

              <p className="text-gray-500 mt-2">
                New farmer bookings will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-green-100"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* Booking Info */}
                    <div>

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-2xl">
                          🚜
                        </div>

                        <div>

                          <h3 className="text-xl font-bold text-[#12372A]">
                            Booking #{booking.id}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            Farmer ID: {booking.farmer}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div>

                          <p className="text-xs text-gray-400">
                            Service
                          </p>

                          <p className="font-semibold text-gray-700 capitalize">
                            {booking.service_type}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Date
                          </p>

                          <p className="font-semibold text-gray-700">
                            {booking.date}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Hours
                          </p>

                          <p className="font-semibold text-gray-700">
                            {booking.hours} hrs
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Location
                          </p>

                          <p className="font-semibold text-gray-700">
                            {booking.location}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Right Side */}
                    <div className="lg:text-right">

                      <p className="text-2xl font-black text-green-700">
                        ₹{booking.total_price}
                      </p>

                      <span
                        className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-bold ${
                          booking.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : booking.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mt-4 lg:justify-end">

                        {booking.status === "pending" && (
                          <>

                            <button
                              onClick={() =>
                                handleAction(
                                  booking.id,
                                  "accept"
                                )
                              }
                              className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                            >
                              ✓ Accept
                            </button>

                            <button
                              onClick={() =>
                                handleAction(
                                  booking.id,
                                  "reject"
                                )
                              }
                              className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
                            >
                              ✕ Reject
                            </button>

                          </>
                        )}

                        {booking.status === "accepted" && (

                          <button
                            onClick={() =>
                              handleAction(
                                booking.id,
                                "complete"
                              )
                            }
                            className="px-5 py-2 rounded-xl bg-[#12372A] text-white font-semibold hover:bg-[#1B4332]"
                          >
                            ✓ Mark Completed
                          </button>

                        )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default OwnerDashboard;