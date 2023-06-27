//which we’ll use as the entry point for our server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

const db = require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/countries', db.getAllCountries);
app.post('/countries', db.createCountry);
app.post('/foods', db.createFood);