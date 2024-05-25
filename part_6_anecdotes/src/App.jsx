import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './store/anecdoteSlice'
import Form from './components/Form'
const App = () => {
  //anecdotes should match the key used in store.js
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  
  const handleVote = (id) => {
    console.log(id)
    dispatch(vote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

    // Sort anecdotes by votes in descending order
    // Immutability: This approach (using variable inside anecdotes) creates a new array by spreading the anecdotes array, which ensures that the original anecdotes array is not modified.
    const sortedAnecdotes = [...anecdotes].sort((a,b)=>b.votes-a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <Form addAnecdote={addAnecdote} />
    </div>
  )
}

export default App
