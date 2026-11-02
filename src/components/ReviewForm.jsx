import React, { useState } from "react";

const ReviewForm = ({ booking, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitReview = async () => {
    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const access = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({
            booking: booking.id,
            tractor: booking.tractor,
            rating: rating,
            comment: comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
  console.log("Review API Error:", data);
  alert(data.error || JSON.stringify(data) || "Review submit nahi hui");
  return;
}

      setSubmitted(true);
      setComment("");

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

    } catch (error) {
      console.log("Review error:", error);
      alert("Server se connect nahi ho pa raha");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
        <p className="font-bold text-green-700">
          ⭐ Thank you for your review!
        </p>

        <p className="text-sm text-green-600 mt-1">
          Your feedback has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">

      <h3 className="font-bold text-gray-800 mb-3">
        ⭐ Rate this Tractor
      </h3>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-3 border rounded-xl resize-none"
        rows="3"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="w-full mt-3 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </div>
  );
};

export default ReviewForm;