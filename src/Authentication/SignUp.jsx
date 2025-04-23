import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { validateUsername, validatePassword, validatePasswordMatch, usePasswordToggle } from "./Authentication";
import invisibleIcon from "../assets/img/invisible.png";
import visibleIcon from "../assets/img/visible.png";
import "./Authentication.css";
import { set } from "lodash";

function Signup() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

   // Use the custom hook for toggling password visibility
   const [showPassword, togglePasswordVisibility] = usePasswordToggle();
   const [showConfirmPassword, toggleConfirmPasswordVisibility] = usePasswordToggle();

   const [passwordValidations, setPasswordValidations] = useState({
    lengthValid: false,
    charValid: false,
  });

  // Username validation
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      setIsUsernameValid(validateUsername(value));
    }

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

  const validateForm = () => {
    const newErrors = [];

    if (!validateUsername(formData.username)) {
      newErrors.push("Username must begin with a letter and can include letters, digits, or underscores.");
    }

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

    const newErrors = validateForm();
    if (newErrors.length > 0) {
      alert(newErrors.join("\n"));  
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          fname: "",
          lname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        alert("Account created successfully! 🎉🎉🎉\n Please login to continue.");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/LogIn";
        }, 500);
        } else {
          const data = await response.json();
          console.log("Backend response:", data); // Debugging
          alert(data.errors?.join("\n"));    
        }
      } 
      catch (error) {
        alert("An error occurred. Please try again later.");
      }
  };

  return (
    <section className="signup-container">
      <div className="form-container">
        <div className="form-header">
          <p className="p1">Register Account</p>
          <p className="p2">Hello new user!</p>
          <p className="p3">Register to control your dear home 😊</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {successMessage && <p className="success-message">{successMessage}</p>}

          <input
            type="text"
            placeholder="First name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            maxLength="255"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            maxLength="255"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength="255"
            required
          />
          <input
            className="username"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            maxLength="255"
            required
          />
          <div className="acc-requirement">
            <p>Username must:</p>
            <ul>
              <li className={isUsernameValid ? "valid" : "invalid"}>
                begin with 1 letter and followed by letter(s), digit(s), or underscore(s)
              </li>
            </ul>
          </div>

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
              src={showPassword ? invisibleIcon : visibleIcon}
              className="toggle-password"
              width="20"
              height="20"
              alt="visible icon"
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
              src={showConfirmPassword ? invisibleIcon : visibleIcon}
              className="toggle-password-cf"
              width="20"
              height="20"
              alt="visible icon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          <button type="submit">Create account</button>
        </form>

        <p>
            Already have an account? &nbsp;
            <span>
            <NavLink to="/LogIn" activeclassname="active-link">
              Login
            </NavLink>          
            </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;
