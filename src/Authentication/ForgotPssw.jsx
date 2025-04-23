import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import rightArrow from "../assets/img/right-arrow-white.png";
import "./Authentication.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate an API call to send the reset password email
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate("/ResetPassword", { state: { email } }); // Pass email to ResetPassword
      } else {
        const data = await response.json();
        alert(data.errors?.join("\n"));
      }
    } catch (error) {
      alert("Database error!. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="form-container">
        <div className="form-header">
          <p className="p1">Forgot Password?</p>
          <p className="p2">Please enter your email to reset your password.</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <button type="submit">
            Continue &nbsp; &nbsp;
            <img
              src={rightArrow}
              alt="right-arrow"
              width="25"
              height="25"
            />
          </button>
        </form>

        <p>
          Don't have an account? &nbsp;
          <span>
            <NavLink to="/SignUp">Register Now</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

