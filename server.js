const express = require('express')

const api_routes = require('./routes/api_routes')
const html_routes = require('./routes/html_routes')

const app = express()

const PORT = process.env.PORT || 3333


app.use(express.json())

app.use(express.static('public'))

app.use('/api', api_routes)

app.use('/', html_routes)


app.listen(PORT, () => console.log('Server started on PORT', PORT))



