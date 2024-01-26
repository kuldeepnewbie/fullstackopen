const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
morgan.token('body', (request) => JSON.stringify(request.body))

app.get('/info',(request,response) =>{
    const date = new Date()
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`)
});
app.get('/api/phonebook',(request,response)=>{
    response.json(phonebook);
})
app.get('/api/phonebook/:id',(request,response)=>{
    const id = Number(request.params.id);
    const data = phonebook.find(note=>note.id === id)
    if(data){
        response.json(data);
    }else{
        response.status(404).end()
    }
});
app.delete('/api/phonebook/:id',(request,response)=>{
  const id = Number(request.params.id);
  // Find the index of the contact in the phonebook array
  const index = phonebook.findIndex(entry => entry.id === id);
  if (index !== -1) {
    // Remove the contact from the array
    phonebook.splice(index, 1);
    response.status(204).end(); // 204 No Content indicates successful deletion
  } else {
    response.status(404).end(); // 404 Not Found if the contact with the given ID is not found
  }
});
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.post('/api/phonebook',postMorgan,(request,response)=>{
  const body = request.body;
  if(!body || !body.name || !body.number){
    return response.status(400).json({error:"Name and number are required"});
  }
  let uniqueName = phonebook.find(ele=>ele.name === body.name )
  if(uniqueName){
    return response.status(400).json({error:"name must be unique"})
  }
  const id= Math.floor(Math.random()*100000);
  const newEntry = {
    id,name:body.name,number:body.number.toString()
  };
  phonebook = phonebook.concat(newEntry);
  response.json(newEntry)
})

const port = 3001;
app.listen(port);