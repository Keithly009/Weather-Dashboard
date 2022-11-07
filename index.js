var API_KEY = '4253ae682bded8fe54667e18d996e279'

function getGeoLocation(query) { 
    return fetch('http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit={limit}&appid=${API_KEY}')
}

getGeoLocation('Long Beach')
.then(response => response.json())
.then(data=> { 
    body.textContent = Json.stringify(data, null, 2)
})
.catch(error => { 
    body.textContent = error.massage
}) 