import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validatePassword, validatePasswordMatch, usePasswordToggle } from "./Authentication";
import { getCookie } from "../App";

import "./Authentication.css";
import visibleIcon from "../assets/img/visible.png";
import invisibleIcon from "../assets/img/invisible.png";
import right_arrow from "../assets/img/right-arrow-white.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, togglePasswordVisibility] = usePasswordToggle();
  const [showConfirmPassword, toggleConfirmPasswordVisibility] = usePasswordToggle();

  const [passwordValidations, setPasswordValidations] = useState({
    lengthValid: false,
    charValid: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordValidations({
        lengthValid: value.length >= 8,
        charValid: /[a-zA-Z]/.test(value) && /[0-9!@#$%^&*]/.test(value),
      });
    }

    if (name === "password" || name === "confirmPassword") {
      const isMatch = validatePasswordMatch(
        name === "password" ? value : formData.password,
        name === "confirmPassword" ? value : formData.confirmPassword
      );

      const confirmPasswordInput = document.querySelector(".password-cf");
      if (confirmPasswordInput) {
        confirmPasswordInput.classList.toggle("valid-border", isMatch);
        confirmPasswordInput.classList.toggle("invalid-border", !isMatch);
      }
    }

  };

  // Retrieve email from navigation state
  const email = useLocation().state?.email;
  var username = "";
  // if email is null, get username from cookie
  if (!email) {
    username= getCookie("username");
    console.log("Username from cookie:", username);
  }


  const validateForm = () => {
    const newErrors = [];

    if (!validatePassword(formData.password)) {
      newErrors.push("Password must be at least 8 characters long and include letters, digits, or special characters.");
    }

    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.push("Passwords do not match.");
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (newErrors.length > 0) {
      alert(newErrors.join("\n"));  
      return;
    }

    try {
      // Simulate an API call to reset the password
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, newPassword: formData.password }),
      });

      if (response.ok) {
        alert("Password reset successfully!\nLog In to continue.");
        setTimeout(() => {
          navigate("/LogIn"); // Redirect to login page
        }, 500);
      } else {
        const data = await response.json();
        alert(data.errors.join("\n"));
      }
    } catch (error) {
      alert("Database error!. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="form-container">
        <div className="form-header">
          <p className="p1">Reset Password</p>
          <p className="p2">Please enter your new password below:</p>
        </div>

        <form className="reset-form" onSubmit={handleSubmit}>

          <div className="password-container">
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? visibleIcon : invisibleIcon}
              className="toggle-password"
              width="20"
              height="20"
              alt="toggle visibility"
              onClick={togglePasswordVisibility}
            />
          </div>

          <div className="acc-requirement">
            <p>Password must include:</p>
            <ul>
              <li className={passwordValidations.lengthValid ? "valid" : "invalid"}>
                at least 8 characters
              </li>
              <li className={passwordValidations.charValid ? "valid" : "invalid"}>
                both letter(s) and digit(s) and (or) special characters: ., !, @, #, $, %, ^, &, *
              </li>
            </ul>
          </div>

          <div className="password-container">
            <input
              className="password-cf"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <img
              src={showConfirmPassword ? visibleIcon : invisibleIcon}
              className="toggle-password-cf"
              width="20"
              height="20"
              alt="toggle visibility"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          <button type="submit">
            Continue &nbsp; &nbsp;
            <img
              src={right_arrow}
              alt="right-arrow"
              width="25"
              height="25"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

