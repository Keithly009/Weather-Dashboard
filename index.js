// $(document).ready(function() {
//     var today = moment(); 
// All of the elements 
// })

var input= document.querySelector('#input') 

input.addEventListener('keyup', function(event) { 
    if (event.key === 'Enter') {
        createWeatherDisplay(event.target.value)
    }
})

var previousSearchHistory = localStorage.getItem('history')
if (previousSearchHistory) { 
    previousSearchHistory = JSON.parse(previousSearchHistory) 
} else { 
    previousSearchHistory = []
}

for (var i = 0; i < previousSearchHistory.length; i++) { 
    var historyBtn = document.createElement('button')
    var historyItem = previousSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener('click', function(event) { 
        createWeatherDisplay(event.target.textContent)
    })

    document.body.appendChild(historyBtn)
}

var API_KEY = "500315c8473f75376f0ad6eb7eed421c"


// Can get the city locations
function getGeoLocation(query, limit = 5) {
    console.log(API_KEY); 
    return fetch ((`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit=5}&appid=${API_KEY}`) 
    ); 
}

function getCurrentWeather(arguments) { 
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
}

function getLocation(callback) { 
    console.log('this work?')
    if (navigator.geolocation) { 
        console.log('this did work')
        return navigator.geolocation.getCurrentPosition(
            callback,
            (error) => console.log(error)
      
        );
    } else { 
        console.log('Nope!')
    }
}

function addtoHistory(location) {
    var searchHistory = localStorage.getItem('history') 
    if (searchHistory) { 
        searchHistory = JSON.parse(searchHistory) 
        for (var i = 0; i < searchHistory.length; i++) { 
            if(searchHistory[i] === location) {
                return
            }
        }
        searchHistory.push(location) 
        localStorage.setItem('history', JSON.stringify(searchHistory))
    } else { 
        searchHistory = [location]
        localStorage.setItem('history', JSON.stringify(searchHistory))
    }
}



function createWeatherDisplay(location) { 
    return getGeoLocation(location)
    .then(function(response) { 
        return response.json()
    })
    .then(data=> { 
        console.log(data)
        if (data.length === 0) { 
         var errorEl = document.createElement('p')
         errorEl.textContent = `We couldn't find ${location}`
         document.body.appendChild(errorEl)
        } else {
         getCurrentWeather({ lat: data[0].lat, lon: data[0].lon})
        .then(weatherResponse => weatherResponse.json())
        .then(weatherData => { 
         var weatherPicture = document.createElement('img') 
         weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
         var currentWeatherStatement = document.createElement('p')
         currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather}`
         document.body.appendChild(weatherPicture)
         document.body.appendChild(currentWeatherStatement)
        })
        .catch(error => { 
         document.body.textContent = error.message
        })
     }
     })
     .catch(error => { 
         document.body.textContent = error.message
     });
    }     

// Grabbing the weather 
function getWeather(event) { 
    event.preventDefault();
    if(searchCity.val(). trim()!==""){ 
        city=searchCity.val().trim();
        currentWeather(city); 
    }
}

var current = getLocation(function(current) { 
    getCurrentWeather ({ lat: current.coords.lattitude, lon: current.coords.longitude})
    .then(weatherRepsonse => weatherResponse.json())
    .then(weatherData => { 
        displayWeatherData(weatherData)
        document.querySelector('#loading').remove()
    })
    .catch(error => { 
        document.body.textContent = error.message
    })
})

// Will get the current weather from the locations through the weather api 
// Use Insomnia to test API 
function getCurrentWeather(city) {
     console.log(city) 
     console.log(API_KEY) 
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`)
    .then(res => res.json()) 
    .then(function(response){ 
        console.log(response) 
    }) 
} 

// Gonna need to create a variable that can call all the states in the US to be used in the argument
getCurrentWeather('city') 
.then(function(response) {
}) 




