const apiKey = "4bb624c197edaba6e3c1acc72fdd653b";
const apiKeyGeo = "AIzaSyDwPw2KvYD0LlKjhqBwzEzNECIbR7z2-Xk"

let latitud;
let longitude;
let weather;

//Get elements from HTML
const notification = document.getElementsByClassName('notification')[0];
const weatherIcon = document.getElementById("weatherIcon");
const temperatureValue = document.querySelector(".temperature-value");
const weatherLocation = document.getElementById("timeZone");
const weatherLocation2 = document.getElementById("timeZone2");
const temperatureDescription = document.getElementById("temperatureDescription");


// Call my function Geolocation
getLocation();

function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    console.log("onSucess function", position);
    const {
        coords: {
            latitude,
            longitude
        }
    } = position;

    // geting info from api:
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
    exclude=hourly,daily&appid=${apiKey}`;

    fetch(url)
        .then((resolve) => resolve.json())
        .then((weatherInfo) => {
            weather = weatherInfo;
            weatherConsole();
        })

}

function onError(error) {
    const p = document.createElement('p');
    p.innerHTML = error.message;
    notification.style.display = 'block';
    notification.appendChild(p);
}


function weatherConsole() {
    const description = weather.current.weather[0].description;
    const icon = weather.current.weather[0].icon;
    const timeZone = weather.timezone;
    const temp = weather.current.temp;
    const tempInCelcius = kelvinToCelsius(temp);

    //print in html 
    weatherIcon.src = `icons/${icon}.png`;
    temperatureValue.innerHTML = `<p>${tempInCelcius} °<span>C</span></p>`;
    weatherLocation.innerHTML = timeZone;
    weatherLocation2.innerHTML = timeZone;
    temperatureDescription.innerHTML = description.toUpperCase();
    document.body.style.backgroundImage = `url(img/${icon}.jpeg)`;
    console.log(document.body.style.backgroundImage.url)
}


function kelvinToCelsius(temp) {
    const tempInCelcius = temp - 273.15;
    return tempInCelcius.toFixed(2);
}


// Check new location 


function getFromApi() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
    exclude=hourly,daily&appid=${apiKey}`;

    fetch(url)
        .then((resolve) => resolve.json())
        .then((weatherInfo) => {
            weather = weatherInfo;
            weatherConsole();
        })
}


function getGeoLocation() {
    inputLocation = document.getElementById("inputLocation");

    const url = `https://maps.googleapis.com/maps/api/geocode/json?&address=${inputLocation.value}&key=${apiKeyGeo}`;

    fetch(url)
        .then((resolve) => resolve.json())
        .then((GoogleGeoLocation) => {
            GoogleGeo = GoogleGeoLocation;
            googleGeoLocation();
        })

}

function googleGeoLocation() {
    latitude = GoogleGeo.results[0].geometry.location.lat;
    longitude = GoogleGeo.results[0].geometry.location.lng;
    console.log(latitude);
    console.log(longitude)
    getFromApi();

}