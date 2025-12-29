import React, { useState, useEffect } from "react";
import "./contact.css";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email } = response.data.user;
        setFormData((prev) => ({
          ...prev,
          name: name || "",
          email: email || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/contact`, formData);
      if (response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData((prev) => ({ ...prev, message: "" }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Info Section */}
        <div className="contact-info">
          <div className="contact-info-content">
            <span className="contact-badge">📬 Get in Touch</span>
            <h1>We'd Love to Hear From You</h1>
            <p>Have a question, feedback, or just want to say hello? Drop us a message and we'll get back to you as soon as possible.</p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-item-icon">📍</span>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Pizza Street, Food City, India</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 123 456 7890</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon">📧</span>
                <div>
                  <h4>Email Us</h4>
                  <p>pizzaCraft17@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon">⏰</span>
                <div>
                  <h4>Hours</h4>
                  <p>Mon - Sun: 10AM - 11PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send a Message</h2>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!!formData.name}
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
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!!formData.email}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <div className="textarea-wrapper">
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>Send Message 🚀</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;