const jwt = require('jsonwebtoken'); // Importing JWT for token generation and verification
var bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing and comparison
const loginRouter = require('express').Router(); // Importing Express Router
const User = require('../models/user'); // Importing the User model

// Route to handle user login
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body; // Extract username and password from request body

  const user = await User.findOne({ username }); // Find user by username
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash); // Compare passwords using bcrypt

  // If user or password is incorrect, return 401 Unauthorized
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  // If user and password are correct, create a token for authentication
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET, // Secret key for token encryption
    { expiresIn: 60*60 } // Token expiration time (1 hour in this case)
  );

  // Respond with token and user details
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter; // Export the loginRouter with the defined route
