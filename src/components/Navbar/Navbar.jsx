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
            <Link to={PATHS.HOMEPAGE} className="nav__projectName authLink">
              Home Page
            </Link>

            <Link to={PATHS.FEED_PAGE} className="nav__projectName authLink">
              Feed Page
            </Link>

            <Link to={PATHS.CREATE_POST} className="nav__projectName authLink">
              Write a post
            </Link>

            <Link
              to={PATHS.CURRENT_USER_PROFILE}
              className="nav__projectName authLink"
            >
              Profile Settings
            </Link>

            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.HOMEPAGE} className="nav__projectName authLink ">
              Home Page
            </Link>

            <Link to={PATHS.SIGNUPPAGE} className="nav__projectName authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="nav__projectName authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
