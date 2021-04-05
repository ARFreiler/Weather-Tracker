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

// Set current search to local storage
function setCity(event) {
    event.preventDefault();
    var city = document.getElementById("city-name").value;
    localStorage.setItem('location', city);
    alert(city + " executed.");
}

// Not console.logging or appending the li
function appendCity(event) {
    event.preventDefault();
    var ul = document.querySelector('#search-history')
    var newButton = document.createElement('button');
    newButton.textContent = document.getElementById("city-name").value;
    ul.appendChild(newButton);
    console.log('Executed appendCity');
}

// function addDate() {
//     document.getElementById('current-city').innerHTML = todaysDate;
// }
// addDate();

button.addEventListener("click", setCity);
button.addEventListener("click", appendCity);

// Not doing jack....
/* API call for city's weather data */
// var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial';

// button.addEventListener('click', function () {
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//         });
// });

// TEST
// button.addEventListener('click', function () {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// });

button.addEventListener('click', function (event) {
    event.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + document.getElementById("city-name").value + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
});


// / button.addEventListener('click', function () {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=ed5a824dd1bf2f56ad85d4425eb7d971&units=imperial')
//     alert(inputValue.value)
//         // .then(response => response.json())
//         // .then(data => console.log(data))
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// });






