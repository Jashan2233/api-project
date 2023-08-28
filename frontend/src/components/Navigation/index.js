import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
          style={{ width: "102px", height: "32px" }}
        />
      </Link>
      <div className="meunButton">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
