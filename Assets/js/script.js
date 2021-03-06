// Date Element
let todaysDate = moment();

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
let unixTime;
let unixMilliSeconds;
let forecastDateObject;
let currentIcon;
let currentIconElement;
let listButton;
let uvElement;

// Set current search to local storage
function setCity(event) {
    event.preventDefault();
    var city = document.getElementById("city-name").value;
    localStorage.setItem('location', city);
}

// Appended buttons with API call
function appendCity(event) {
    event.preventDefault();
    var ul = document.querySelector('#search-history')
    var newButton = document.createElement('button');
    newButton.setAttribute('id', 'new-button');
    newButton.textContent = document.getElementById("city-name").value.charAt(0).toUpperCase() + document.getElementById("city-name").value.slice(1);
    newButton.addEventListener('click', function (event) {
        event.preventDefault();
        listButton = document.getElementById('new-button').innerHTML;
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + listButton + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                long = data.coord.lon;
                lat = data.coord.lat;
                city = data.name;
                currentIcon = data.weather[0].icon;
                iconElement = document.createElement("img");
                iconElement.setAttribute("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
                cityTemp = data.main.temp;
                cityHumidity = data.main.humidity;
                cityWind = data.wind.speed;
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude={part}&appid=' + API_KEY + '&units=imperial')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        let forecastElements = document.querySelectorAll('.forecast');
                        for (let i = 0; i < forecastElements.length; i++) {
                            forecastElements[i].innerHTML = '';
                            let forecastIndex = data.daily[i];
                            unixTime = data.daily[i + 1].dt;
                            unixMilliSeconds = unixTime * 1000;
                            forecastDateObject = new Date(unixMilliSeconds);
                            forecastDate = forecastDateObject.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })
                            let forecastDateElement = document.createElement('p');
                            forecastDateElement.innerHTML = forecastDate;
                            forecastElements[i].append(forecastDateElement);
                            let forecastWeatherElement = document.createElement("img");
                            forecastWeatherElement.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + ".png");
                            forecastElements[i].append(forecastWeatherElement);
                            let forecastTempElement = document.createElement('p');
                            forecastTempElement.innerHTML = "Temp: " + data.daily[i + 1].temp.day + " &#176F";
                            forecastElements[i].append(forecastTempElement);
                            let forecastHumidityElement = document.createElement('p');
                            forecastHumidityElement.innerHTML = "Humidity: " + data.daily[i + 1].humidity + "%";
                            forecastElements[i].append(forecastHumidityElement);
                        }
                        cityUV = data.current.uvi;
                        document.getElementById('uvi').innerHTML = "UV Index: " + cityUV;
                        if (cityUV <= 2.9) {
                            document.getElementById('uvi').style.backgroundColor = '#80FF00';
                        } else if (cityUV >= 3 && cityUV <= 5.9) {
                            document.getElementById('uvi').style.backgroundColor = 'yellow';
                        } else if (cityUV >= 6) {
                            document.getElementById('uvi').style.backgroundColor = 'red';
                        }
                    })
            });
        document.getElementById('current-city').innerHTML = city + todaysDate.format(' ' + '(MMMM/Do/YYYY)');
        currentCity.appendChild(iconElement);
        document.getElementById('temp').innerHTML = "Temperature: " + cityTemp + "&#176F";
        document.getElementById('humidity').innerHTML = "Humidity: " + cityHumidity + "%";
        document.getElementById('wind').innerHTML = "Wind Speed: " + cityWind + " MPH";
    })
    ul.appendChild(newButton);
}

// Event Listeners
button.addEventListener("click", setCity);
button.addEventListener("click", appendCity);

// Initial API Call 
button.addEventListener('click', function (event) {
    event.preventDefault();
    let cityName = document.getElementById("city-name").value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            long = data.coord.lon;
            lat = data.coord.lat;
            city = data.name;
            cityTemp = data.main.temp;
            cityHumidity = data.main.humidity;
            cityWind = data.wind.speed;
            currentIcon = data.weather[0].icon;
            iconElement = document.createElement("img");
            iconElement.setAttribute("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude={part}&appid=' + API_KEY + '&units=imperial')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    let forecastElements = document.querySelectorAll('.forecast');
                    for (let i = 0; i < forecastElements.length; i++) {
                        forecastElements[i].innerHTML = '';
                        let forecastIndex = data.daily[i];
                        unixTime = data.daily[i + 1].dt;
                        unixMilliSeconds = unixTime * 1000;
                        forecastDateObject = new Date(unixMilliSeconds);
                        forecastDate = forecastDateObject.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        let forecastDateElement = document.createElement('p');
                        forecastDateElement.innerHTML = forecastDate;
                        forecastElements[i].append(forecastDateElement);
                        let forecastWeatherElement = document.createElement("img");
                        forecastWeatherElement.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + ".png");
                        forecastElements[i].append(forecastWeatherElement);
                        let forecastTempElement = document.createElement('p');
                        forecastTempElement.innerHTML = "Temp: " + data.daily[i + 1].temp.day + " &#176F";
                        forecastElements[i].append(forecastTempElement);
                        let forecastHumidityElement = document.createElement('p');
                        forecastHumidityElement.innerHTML = "Humidity: " + data.daily[i + 1].humidity + "%";
                        forecastElements[i].append(forecastHumidityElement);
                    }
                    cityUV = data.current.uvi;
                    document.getElementById('uvi').innerHTML = "UV Index: <span id='uvspan'>" + cityUV + "</span>";
                    document.getElementById('uvspan').innerHTML = cityUV;
                    if (cityUV <= 2.9) {
                        document.getElementById('uvspan').style = "background-color: #80FF00; color: black;";
                    } else if (cityUV >= 3 && cityUV <= 5.9) {
                        document.getElementById('uvspan').style = "background-color: yellow; color: black;";
                    } else if (cityUV >= 6) {
                        document.getElementById('uvspan').style = "background-color: red; color: white;";
                    }
                })
            document.getElementById('current-city').innerHTML = city + todaysDate.format(' ' + '(MMMM/Do/YYYY)');
            currentCity.appendChild(iconElement);
            document.getElementById('temp').innerHTML = "Temperature: " + cityTemp + "&#176F";
            document.getElementById('humidity').innerHTML = "Humidity: " + cityHumidity + "%";
            document.getElementById('wind').innerHTML = "Wind Speed: " + cityWind + " MPH";

        });
    document.getElementById('city-name').value = '';
});

