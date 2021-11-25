import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
const Navbar = (props) => {
  return (
    <nav>
      <div className="nav__left">
        <i className="topIcon fab fa-facebook"></i>
        <i className="topIcon fab fa-twitter"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest"></i>
      </div>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.FEEDPAGE} className="authLink">
              Feed Page
            </Link>
            <Link to={PATHS.CURRENT_USER_PROFILE} className="authLink">
              Profile Page
            </Link>
            <Link to={PATHS.CREATE_POST} className="authLink">
              Write a post
            </Link>
            <Link to={PATHS.PROFILE_SETTINGS_PAGE} className="authLink">
              Settings
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.HOMEPAGE} className="nav__projectName">
              Home Page
            </Link>

            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
