const fs = require('fs');
const express = require('express');
const app = express();

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
app.get('/api/v1/tours', (req, res) => {
  res.send(tours);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
