// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server
function listening() {
    // Callback to debug
    console.log(`Running on localhost: ${port}`);
}
// Spin up the server
const server = app.listen(port, listening);

// GET route
function sendData(req, res) {
    res.send(projectData);
}

app.get('/lastReport', sendData);

// POST route
function callBack(req, res) {
    projectData.location = req.body.location;
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.icon = req.body.icon;
    projectData.content = req.body.content;
}

app.post('/addReport', callBack);