// eslint-disable-next-line react/prop-types
const Form = ({addAnecdote}) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}
export default Form