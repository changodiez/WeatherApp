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
    console.log("onError", error);
    const p = document.createElement('p');
    p.innerHTML = error.message;
    notification.style.display = 'block';
    notification.appendChild(p);
}


function weatherConsole() {
    console.log(weather)
    const description = weather.current.weather[0].description;
    console.log(description);
    const icon = weather.current.weather[0].icon;
    console.log(icon);
    const timeZone = weather.timezone;
    console.log(timeZone);
    const temp = weather.current.temp;
    console.log(temp);
    const tempInCelcius = kelvinToCelsius(temp);
    console.log(tempInCelcius);

    //print in html 
    weatherIcon.src = `icons/${icon}.png`;
    temperatureValue.innerHTML = `<p>${tempInCelcius} °<span>C</span></p>`;
    weatherLocation.innerHTML = timeZone;
    temperatureDescription.innerHTML = description.toUpperCase() ;
    document.body.style.backgroundImage = `url(/img/${icon}.jpeg)`;
    console.log(document.body.style.backgroundImage.url)
}


function kelvinToCelsius(temp) {
    const tempInCelcius = temp - 273.15;
    return tempInCelcius.toFixed(2);
}


// Check new location 


function getFromApi (){
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
    exclude=hourly,daily&appid=${apiKey}`;

    fetch(url)
        .then((resolve) => resolve.json())
        .then((weatherInfo) => {
            weather = weatherInfo;
            weatherConsole();
        })
}


function getGeoLocation () {
    inputLocation = document.getElementById("inputLocation");

    const url = `https://maps.googleapis.com/maps/api/geocode/json?&address=${inputLocation.value}&key=${apiKeyGeo}`;

    fetch(url)
        .then((resolve) => resolve.json())
        .then((GoogleGeoLocation) => {
            GoogleGeo = GoogleGeoLocation;
            googleGeoLocation ();
        })

}

function googleGeoLocation () {
    console.log(GoogleGeo)
    latitude = GoogleGeo.results[0].geometry.location.lat;
    longitude = GoogleGeo.results[0].geometry.location.lng;
    console.log (latitude);
    console.log (longitude)
    getFromApi ();
    
}