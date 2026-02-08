const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World 3' });
});

module.exports = app;
