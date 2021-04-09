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
let unixTime;
let unixMilliSeconds;
let forecastDateObject;
// Unassigned variables
let currentTemp;
let forecastDate;

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
    newButton.textContent = document.getElementById("city-name").value.toUpperCase();
    ul.appendChild(newButton);
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
                    unixTime = data.daily[1].dt;
                    unixMilliSeconds = unixTime * 1000;
                    forecastDateObject = new Date(unixMilliSeconds);
                    forecastDate = forecastDateObject.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })
                    console.log(unixTime);
                    console.log(unixMilliSeconds);
                    console.log(forecastDateObject);
                    console.log(forecastDate);
                    // console.log(cityUV);
                    // console.log(forecast1);
                    // console.log(forecast2);
                    // console.log(forecast3);
                    // console.log(forecast4);
                    // console.log(forecast5);
                    document.getElementById('uvi').innerHTML = "UV Index: " + cityUV;
                    document.getElementById('forecast1').innerHTML = forecastDate;
                    document.getElementById('forecast2').innerHTML = forecast2;
                    document.getElementById('forecast3').innerHTML = forecast3;
                    document.getElementById('forecast4').innerHTML = forecast4;
                    document.getElementById('forecast5').innerHTML = forecast5;
                })
            document.getElementById('current-city').innerHTML = city + todaysDate.format(' ' + '(MMMM/Do/YYYY)');
            document.getElementById('temp').innerHTML = "Temperature: " + cityTemp + " &#176F";
            document.getElementById('humidity').innerHTML = "Humidity: " + cityHumidity + "%";
            document.getElementById('wind').innerHTML = "Wind Speed: " + cityWind + " MPH";

        });
    document.getElementById('city-name').value = '';
});

