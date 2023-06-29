const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');

/** Listen Port */
const port = 4000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"))

// Setup Server 'node server.js'
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});




//Get All


app.get('/getAll', (request, response) => {
    response.send(projectData);
});




 // Post 
 
app.post('/postData', (request, response) => {
    projectData={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
});
