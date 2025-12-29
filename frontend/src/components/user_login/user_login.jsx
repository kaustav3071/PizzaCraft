import "./user_login.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
    const url = import.meta.env.VITE_API_URL;
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${url}/user/login`, loginData);
            if (response.status === 200) {
                toast.success("Login successful!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userRole", response.data.user.role);
                // Dispatch custom event to notify navbar
                window.dispatchEvent(new Event("authChange"));
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-visual">
                    <div className="auth-visual-content">
                        <span className="auth-emoji">🍕</span>
                        <h2>Welcome Back!</h2>
                        <p>Login to order your favorite pizzas and track your deliveries.</p>
                    </div>
                </div>

                <div className="auth-form-section">
                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h1>Sign In</h1>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
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
                                        value={loginData.email}
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
                                        placeholder="Enter your password"
                                        required
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="auth-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>Sign In</>
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?
                                <Link to="/register">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;