let weather = {
  apiKey: "7e8c43f8840b9248c65cab6dc935efc8",
  town: "cape town",
};

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const fetchWeather = (weather) => {
  // Use the Fetch API to get weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weather.town}&appid=${weather.apiKey}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      // Convert Json to JS object
      const res = JSON.parse(result);
      const temp = res.main.temp;
      setBackground(res);
      document.getElementById("temp").innerHTML = `${kelvinToCelsius(temp)}°C`;
      document.getElementById("city").innerHTML = `Weather in ${res.name}`;
    })
    .catch((error) => {
        alert("Town Not Found")
    });
};
const setBackground = (weather) => {
  // Create a dictionary for keyword we want to display something different
  const dictionary = {
    Clear: "Sunny",
  };
  // set the background of the body to the keyword, but first check if it exists in the dictionary
  document
    .getElementsByTagName("body")[0]
    .setAttribute(
      "style",
      "background-image: url(https://source.unsplash.com/featured/?" +
        (dictionary.hasOwnProperty(weather.weather[0].main)
          ? dictionary[weather.weather[0].main]
          : weather.weather[0].main) +
        ");background-repeat: no-repeat;background-size: cover"
    );
};

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

fetchWeather(weather);
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", function () {
  weather.town = document.getElementById("search").value;
  fetchWeather(weather);
});
