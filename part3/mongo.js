// Importing the mongoose library, which helps us interact with MongoDB.
const mongoose = require('mongoose')

// Checking if the user provided a password as a command line argument.
if (process.argv.length < 3) {
	// If not, we print a message asking them to provide the password and exit the program.
	console.log('give password as argument')
	process.exit(1) // Exiting the program with an error code.
}

// Storing the password provided by the user from the command line.
const password = process.argv[2]

// Constructing the URL to connect to our MongoDB database, including the password.
const url = `mongodb+srv://fullstack:${password}@cluster0.gu92ay7.mongodb.net/phoneBook?retryWrites=true&w=majority`

// Configuring mongoose to allow more flexible querying (not strict).
mongoose.set('strictQuery', false)

// Connecting to the MongoDB database using the constructed URL.
mongoose.connect(url)

// Defining the schema for the documents in our 'phoneBook' collection.
const phoneBookSchema = new mongoose.Schema({
	name: String, // Name of the person in the phone book.
	number: Number, // Their phone number.
})

// Creating a model based on the defined schema, which represents our 'phoneBook' collection.
const Phone = mongoose.model('Phone', phoneBookSchema)

// Depending on the number of command line arguments provided:
if(process.argv.length===3){
	// If there are only 3 arguments, we assume the user wants to view all entries in the phone book.
	Phone.find({}).then(result => { // Querying all documents in the 'Phone' collection.
		console.log('phonebook: ')
		result.forEach(phone => { // Looping through each document and printing its name and number.
			console.log(`${phone.name} ${phone.number}`)
		})
		mongoose.connection.close() // Closing the database connection after printing the phone book.
	})
} else {
	// If there are more than 3 arguments, we assume the user wants to add a new entry to the phone book.
	const person = new Phone({
		name: process.argv[3], // The name provided as the third argument.
		number: process.argv[4], // The phone number provided as the fourth argument.
	})

	person.save().then(result => { // Saving the new entry to the 'Phone' collection.
		console.log(`added ${result.name} number ${result.number} to phonebook`) // Confirming the addition.
		mongoose.connection.close() // Closing the database connection after adding the new entry.
	})
}
