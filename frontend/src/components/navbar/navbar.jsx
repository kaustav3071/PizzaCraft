import React, { useState, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const url = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("Admin");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const checkAdminAuth = () => {
            const token = localStorage.getItem("token");
            const userRole = localStorage.getItem("userRole");
            setIsAdminLoggedIn(!!token && userRole === "admin");
        };

        checkAdminAuth();

        // Listen for auth changes
        window.addEventListener("authChange", checkAdminAuth);
        return () => window.removeEventListener("authChange", checkAdminAuth);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userRole = localStorage.getItem("userRole");
                if (token && userRole === "admin") {
                    const response = await axios.get(`${url}/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserName(response.data.user.name || "Admin");
                }
            } catch (error) {
                console.error("Error fetching user data");
            }
        };
        fetchUserData();
    }, [url, isAdminLoggedIn]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                await axios.post(`${url}/user/logout`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            // Dispatch auth change event to update navbar
            window.dispatchEvent(new Event("authChange"));
            navigate("/admin_login");
        } catch (error) {
            console.error("Logout failed:", error);
            // Still clear localStorage and redirect even if API call fails
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("authChange"));
            navigate("/admin_login");
        }
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: "/admin", label: "Dashboard", icon: "📊" },
        { path: "/admin/users", label: "Users", icon: "👥" },
        { path: "/admin/orders", label: "Orders", icon: "📦" },
        { path: "/admin/inventory", label: "Inventory", icon: "📋" },
        { path: "/admin/pizza_dashboard", label: "Pizzas", icon: "🍕" },
    ];

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar__container">
                {/* Logo Section */}
                <div className="admin-navbar__brand">
                    <Link to={isAdminLoggedIn ? "/admin" : "/admin_login"} className="admin-navbar__logo">
                        <img src={assets.logo} alt="PizzaCraft" />
                        <span>PizzaCraft</span>
                    </Link>
                    <span className="admin-navbar__badge">Admin</span>
                </div>

                {isAdminLoggedIn ? (
                    <>
                        {/* Mobile Toggle */}
                        <button
                            className={`admin-navbar__toggle ${isMenuOpen ? "active" : ""}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        {/* Navigation */}
                        <div className={`admin-navbar__menu ${isMenuOpen ? "active" : ""}`}>
                            <ul className="admin-navbar__links">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className={`admin-navbar__link ${isActive(link.path) ? "active" : ""}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="link-icon">{link.icon}</span>
                                            <span className="link-text">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* User Section */}
                            <div className="admin-navbar__user">
                                <div className="admin-navbar__profile">
                                    <img src={assets.profile} alt="Profile" />
                                    <div className="profile-info">
                                        <span className="profile-name">{userName}</span>
                                        <span className="profile-role">Administrator</span>
                                    </div>
                                </div>
                                <button className="admin-navbar__logout" onClick={handleLogout}>
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="admin-navbar__menu">
                        <div className="admin-navbar__user">
                            <Link to="/admin_login" className="admin-navbar__login-btn">
                                <span>🔐</span>
                                <span>Login</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;