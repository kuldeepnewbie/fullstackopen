/* eslint-disable linebreak-style */
import { useState } from 'react'

const Form = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const submitBlog = (event) => {
    event.preventDefault()
    createBlog({ title:title,author:author,url:url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h2>Create New</h2>
      <form onSubmit={submitBlog}>
        <div>
                    title: <input type="text" name="Title" value={title} onChange={handleTitleChange} placeholder="Write title here" id="title" />
        </div>
        <div>
                    author: <input type="text" name="Author" value={author} onChange={handleAuthorChange} placeholder="Write Author Name here" id="author" />
        </div>
        <div>
                    url: <input type="text" name="Url" value={url} onChange={handleUrlChange} placeholder="Write url here" id="url" />
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}
export default Form