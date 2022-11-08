// 
// All of the elements
var API_KEY = '500315c8473f75376f0ad6eb7eed421c'

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        createWeatherDisplay(event.target.value); }
})

function getGeoLocation(query, limit = 5) { 
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`) 
}

// Will get the current weather from the locations 
function getCurrentWeather({arguments}) { 
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial,'}&appid=${API_KEY}`)
}


// Using a function that returns a promise, which is to fetch the api geolocator 
function createWeatherDisplay(cityLocation) { 
    return getGeoLocation(cityLocation)
.then(function(response) {
    return response.json 
}) 
}
.then(data=> {
    if (data.length == 0) {
        document.body.appendChild('We could not find ${location}')
    } else if 
    getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => { 
        var weatherPicture = document.createElement('img')
        weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        var currentWeatherStatement = document.createElement('p')
        currentWeatherStatement.textcontent = `${weatherData.weather[0].main}: the weather is currently ${weatherData.weather[0].description}`
        
        document.body.appendChild(currentWeatherStatement)
    })
    .catch(error => { 
        document.body.textContent = error.message
    })
})
.catch(error => { 
    document.body.textContent = error.message
})
}

