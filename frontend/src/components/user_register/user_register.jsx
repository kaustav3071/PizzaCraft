import "./user_register.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserRegister = () => {
    const url = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({ name: "", email: "", password: "", address: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${url}/user/register`, userData);
            if (response.status === 201) {
                toast.success("Registration successful! Please verify your email.");
                localStorage.setItem("token", response.data.token);
                navigate("/login");
            } else {
                toast.error("Registration failed! Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Registration failed! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container auth-container--register">
                <div className="auth-visual">
                    <div className="auth-visual-content">
                        <span className="auth-emoji">🍕</span>
                        <h2>Join PizzaCraft!</h2>
                        <p>Create an account to enjoy exclusive deals and track your orders.</p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <span>🎁</span>
                                <span>Exclusive Offers</span>
                            </div>
                            <div className="auth-feature">
                                <span>⚡</span>
                                <span>Fast Checkout</span>
                            </div>
                            <div className="auth-feature">
                                <span>📦</span>
                                <span>Order Tracking</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-section">
                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p>Fill in your details to get started</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={userData.email}
                                        onChange={handleChange}
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
                                        placeholder="Create a password (min 6 chars)"
                                        required
                                        minLength="6"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Delivery Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📍</span>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Enter your delivery address"
                                        required
                                        value={userData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="auth-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>Create Account</>
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account?
                                <Link to="/login">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
