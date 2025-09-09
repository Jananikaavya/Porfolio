import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SplashCursor from "./components/Cursor/SplashCursor";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from'./components/Contact/Contact';
import './App.css'
import Certificates from "./components/Certificates/Certificates";
const App = () => {
  return (
    <div>
      {/* Decorative bubbles */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      {/* Always visible components */}
      <Navbar />
      <SplashCursor />

      {/* Routes (only one shows at a time) */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/certificates" element={<Certificates/>} />
      </Routes>
    </div>
  );
};

export default App;
