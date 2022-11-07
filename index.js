var API_KEY = '500315c8473f75376f0ad6eb7eed421c'

function getGeoLocation(query, limit = 5) { 
    return fetch('http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}')
    
}

function getCurrentWeather({arguments}) { 
    return fetch('https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&units=${arguments.units}&appid=${API_KEY}')
}


// Using a function that returns a promise, which is to fetch the api geolocator 
getGeoLocation('Long Beach')
.then(function(response) {
    return response.json
})
.then(data=> {
    getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => { 
        document.body.textContent = JSONstringify(weatherData, null, 2)
    })
    .catch(error => { 
        document.body.textContent = error.message
    })
})
.catch(error => { 
    document.body.textContent = error.message
})

