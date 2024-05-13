const express = require('express');
const path = require('path');


const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
