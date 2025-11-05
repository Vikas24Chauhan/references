import React from "react";
import "./Error404.css";
import { NavLink } from "react-router-dom";
import HeroImage from "../assets/error-hero.png";

function Error404() {
  return (
    <div className="error-div">
      <div className="error-content">
        <h1>404-Error</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>Your search has ventured beyond the known universe.</p>
        <NavLink className="back-btn" to={"/"}>
          Back To Home
        </NavLink>
      </div>
      <div className="error-img">
        <img src={HeroImage} alt="layer image" />
      </div>
    </div>
  );
}

export default Error404;
