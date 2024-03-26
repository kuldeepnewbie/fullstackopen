const morgan = require('morgan')
morgan.token('body', (request) => JSON.stringify(request.body))
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')
module.exports = postMorgan
