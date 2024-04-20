var bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const usersRouter = require('express').Router(); // Importing Express Router
const User = require('../models/user'); // Importing the User model

// Route to get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 }); // Find all users and populate their blogs with selected fields
    response.json(users); // Respond with the list of users as JSON
});

// Route to create a new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body; // Extract username, name, and password from request body

    // Check if username and password are provided
    if (password === undefined || username === undefined) {
        return response.status(400).json({ error: 'password and username must be given' });
    } else if (password.length < 3 || username.length < 3) { // Check if password and username are at least 3 characters long
        return response.status(400).json({ error: 'password or username must be at least 3 characters long' });
    } else {
        const saltRounds = 10; // Number of salt rounds for bcrypt hashing
        const passwordHash = await bcrypt.hash(password, saltRounds); // Hash the password using bcrypt

        // Create a new user object with username, name, and hashed password
        const user = new User({
            username,
            name,
            passwordHash,
        });

        // Save the new user to the database
        const savedUser = await user.save();

        // Respond with the saved user details
        response.status(201).json(savedUser);
    }
});

module.exports = usersRouter; // Export the usersRouter with the defined routes
