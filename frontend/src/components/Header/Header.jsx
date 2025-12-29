import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-badge">🍕 #1 Pizza Delivery in Town</div>
                <h1 className="hero-title">
                    Crafted with <span className="gradient-text">Passion</span>,
                    <br />
                    Delivered with <span className="gradient-text">Love</span>
                </h1>
                <p className="hero-description">
                    Experience the authentic taste of handcrafted pizzas made with fresh ingredients,
                    baked to perfection, and delivered hot to your doorstep.
                </p>
                <div className="hero-buttons">
                    <Link to="/menu" className="btn-primary">
                        <span>Explore Menu</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link to="/menu" className="btn-secondary">
                        🔥 Today's Specials
                    </Link>
                </div>
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">50K+</span>
                        <span className="stat-label">Happy Customers</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">4.9</span>
                        <span className="stat-label">Rating ⭐</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">30min</span>
                        <span className="stat-label">Avg Delivery</span>
                    </div>
                </div>
            </div>
            <div className="hero-decoration">
                <div className="floating-pizza pizza-1">🍕</div>
                <div className="floating-pizza pizza-2">🧀</div>
                <div className="floating-pizza pizza-3">🌿</div>
            </div>
        </section>
    );
};

export default Header;