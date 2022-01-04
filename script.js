let weather = {
  apiKey: "7e8c43f8840b9248c65cab6dc935efc8",
  town: "london",
};

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

// Use the Fetch API to get weather data
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${weather.town}&appid=${weather.apiKey}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    // Convert Json to JS object
    const res = JSON.parse(result);
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
          (dictionary.hasOwnProperty(res.weather[0].main)
            ? dictionary[res.weather[0].main]
            : res.weather[0].main) +
          ");background-repeat: no-repeat;background-size: cover"
      );
  })
  .catch((error) => console.log("error", error));
