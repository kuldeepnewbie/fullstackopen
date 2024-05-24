/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://localhost.com',
    likes: 100,
    user:{
      id:'kkkk'
    }
  }
  const user = {
    id: 'kkkk',
    name:'kkk'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.whenHidden')
  expect(div).toHaveTextContent(
    'Robert C. Martin'
  )
  expect(div).toHaveTextContent(
    'First class tests'
  )
  expect(div).not.toHaveTextContent(
    'http://localhost.com'
  )
  expect(div).not.toHaveTextContent(
    100
  )
})