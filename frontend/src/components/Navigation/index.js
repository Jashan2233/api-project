import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <NavLink to="/">
        <img
          className="logo"
          src="https://png-files-for-api.s3.us-east-2.amazonaws.com/png/chillab.png"
          alt="logo"
        ></img>
      </NavLink>
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
