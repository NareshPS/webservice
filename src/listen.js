const express = require('express')
const logger = require('./logger.js')
const {start} = require('./service.js')

const app = express()
const APP_PORT = 8080
const port = process.env.PORT || APP_PORT;

app.use(express.static('public')) // Static files
app.use(express.json()) // Body Parser. Useful for POST requests.

start(app) // Start Services
app.listen(port) // Accept client requests

console.info(`Listening on ${port}`);