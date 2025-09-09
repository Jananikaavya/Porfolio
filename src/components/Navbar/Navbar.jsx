import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

/* Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderOpen,
  faCertificate,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: faHome },
    { name: "About", path: "/about", icon: faUser },
    { name: "Projects", path: "/projects", icon: faFolderOpen },
    { name: "Certificates", path: "/certificates", icon: faCertificate },
    { name: "Contact", path: "/contact", icon: faEnvelope },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        {/* Left: Logo */}
<div className="logo-container">
  <div className="logo-circle">J</div>
  <h1 className="logo-text">Janani</h1>
</div>


        {/* Center Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="glass-link">
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="social-icons">
          <a
            href="https://github.com/jananikaavya"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/janani-kaavya-b8170b285/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
           
            <a
            href="jananikaavya1104@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown">
          <ul className="mobile-menu">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="mobile-glass-link"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-socials">
            <a
              href="https://github.com/jananikaavya"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            
            <a
            href="jananikaavya1104@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          </div>
        </div>
      )}
    </nav>
  );
}

