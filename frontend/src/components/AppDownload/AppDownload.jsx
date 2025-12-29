import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
    return (
        <section className="app-download-section" id="app-download-container">
            <div className="app-download-wrapper">
                <div className="app-download-content">
                    <span className="app-badge">📱 Mobile App</span>
                    <h2 className="app-title">
                        Get the <span className="highlight">PizzaCraft</span> App
                    </h2>
                    <p className="app-description">
                        Order your favorite pizzas faster than ever! Track your delivery in real-time,
                        earn rewards, and get exclusive app-only deals.
                    </p>
                    <ul className="app-features-list">
                        <li>🎯 Easy one-tap ordering</li>
                        <li>📍 Real-time delivery tracking</li>
                        <li>🎁 Exclusive rewards & offers</li>
                    </ul>
                    <div className="app-store-buttons">
                        <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer" className="store-button">
                            <img src={assets.playstore} alt="Get it on Google Play" />
                        </a>
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="store-button">
                            <img src={assets.appstore} alt="Download on App Store" />
                        </a>
                    </div>
                </div>
                <div className="app-visual">
                    <div className="phone-mockup">
                        <div className="phone-screen">
                            <div className="app-preview-content">
                                <div className="preview-header">🍕 PizzaCraft</div>
                                <div className="preview-pizza">🍕</div>
                                <div className="preview-text">Order Now!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;