console.log('Connected JS');

// Date Element
let todaysDate = moment();
console.log(todaysDate.format('MMMM Do YYYY'));
document.getElementById('current-city').innerHTML = todaysDate.format('(MMMM/Do/YYYY)');

// let button = document.getElementById("search");
// let city = document.getElementById("city-name");
let button = document.querySelector('#search');
let inputValue = document.querySelector('#city-name').value;
let currentCity = document.querySelector('#current-city');
const API_KEY = 'ed5a824dd1bf2f56ad85d4425eb7d971';
let currentTemp;
let currentHumidity;
let currentWind;
let currentUV;
let forecast;
let long;
let lat;
// Set current search to local storage
function setCity(event) {
    event.preventDefault();
    var city = document.getElementById("city-name").value;
    localStorage.setItem('location', city);
    console.log(city + " executed.");
}

// Not console.logging or appending the li
function appendCity(event) {
    event.preventDefault();
    var ul = document.querySelector('#search-history')
    var newButton = document.createElement('button');
    newButton.textContent = document.getElementById("city-name").value;
    ul.appendChild(newButton);
    newButton.setAttribute('style', 'padding: 5px; text-align: left;')
    console.log('Executed appendCity');
}

button.addEventListener("click", setCity);
button.addEventListener("click", appendCity);

/* API call for city's weather data */
button.addEventListener('click', function (event) {
    event.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + document.getElementById("city-name").value + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // console.log(data.city.name);
            console.log(data.coord.lon + ' ' + data.coord.lat);
            long = data.coord.lon;
            lat = data.coord.lat;
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude={part}&appid=' + API_KEY)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
        });

});

