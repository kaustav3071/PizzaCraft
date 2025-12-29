import React from "react";
import "./about.css";

const About = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-header">
                    <span className="section-badge">Our Story</span>
                    <h2 className="section-title">
                        More Than Just <span className="highlight">Pizza</span>
                    </h2>
                    <p className="section-subtitle">
                        A passion for perfection, one slice at a time
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <p className="about-lead">
                            Born from a love of authentic Italian cuisine, PizzaCraft has been
                            serving the community with handcrafted pizzas since 2010.
                        </p>
                        <p>
                            Every pizza we create is a masterpiece — from our hand-stretched dough
                            made fresh daily, to our signature tomato sauce crafted from San Marzano
                            tomatoes, topped with premium ingredients sourced from trusted local farms.
                        </p>
                        <p>
                            We believe great pizza brings people together. That's why we're committed
                            to delivering not just food, but memorable experiences to every table.
                        </p>
                    </div>

                    <div className="about-stats-grid">
                        <div className="about-stat-card">
                            <div className="stat-icon">🍕</div>
                            <h3 className="stat-value">15+</h3>
                            <p className="stat-description">Years of Excellence</p>
                        </div>
                        <div className="about-stat-card">
                            <div className="stat-icon">👨‍🍳</div>
                            <h3 className="stat-value">25+</h3>
                            <p className="stat-description">Expert Chefs</p>
                        </div>
                        <div className="about-stat-card">
                            <div className="stat-icon">🏆</div>
                            <h3 className="stat-value">100K+</h3>
                            <p className="stat-description">Pizzas Delivered</p>
                        </div>
                        <div className="about-stat-card">
                            <div className="stat-icon">⭐</div>
                            <h3 className="stat-value">4.9</h3>
                            <p className="stat-description">Customer Rating</p>
                        </div>
                    </div>
                </div>

                <div className="about-values">
                    <div className="value-card">
                        <div className="value-icon">🌿</div>
                        <h4>Fresh Ingredients</h4>
                        <p>Only the freshest, locally-sourced ingredients make it into our kitchen</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">❤️</div>
                        <h4>Made with Love</h4>
                        <p>Every pizza is handcrafted with passion and attention to detail</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🚀</div>
                        <h4>Fast Delivery</h4>
                        <p>Hot pizzas delivered to your door in 30 minutes or less</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;