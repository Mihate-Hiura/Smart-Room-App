import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import invisibleIcon from "../assets/img/invisible.png";
import visibleIcon from "../assets/img/visible.png";
import { usePasswordToggle } from "./Authentication";
import "./Authentication.css";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

const [showPassword, togglePasswordVisibility] = usePasswordToggle();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate an API call to authenticate the user
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // Store the username in a cookie - get username if input is email
        document.cookie = `username=${data.username}; path=/; max-age=86400`; // Expires in 1 day
        console.log("Cookie set:", document.cookie);
        // Redirect to the home page or dashboard
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const data = await response.json();
        if (data.errors?.includes("Username or Email does not exist!")) {
            // Show confirm dialog
            const redirectToSignUp = confirm(data.errors.join("\n"));
            if (redirectToSignUp) {
              // Redirect to the SignUp page
              window.location.href = "/SignUp";
            }
          } else {
            alert(data.errors?.join("\n"));
          }      
        }
    } catch (error) {
      alert(["An error occurred!. Please try again later."]);
    }
  };

  return (
    <section className="signin-container">
      <div className="form-container">
        <div className="form-header">
          <p className="p1">Sign In</p>
          <p className="p2">Welcome back home!</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
            </div>
          )}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <input
            className="username"
            type="text"
            placeholder="Email or username"
            name="usernameEmail"
            value={formData.usernameEmail}
            onChange={handleChange}
            required
          />

          <div className="password-container">
            <input
              className="password"
              type={showPassword ? "text" : "password"} autoComplete="current-password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? invisibleIcon : visibleIcon}
              className="toggle-password"
              width="20"
              height="20"
              alt="visible icon"
              onClick={togglePasswordVisibility}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <NavLink className="forgot-password" to="/ForgotPassword">
          Forgot password?
        </NavLink>

        <p>
          Don't have an account? &nbsp;
          <span>
            <NavLink to="/SignUp">Register Now</NavLink>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
