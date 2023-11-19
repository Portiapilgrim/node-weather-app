const path = require('path');
const hbs = require('hbs');
const express = require("express");
const weatherData = require("../src/utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebars and views localisation
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        pageTitle: "Weather App", 
        someText: "Find out what the weather is at...",
        name: "Juleeya"
    });
});
 

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        pageTitle: "About", 
        someText: "someText",
        name: "Juleeya"
    });
});


app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        pageTitle: "Help", 
        someText: "someText",
        name: "Juleeya"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.lat && !req.query.lon) {
        return res.send({
            error: "You must provide a search query"
        });
    };

    weatherData(req.query.lat, req.query.lon, (error, weatherData) => {
        if (error) {
            return res.send({error})
        }
        return res.send({
            weather: weatherData
        })
    })

    // res.send({
    //     latitude: req.query.weather,
    //     weather: "Some weather term"
    // })
});

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    } 
    res.send({products: []});
});

app.get("/help/*", (req,res) => {
    res.render("404", {
        message: "Help article not found",
        title: "404",
        pageTitle: "404", 
        someText: "someText",
        name: "Juleeya"
    });
});

app.get("*", (req,res) => {
    res.render("404", {
        message: "Page not found",
        title: "404",
        pageTitle: "404", 
        someText: "someText",
        name: "Juleeya"
    });});

app.listen(3000, () => {
    console.log("Listening on port 3000..."); 
});