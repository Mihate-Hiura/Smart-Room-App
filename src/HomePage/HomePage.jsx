import React from "react";
import { NavLink } from "react-router-dom";
import { getCookie } from "../App"; 
import "./HomePage.css";

const HomePage = () => {
  const username = getCookie("username");

  return (
    <div className="homepage">
      <header className="header">
        <div className="header-container">
          <h1 className="logo">SmartHome</h1>  
        </div>
      </header>

      <section className="hero">
        <h2 className="hero-title">Welcome to Your Smart Home</h2>
        <p className="hero-description">
          Control your devices, monitor your home, and stay connected from anywhere. Experience the future of smart living with SmartHome.
        </p>
        {!username && (
            <div className="hero-button">
            <NavLink to="/LogIn" className="btn-primary btn-large">
            Get Started
            </NavLink>
        </div>
        )}
      </section>

      <section className="features">
        <div className="feature-item">
          <div className="feature-icon">📱</div>
          <h3>Control Anytime</h3>
          <p>Manage lights, temperature, and more directly from your phone or web app.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>Secure Access</h3>
          <p>Only you can access and monitor your smart devices with secure login and authentication.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📡</div>
          <h3>Real-Time Monitoring</h3>
          <p>Stay updated with live status and alerts from your smart devices.</p>
        </div>
      </section>

      <footer className="footer">
        &copy; 2025 SmartHome Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
