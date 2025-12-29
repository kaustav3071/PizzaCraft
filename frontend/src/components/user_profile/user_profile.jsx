import React, { useState, useEffect } from "react";
import "./user_profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const url = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    address: "",
    isVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view profile");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email, role, address, isVerified } = response.data.user;
        setUserData({
          name: name || "",
          email: email || "",
          role: role || "user",
          address: address || "",
          isVerified: isVerified || false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [url]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <Link to="/login" className="profile-btn">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{getInitials(userData.name)}</span>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-email">{userData.email}</p>
            <div className="profile-badges">
              <span className={`badge badge--role ${userData.role === 'admin' ? 'badge--admin' : ''}`}>
                {userData.role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
              <span className={`badge ${userData.isVerified ? 'badge--verified' : 'badge--unverified'}`}>
                {userData.isVerified ? '✓ Verified' : '✗ Unverified'}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="profile-section">
          <h2 className="section-title">Account Information</h2>
          <div className="profile-cards">
            <div className="info-card">
              <div className="info-card-icon">👤</div>
              <div className="info-card-content">
                <span className="info-label">Full Name</span>
                <span className="info-value">{userData.name}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">📧</div>
              <div className="info-card-content">
                <span className="info-label">Email Address</span>
                <span className="info-value">{userData.email}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">📍</div>
              <div className="info-card-content">
                <span className="info-label">Delivery Address</span>
                <span className="info-value">{userData.address || "Not set"}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">🛡️</div>
              <div className="info-card-content">
                <span className="info-label">Account Status</span>
                <span className={`info-value ${userData.isVerified ? 'text-success' : 'text-warning'}`}>
                  {userData.isVerified ? 'Email Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="profile-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/order" className="action-card">
              <span className="action-icon">📦</span>
              <span className="action-text">My Orders</span>
            </Link>
            <Link to="/cart" className="action-card">
              <span className="action-icon">🛒</span>
              <span className="action-text">View Cart</span>
            </Link>
            <Link to="/menu" className="action-card">
              <span className="action-icon">🍕</span>
              <span className="action-text">Order Pizza</span>
            </Link>
            <Link to="/contact" className="action-card">
              <span className="action-icon">💬</span>
              <span className="action-text">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
