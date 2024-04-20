const blogsRouter = require('express').Router(); // Importing Express Router
const Blog = require('../models/blog'); // Importing the Blog model

// Route to get all blog posts
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }); // Fetch all blogs and populate user details
    response.json(blogs); // Send the list of blogs as JSON
});

// Route to get a specific blog post by ID
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id); // Find blog by ID
    if (blog) {
        response.json(blog); // Send the blog details as JSON if found
    } else {
        response.status(404).end(); // Return 404 if blog not found
    }
});

// Route to create a new blog post
blogsRouter.post('/', async (request, response) => {
    const body = request.body; // Get the request body containing blog data

    const user = request.user; // Get the authenticated user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' }); // Return error if user not authenticated
    }

    const blog = new Blog({ // Create a new blog object
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id // Associate the blog with the authenticated user
    });

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end(); // Return 400 if title or URL is missing
    } else {
        const savedBlog = await blog.save(); // Save the new blog post
        user.blogs = user.blogs.concat(savedBlog._id); // Update user's blogs with new blog ID
        await user.save(); // Save the updated user
        response.status(201).json(savedBlog); // Send the saved blog post as JSON
    }
});

// Route to delete a blog post by ID
blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user; // Get the authenticated user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' }); // Return error if user not authenticated
    }

    const blog = await Blog.findById(request.params.id); // Find blog by ID
    if (blog.user.toString() === request.user.id) { // Check if authenticated user is the author of the blog
        await Blog.findByIdAndRemove(request.params.id); // Delete the blog post
        response.status(204).end(); // Return 204 if blog deleted successfully
    } else {
        return response.status(401).json({ error: 'Unauthorized to delete the blog' }); // Return error if user is not authorized to delete the blog
    }
});

// Route to update a blog post by ID
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body; // Get the request body containing updated blog data

    const blog = { // Create an object with updated blog details
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    };

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }); // Update the blog post
    response.json(blog); // Send the updated blog details as JSON
});

module.exports = blogsRouter; // Export the blogsRouter with defined routes
