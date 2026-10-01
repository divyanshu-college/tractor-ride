import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import Why from "./components/Why";
import Team from "./components/Team";
import ContactUs from "./components/ContactUs";
import LoginChoice from "./components/LoginChoice";

import FarmerLogin from "./components/FarmerLogin";
import OwnerLogin from "./components/OwnerLogin";


const Home = ({ theme, setTheme }) => {
  return (
    <div
      className={
        theme === "dark"
          ? "dark min-h-screen w-full bg-[#1B4332]"
          : "min-h-screen w-full bg-[#1B4332]"
      }
    >

      <Navbar
        theme={theme}
        setTheme={setTheme}
      />

      <Hero />

      <TrustedBy />

      <Services />

      <Why />

      <Team />

      <ContactUs />

    </div>
  );
};


const App = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  return (
    <BrowserRouter>

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              setTheme={setTheme}
            />
          }
        />

        {/* Login Selection */}
        <Route
          path="/login"
          element={<LoginChoice />}
        />

        {/* Farmer Login */}
        <Route
          path="/farmer-login"
          element={<FarmerLogin />}
        />

        {/* Owner Login */}
        <Route
          path="/owner-login"
          element={<OwnerLogin />}
        />

      </Routes>

    </BrowserRouter>
  );
};


export default App;