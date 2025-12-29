import React, { useState } from "react";
import "./admin_login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/user/login`, credentials);
      if (response.status === 200 && response.data.user.role === "admin") {
        toast.success("Welcome back, Admin!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.user.role);
        window.dispatchEvent(new Event("authChange"));
        navigate("/admin");
      } else {
        toast.error("Access denied! Admin privileges required.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* Visual Section */}
        <div className="admin-visual">
          <div className="admin-visual-content">
            <div className="admin-icon">🛡️</div>
            <h2>Admin Portal</h2>
            <p>Secure access to PizzaCraft management dashboard.</p>
            <div className="admin-features">
              <div className="admin-feature">
                <span>📊</span>
                <span>Dashboard Analytics</span>
              </div>
              <div className="admin-feature">
                <span>🍕</span>
                <span>Pizza Management</span>
              </div>
              <div className="admin-feature">
                <span>📦</span>
                <span>Order Tracking</span>
              </div>
              <div className="admin-feature">
                <span>👥</span>
                <span>User Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="admin-form-section">
          <div className="admin-form-container">
            <div className="admin-form-header">
              <span className="admin-badge">🔐 Restricted Access</span>
              <h1>Admin Sign In</h1>
              <p>Enter your admin credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@pizzacraft.com"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="admin-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>Access Dashboard</>
                )}
              </button>
            </form>

            <div className="admin-form-footer">
              <p>
                Not an admin? <Link to="/login">User Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;