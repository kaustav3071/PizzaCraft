import React, { useState, useEffect } from "react";
import "./user_navbar.css";
import logo from "../../assets/logo.png";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    window.addEventListener("authChange", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    localStorage.removeItem("user._id");
    setIsLoggedIn(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="PizzaCraft Logo" />
          <span>PizzaCraft</span>
        </Link>

        <button
          className={`navbar__hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${isMenuOpen ? "active" : ""}`}>
          <div className="navbar__links">
            <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
            <Link to="/menu" className={isActive("/menu") ? "active" : ""}>Menu</Link>
            <Link to="/order" className={isActive("/order") ? "active" : ""}>Orders</Link>
            <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
            <a href="#app-download-container">App</a>
          </div>

          <div className="navbar__actions">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="navbar__btn navbar__btn--ghost">
                  Logout
                </button>
                <Link to="/profile" className="navbar__profile">
                  <img src={assets.profile} alt="Profile" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__btn navbar__btn--ghost">
                  Login
                </Link>
                <Link to="/register" className="navbar__btn navbar__btn--primary">
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/cart" className="navbar__cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="navbar__cart-dot"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;