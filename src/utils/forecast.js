const request = require('postman-request');

const weather = (lattitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude + "&appid=98d8b6401bb7a70fb370a7bae61ba9f0&units=metric";
    
    request({ url, json: true}, (error, response)=> {
        if (error) {
        callback ("Unable to connect to weather services!", undefined);
        } else if (!response.body.main) {
        callback ("Unable to find location. Try another search.", undefined)
        } else {
        callback ( undefined, ` ${response.body.weather[0].main}. It is currently ${response.body.main.temp} degrees now.`)
        }        
});    
}; 

module.exports = weather;

//https://api.openweathermap.org/data/2.5/weather?lat=49.98&lon=36.23&appid=98d8b6401bb7a70fb370a7bae61ba9f0&units=metric