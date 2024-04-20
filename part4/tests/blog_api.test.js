const mongoose = require('mongoose')
const supertest = require('supertest')
var bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  // Delete all documents from the User collection
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("1234", 10)
  const user = new User({
    username: "kuldeep",
    name: "kkkkk",
    blogs: [],
    passwordHash
  })
  //This saves the newly created user object to the database.
  await user.save()
}, 100000)

// beforeEach hook to run before each test
beforeEach(async () => {
  // Remove all documents from the Blog collection
  await Blog.deleteMany({})

  // Find all users in the User collection
  const users = await User.find({})

  // Get the first user (assuming at least one user exists)
  const user = users[0]

  // Create an array of new Blog objects based on helper.initialBlogs
  const blogObjects = helper.initialBlogs.map(blog => new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: user._id, // Associate the blog with the user
    likes: blog.likes ? blog.likes : 0 // Set likes to provided value or default to 0
  }))

  // Create an array of promises to save each blog and update user's blogs array
  const promiseArray = blogObjects.map(blog => {
    blog.save() // Save the blog to the database
    user.blogs = user.blogs.concat(blog._id) // Add the blog's ID to the user's blogs array
  })

  // Execute all promises concurrently
  await Promise.all(promiseArray)

  // Save the updated user object
  await user.save()
}, 100000) // Timeout specified for the beforeEach hook


describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog).toBeDefined()
  })
})

describe('viewing a specific blog', () => {

  test('a valid blog can be added by authorized users', async () => {
    const user = {
      username: "kuldeep",
      password: "1234",
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).toContain(
      'Type wars'
    )
  }, 100000)

  test('a blog cannot be added by unauthorized users', async () => {
    const newBlog = {
      title: 'Typaaae wars',
      author: 'Robeaaart C. Martin',
      url: 'http://aaablog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).not.toContain(
      'Type wars'
    )
  }, 100000)

  test('new blog without likes property will be set to 0', async () => {
    const user = {
      username: "kuldeep",
      password: "1234",
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'Typefghfhgfhg wars',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWarsgfghfhgf.html',
      author: 'Robertdsjflkjfslkd C. Martin',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${loginUser.body.token}`)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likeLikes = blogsAtEnd.map(n => n.likes)

    expect(likeLikes).toContain(0)
  })

  test('new blog without title property will not be added', async () => {
    const user = {
      username: "kuldeep",
      password: "1234",
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/Typsgfghfhgf.html',
      author: 'Robertdsjflkd C. Martin',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('new blog without url property will not be added', async () => {
    const user = {
      username: "kuldeep",
      password: "1234",
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const newBlog = {
      title: 'dgfshjdfgsjdh',
      author: 'Robertdsjflkd C. Martin'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {

  test('a blog can be deleted', async () => {
    const user = {
      username: "kuldeep",
      password: "1234",
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set('Authorization', `Bearer ${loginUser.body.token}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a note', () => {
  test('the information of an individual blog post is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const newBlog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: 2000000
    }

    await api
      .put(`/api/blogs/${blogToView.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const beforeLikes = blogsAtStart.map(n => n.likes)

    const afterLikes = blogsAtEnd.map(n => n.likes)

    expect(afterLikes).not.toContain(beforeLikes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'miaa',
      name: 'miadhfkjsdhf',
      password: 'moimoi'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username does not exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Ssdsduper',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password and username must be given')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password does not exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Ssdsduper',
      username: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password and username must be given')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Human',
      password: 'alien',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Sususususu',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password or username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is less than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '1234',
      name: 'Superkakakak',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password or username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})