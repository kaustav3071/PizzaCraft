import React from "react";
import "./Features.css";

const Features = () => {
    const features = [
        {
            icon: "🥬",
            title: "Fresh Ingredients",
            description: "We source only the finest, locally-grown ingredients. Fresh vegetables, premium meats, and authentic Italian cheeses.",
            color: "#22c55e"
        },
        {
            icon: "⚡",
            title: "Fast Delivery",
            description: "Hot and fresh in 30 minutes or less. Track your order in real-time from our kitchen to your doorstep.",
            color: "#FF6B35"
        },
        {
            icon: "💰",
            title: "Best Prices",
            description: "Premium quality at affordable prices. Weekly deals and loyalty rewards for our valued customers.",
            color: "#3b82f6"
        },
        {
            icon: "🏅",
            title: "Quality Guaranteed",
            description: "Every pizza is crafted with love and backed by our 100% satisfaction guarantee. Not happy? We'll make it right.",
            color: "#E63946"
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-header">
                    <span className="features-badge">Why Choose Us</span>
                    <h2 className="features-title">
                        The PizzaCraft <span className="highlight">Difference</span>
                    </h2>
                    <p className="features-subtitle">
                        What makes us the preferred choice for pizza lovers
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index} style={{ '--accent-color': feature.color }}>
                            <div className="feature-icon-wrapper">
                                <span className="feature-icon">{feature.icon}</span>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                            <div className="feature-accent"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
