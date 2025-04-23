const express = require('express');
const userModel = require('../models/userModel');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { username, email, password, fname, lname } = req.body;

  try {
    // Check if username or email is already taken
    if (await userModel.isUsernameTaken(username)) {
      return res.status(400).json({ errors: ["Username already exists!", "Please choose a different username or log in to continue"] });
    }
    if (await userModel.isEmailTaken(email)) {
      return res.status(400).json({ errors: ["Email already exists!", "Please choose a different email or log in to continue"] });
    }

    // Create the user
    const account = await userModel.createAccount(username, email, password, fname, lname);
    res.status(201).json({ username: account.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["An unexpected error occurred. Please try again later."] });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { usernameEmail, password } = req.body;
    try {
      // Check if the account exists
      const isAccountValid = await userModel.isEmailorUsernameExist(usernameEmail);
      if (!isAccountValid) {
        return res.status(401).json({ errors: ["Username or Email does not exist!", "Would you like to create an account?"] });
      }
  
      // Validate the password
      const isPasswordValid = await userModel.validatePassword(usernameEmail, password);
      if (!isPasswordValid) {
        return res.status(401).json({ errors: ["Invalid username/email or password!"] });
      }
      const account = await userModel.getUsername(usernameEmail);  
      res.status(200).json({ 
        message: "Login successful!",
        username: account.username
       });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["An errors occurred. Please try again later."] });
    }
});

// Update Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    if (!await userModel.isEmailTaken(email)) {
      return res.status(400).json({ errors: ["Email does not exist!", "Input again or Register to continue!"] });
    }
    console.log("Email to reset password", email);
    res.status(200).json({email: email});
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["An unexpected error occurred. Please try again later."] });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
  const updatedAccount = await userModel.resetPassword(email, newPassword);
    if (updatedAccount) {
      res.status(200).json({ message: "Password reset successfully!" });
    } else {
      res.status(400).json({ errors: ["Failed to reset password. Please try again."] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["An unexpected error occurred. Please try again later."] });
  }
});

module.exports = router;