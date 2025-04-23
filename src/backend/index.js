const express = require('express');
require('dotenv').config();

const usersRoutes = require('./routes/user');

const app = express();
app.use(express.json());

// Use the user routes
app.use('/api/user', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));