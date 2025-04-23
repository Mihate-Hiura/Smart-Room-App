// Validation functions
export const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]+$/;
  return usernamePattern.test(username);
};

export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  return passwordPattern.test(password);
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Custom hook for toggling password visibility
import { useState } from "react";

export const usePasswordToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return [isVisible, toggleVisibility];
};
