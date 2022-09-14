// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => {
    console.log(`running on local host: ${port}`);
});

const cities = ['New York', 'London', 'Paris', 'Berlin', 'Madrid', 'Sofia', 'Zagreb', 'Jerusalem', 'Tokyo', 'Rome'];
const rand = (num = 10) => Math.floor(Math.random() * num);

// openweatherapi
app.get('/openweatherapi', (req, res)=> {
    const data = {
        dt: Date.now(),
        main: {temp: rand(30), pressure: 1000 + rand(10), humidity: 20 + rand(60)},
        name: cities[rand(10)],
    }
    res.send(data);
})

// get
app.get('/get', (req, res)=> {
    res.send(projectData);
})

// post
app.post('/post', (req, res)=> {
    projectData = req.body;
    res.send('ok');
})