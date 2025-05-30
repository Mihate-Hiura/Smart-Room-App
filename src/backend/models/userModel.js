const db = require('../db.js');
const bcrypt = require('bcrypt');

const createAccount = async (username, email, password, fname, lname) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const result = await db.query(
    'INSERT INTO account (username, email, password, fname, lname) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [username, email, hashedPassword, fname, lname]
  );
  return result.rows[0];
};

const getAllAccounts = async () => {
  const result = await db.query('SELECT * FROM account');
  return result.rows;
};

const isUsernameTaken = async (username) => {
  const result = await db.query(
    'SELECT * FROM account WHERE username = $1',
    [username]
  );
  return result.rows.length > 0; // Returns true if a match is found
};

const isEmailTaken = async (email) => {
  const result = await db.query(
    'SELECT * FROM account WHERE email = $1',
    [email]
  );
  return result.rows.length > 0; // Returns true if a match is found
};

const isEmailorUsernameExist = async (input) => {
    const result = await db.query(
        'SELECT * FROM account WHERE username = $1 OR email = $2',
        [input, input]
    );
    return result.rows.length > 0; // Returns true if a match is found
};

const validatePassword = async (input, password) => {
    const result = await db.query(
        'SELECT password FROM account WHERE (username = $1 OR email = $2)',
        [input, input]
    );
    const hashedPassword = result.rows[0]?.password;
    return await bcrypt.compare(password, hashedPassword);
};

const resetPassword = async (email, newPassword) => {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Update the password in the database
    const result = await db.query(
      'UPDATE account SET password = $1 WHERE email = $2 RETURNING *',
      [hashedPassword, email]
    );
    return result.rows[0];
};

const getUsername = async (input) => {
  const result = await db.query(
    'SELECT * FROM account WHERE username = $1 OR email = $2',
    [input, input]
  );
  return result.rows[0]; // Return the first matching account
};

const updateAccount = async (uname, fname, lname) => {
  const result = await db.query(
    'UPDATE account SET fname = $1, lname = $2 WHERE username = $3 RETURNING *',
    [fname, lname, uname]
  );
  return result.rows[0];
};

const delAccount = async (uname) => {
  const result = await db.query(
    'DELETE FROM account WHERE username = $1 RETURNING *',
    [uname]
  );
}

module.exports = {
    createAccount,
    getAllAccounts,
    isUsernameTaken,
    isEmailTaken,
    isEmailorUsernameExist,
    validatePassword,
    resetPassword,
    getUsername,
    updateAccount,
    delAccount
  };
  