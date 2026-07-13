import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import Why from "./components/Why";
import Team from "./components/Team";
import ContactUs from "./components/ContactUs";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  return (
    <div
      className={
        theme === "dark"
          ? "dark min-h-screen bg-gradient-to-br from-[#0B1020] via-[#16213E] to-[#0F3460]"
          : "min-h-screen bg-gradient-to-br from-[#FFF7E8] via-[#F8FFF5] to-[#EAF7FF]"
      }
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <Hero />
      <TrustedBy />
      <Services />
      <Why />
      <Team />
      <ContactUs />
    </div>
  );
};

export default App;