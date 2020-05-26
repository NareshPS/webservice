const express = require('express');
const path = require('path');

const APP_PORT = 8080;

const app = express();

/**
 * Static files
 */
app.use('/public', express.static('public'));
app.use('/data', express.static('data'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || APP_PORT
app.listen(port);

console.info(`Listening on ${port}`)

