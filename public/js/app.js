console.log("client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data)=> {
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector("form");
const searchLat = document.querySelector(".latitude");
const searchLon = document.querySelector(".longitude");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const lon = searchLon.value;
    const lat = searchLat.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("/weather?lat=" + lat + "&lon=" + lon).then((response) => {
        response.json().then((data)=> {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.weather;
            }
        });
});
})