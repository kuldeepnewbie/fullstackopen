/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Form from './components/Form'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  const [refreshBlog, setRefreshBlog] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }, [refreshBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.createBlog(blogObject).then(blog => {
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setRefreshBlog(!refreshBlog)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleLogout = logout => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setRefreshBlog(!refreshBlog)
  }

  const deleteBlog = async id => {
    await blogService.remove(id)
    setRefreshBlog(!refreshBlog)
  }
  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            Username <input type='text' value={username} name='Username' onChange={({ target }) => setUserName(target.value)} />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (<div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <Form createBlog={addBlog} />
      </Togglable>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} user={user} />
      )}
    </div>)
  }
}
export default App