const logger = require('./logger'); // Importing logger module for logging
const jwt = require('jsonwebtoken'); // Importing JWT for token verification
const User = require('../models/user'); // Importing the User model

// Middleware to log incoming requests
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method); // Log the HTTP method
    logger.info('Path:  ', request.path); // Log the request path
    logger.info('Body:  ', request.body); // Log the request body
    logger.info('---'); // Log a separator
    next(); // Call the next middleware in the chain
};

// Middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' }); // Send a 404 response for unknown endpoints
};

// Middleware to handle errors
const errorHandler = (error, request, response, next) => {
    logger.error(error.message); // Log the error message

    // Handle specific error types
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' }); // Send a 400 response for a malformatted ID
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message }); // Send a 400 response for validation errors
    } else if (error.name === 'JsonWebTokenError') {    
        return response.status(400).json({ error: error.message }); // Send a 400 response for JWT token errors
    } else if (error.name === 'TokenExpiredError') {    
        return response.status(401).json({ error: 'token expired' }); // Send a 401 response for expired tokens
    }

    next(error); // Call the next middleware in the chain with the error
};

// Middleware to extract JWT token from request headers
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization'); // Get the authorization header

    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', ''); // Extract and set the token if it exists
        return next(); // Call the next middleware in the chain
    }
    
    request.token = null; // Set token to null if it doesn't exist
    next(); // Call the next middleware in the chain
};

// Middleware to extract user information from the JWT token
const userExtractor = async (request, response, next) => {
    if (!request.token) {
        request.user = null; // Set user to null if token doesn't exist
    } else {
        const decodedToken = jwt.verify(request.token, process.env.SECRET); // Verify the token
        if (!decodedToken.id) {    
            request.user = null; // Set user to null if token doesn't contain ID
        } else {
            request.user = await User.findById(decodedToken.id); // Find and set user based on token ID
        }
    }
    
    next(); // Call the next middleware in the chain
}; 

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor 
};
