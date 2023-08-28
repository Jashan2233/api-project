import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory("/");

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const navLinkSpotName = "nav-link-create" + (user ? "" : " hidden");

  return (
    <>
      <div className="new-spot-link">
        <div>
          <NavLink
            className={navLinkSpotName}
            to="/spots/new"
            style={{ textDecoration: "none" }}
          >
            Create a New Spot
          </NavLink>
        </div>
      </div>

      <button
        onClick={openMenu}
        id="profile-button"
        style={{ cursor: "pointer" }}
      >
        <i class="fa-solid fa-bars" style={{ fontSize: "20px" }}></i>
        <i className="fas fa-user-circle" style={{ fontSize: "20px" }} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profile-container">
              <div className="profile-drop">
                <div id="hello">Hello, {user.firstName}</div>
                <div id="hello-email">{user.email}</div>
                <NavLink
                  id="hello-manage"
                  to="/spots/current"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => closeMenu()}
                >
                  Manage Spots
                </NavLink>
                <button id="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="su-li">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
