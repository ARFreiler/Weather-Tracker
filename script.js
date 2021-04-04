console.log('Connected JS');

let todaysDate = moment();

console.log(todaysDate.format('dddd MMMM Do YYYY'));

let button = document.getElementById("search");
let city = document.getElementById("city-name");

/* Sets city to local storage */
document.getElementById("search").onclick = function setCity() {
    var city = document.getElementById("city-name").value;
    localStorage.setItem('location', city);
}

