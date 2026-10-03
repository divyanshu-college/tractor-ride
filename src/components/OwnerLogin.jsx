import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

    localStorage.setItem("access", data.access);
localStorage.setItem("refresh", data.refresh);
localStorage.setItem("username", username);

      alert("Owner login successful");

   navigate("/owner-dashboard");
    } catch (error) {
      alert("Server se connect nahi ho pa raha");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-800">
          Tractor Owner Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to manage your tractor bookings
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Login as Owner
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-green-700"
        >
          ← Back
        </button>

      </div>

    </div>
  );
};

export default OwnerLogin;