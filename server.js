const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const fs = require('fs')
// const api = require('./routes');

// Why do we NOT wnat to bring in our dataset when the APP is LOADED(?)
// const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;  // 8080 3000 300q 5000 5500
const app = express();  // this line CREATE or INITALIZES our API SERVER 

// Middleware for parsing JSON and urlencoded form data --> We convert the incoming 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// HTTP methods 
// GET POST PUT PATCH DELETE || HEAD OPTIONS

// ROUTES GO HERE 
app.get('/notes', function (request, response) {

    response.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', function (request, response) {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        response.json(JSON.parse(data));
    });

    // response.sendFile(path.join(__dirname, './public/pages/notes.html'))

    // Read in the saved data --> fs.readFile()  db.json 

    // we may have to convert the JSON data into JavaScript data to manipulate it


    // we NEED TO SEND that data BACK in JSON FORMAT
})

app.post('/api/notes', function (req, res) {
    console.log("Incoming Reaquest Body data: ", req.body);
    console.log("Incoming Reaquest data TYPE: ", typeof req.body);
    // READ(GRAB) in the current SAVED DATASET
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        console.log(typeof data);
        // COnvert the JSON data to a more usable format (JS)
        let jsData = JSON.parse(data);
        console.log("data: ", jsData);
        console.log("data: ", typeof jsData);   // ARRAY (object)

        // JSON --> { "key" : "value" }
        // stringify(jsDataType)  --> this converts and JSobj into JSON
        // parse() --> this converts the JSON data into JavaScript (object)

        // ADD the NEW DATA to my dataset(?)
        jsData.push(req.body)

        console.log("data: ", jsData);
        //console.log("data: ", typeof jsData);   // ARRAY (object)

        // WE need to WRITE the NEW DATASET to file
        fs.writeFile("./db/db.json", JSON.stringify(jsData), function (err, data) {
            if (err) {
                console.log("Error: ", err);
            }
            console.log("Data Written Successfuly");
            res.json(data);
        })
        // response.json(JSON.parse(data));
    });

    // add to the db.json file 

    // fs.writeFile()

})


app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    //remove note from array 
    //save new array from file
    //return it
    //res.____ activity has completed 
})

app.get('*', function (request, response) {

    response.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
