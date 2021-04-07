console.log('Connected JS');

// Date Element
let todaysDate = moment();
console.log(todaysDate.format('MMMM Do YYYY'));
document.getElementById('current-city').innerHTML = todaysDate.format('(MMMM/Do/YYYY)');

// Assigned variables
let button = document.querySelector('#search');
let inputValue = document.querySelector('#city-name').value;
let currentCity = document.querySelector('#current-city');
let currentStats = document.querySelector('#current-stats');
let temp = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let uvi = document.querySelector('#uvi');
const API_KEY = 'ed5a824dd1bf2f56ad85d4425eb7d971';
let long;
let lat;
let city;
let cityTemp;
let cityHumidity;
let cityWind;
let cityUV;
let forecast1;
let forecast2;
let forecast3;
let forecast4;
let forecast5;

// Unassigned variables
let currentTemp;

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
    // newButton.setAttribute('style', 'padding: 5px; text-align: left; border: none; background-color: white;')
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
            console.log(data.coord.lon + ' ' + data.coord.lat);
            long = data.coord.lon;
            lat = data.coord.lat;
            city = data.name;
            cityTemp = data.main.temp;
            cityHumidity = data.main.humidity;
            cityWind = data.wind.speed;
            console.log(city);
            console.log(cityTemp);
            console.log(cityHumidity);
            console.log(cityWind);
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude={part}&appid=' + API_KEY)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cityUV = data.current.uvi;
                    forecast1 = data.daily[1].dt;
                    forecast2 = data.daily[2].temp;
                    forecast3 = data.daily[3];
                    forecast4 = data.daily[4];
                    forecast5 = data.daily[5];
                    console.log(cityUV);
                    console.log(forecast1);
                    console.log(forecast2);
                    console.log(forecast3);
                    console.log(forecast4);
                    console.log(forecast5);
                    document.getElementById('uvi').innerHTML = cityUV;
                    document.getElementById('forecast1').innerHTML = forecast1;
                    document.getElementById('forecast2').innerHTML = forecast2;
                    document.getElementById('forecast3').innerHTML = forecast3;
                    document.getElementById('forecast4').innerHTML = forecast4;
                    document.getElementById('forecast5').innerHTML = forecast5;
                })
            document.getElementById('current-city').innerHTML = city + todaysDate.format(' ' + '(MMMM/Do/YYYY)');
            document.getElementById('temp').innerHTML = cityTemp;
            document.getElementById('humidity').innerHTML = cityHumidity;
            document.getElementById('wind').innerHTML = cityWind;

        });
    document.getElementById('city-name').value = '';
});

