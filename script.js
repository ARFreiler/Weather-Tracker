console.log('Connected JS');

// Date Element
let todaysDate = moment();
console.log(todaysDate.format('MMMM Do YYYY'));
document.getElementById('current-city').innerHTML = todaysDate.format('(MMMM/Do/YYYY)');

// Assigned variables
let button = document.querySelector('#search');
let inputValue = document.querySelector('#city-name').value;
let currentCity = document.querySelector('#current-city');
const API_KEY = 'ed5a824dd1bf2f56ad85d4425eb7d971';
let long;
let lat;

// Unassigned
let cityToday;
let currentTemp;
let currentHumidity;
let currentWind;
let currentUV;
let forecast;

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
    console.log('appendCity executed.');
}

// Event Listeners
button.addEventListener("click", setCity);
button.addEventListener("click", appendCity);

// API Call 
button.addEventListener('click', function (event) {
    event.preventDefault();
    let cityName = document.getElementById("city-name").value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
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

