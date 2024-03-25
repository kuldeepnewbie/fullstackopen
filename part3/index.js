require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const PhoneBook = require('./models/phonebook')

// let phonebook = [
// 	{
// 		'id': 1,
// 		'name': 'Arto Hellas',
// 		'number': '040-123456'
// 	},
// 	{
// 		'id': 2,
// 		'name': 'Ada Lovelace',
// 		'number': '39-44-5323523'
// 	},
// 	{
// 		'id': 3,
// 		'name': 'Dan Abramov',
// 		'number': '12-43-234345'
// 	},
// 	{
// 		'id': 4,
// 		'name': 'Mary Poppendieck',
// 		'number': '39-23-6423122'
// 	}
// ]
morgan.token('body', (request) => JSON.stringify(request.body))

app.get('/info',(request,response, next) => {
	const date = new Date()
	PhoneBook.find({}).then(result => {
		response.send(`<p>Phonebook has info for ${result.length} persons</p><br>
		<p>${date}</p>`)
	}).catch(error => next(error))
	// response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`)
})
app.get('/api/phonebook',(request,response,next) => {
	PhoneBook.find({}).then(result => {
		response.json(result)
	}).catch(error => next(error))
	// response.json(phonebook)
})
app.get('/api/phonebook/:id',(request,response, next) => {
	PhoneBook.findById(request.params.id).then(phone => {
		if(phone){
			response.json(phone)
		}else{
			response.status(404).end()
		}
	}).catch(error => next(error))
	// const id = Number(request.params.id)
	// const data = phonebook.find(note => note.id === id)
	// if(data){
	// 	response.json(data)
	// }else{
	// 	response.status(404).end()
	// }
})
app.delete('/api/phonebook/:id',(request,response,next) => {
	// const id = Number(request.params.id)
	// Find the index of the contact in the phonebook array
	// const index = phonebook.findIndex(entry => entry.id === id)
	// if (index !== -1) {
	// 	// Remove the contact from the array
	// 	phonebook.splice(index, 1)
	// 	response.status(204).end() // 204 No Content indicates successful deletion
	// } else {
	// 	response.status(404).end() // 404 Not Found if the contact with the given ID is not found
	// }
	PhoneBook.findByIdAndDelete(request.params.id).then(() => {
		response.status(204).end()
	}).catch(error => next(error))
})
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.post('/api/phonebook',postMorgan,(request,response,next) => {
	const body = request.body
	if(!body || !body.name || !body.number){
		return response.status(400).json({ error:'Name and number are required' })
	}
	const phoneBookEntry = new PhoneBook({
		name: body.name,
		number: Number(body.number),
	})
	phoneBookEntry.save().then(phone => {
		response.json(phone)
	}).catch(error => {
		console.log(error)
		if (error.name === 'ValidationError') {
			return response.status(400).json({ error: error.message })
		} else {
			// For other types of errors, pass the error to the error handling middleware
			return next(error)
		}
	})
})

app.put('/api/phonebook/:id', (request, response, next) => {
	const { name, number } = request.body
	PhoneBook.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPhoneBook => {
			if (!updatedPhoneBook) {
				return response.status(404).json({ error: 'Not Found' })
			}
			response.json(updatedPhoneBook)
		})
		.catch(error => {
			if (error.name === 'ValidationError') {
				return response.status(400).json({ error: error.message })
			} else {
				// For other types of errors, pass the error to the error handling middleware
				return next(error)
			}
		})
})

const port = 3001
app.listen(port)