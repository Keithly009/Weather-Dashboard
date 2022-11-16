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
    return fetch ((`http://api.openweathermap.org/geo/1.0/direct?q=${query},${queryII}&limit=${limit=5}&appid=${API_KEY}`) 
    ); 
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
    .then(data => { 
        console.log(data) 
        if (data.length === 0) { 
            var erroEl = document.createElement('p') 
            erroEl.textContent = `We couldn't find ${location}` 
            document.body.appendChild(erroEL)
        } else { 
            getCurrentWeather({ lat: data[0].lat, lon: data[0].lon})
            .then(weatherResponse => weatherResponse.json())
            .then(weatherData => { 
                var weatherPicture = document.createElement('img')
                weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData}.weather[0].icon}@2x.png`
            })
        }
    }
)}

// Grabbing the weather 
function getWeather(event) { 
    event.preventDefault();
    if(searchCity.val(). trim()!==""){ 
        city=searchCity.val().trim();
        currentWeather(city); 
    }
}

// Will get the current weather from the locations through the weather api 
// Use Insomnia to test API 
function getCurrentWeather(city) {
     console.log(city) 
     console.log(API_KEY) 
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
    .then(res => res.json()) 
    .then(function(response){ 
        console.log(response) 
    }) 
} 

// Gonna need to create a variable that can call all the states in the US to be used in the argument
getCurrentWeather('city')
.then(function(response) {
    return response.json()
}) 
.then(data=> { 
   console.log(data)
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
})
.catch(error => { 
    document.body.textContent = error.message
});

function displayButtons() { 
    var savedSearches = JSON.parse(localStorage.getItem("locations")) || []; 
    for (var i = 0; i < savedSearches.length; i++) { 
        var city = savedSearches[i].city;
        var state = savedSearches[i].state;
        console.log(savedSearches);
        // Insert button to search for City 
        var cityBtn = $("<button></button>");
        var historyTextEl = $("<h2></h2>"); 
        historyTextEl.text("your history is");
    }
}



