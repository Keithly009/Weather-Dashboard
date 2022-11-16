// $(document).ready(function() {
//     var today = moment(); 

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
    var {lat, lon} = data[0] 
    getCurrentWeather({lat, lon}) 
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => { 
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
    .catch(error => { 
        document.body.textContent = error.message
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



