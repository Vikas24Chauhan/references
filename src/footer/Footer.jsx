import React from "react";
import "./Footer.css";
import { FiHome, FiSettings, FiBook, FiUser } from "react-icons/fi";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-icon-wrapper">
        <FiHome className="footer-icons" />
        <span className="footer-icon-tooltip">Home</span>
      </div>
      <div className="footer-icon-wrapper">
        <FiBook className="footer-icons" />
        <span className="footer-icon-tooltip">Blog</span>
      </div>
      <div className="footer-icon-wrapper">
        <FiUser className="footer-icons" />
        <span className="footer-icon-tooltip">About</span>
      </div>
      <div className="footer-icon-wrapper">
        <FiSettings className="footer-icons" />
        <span className="footer-icon-tooltip">Settings</span>
      </div>
    </div>
  );
}

export default Footer;
