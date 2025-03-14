function refreshWeather(response) {
  let tempratureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  tempratureElement.innerHTML = Math.round(temperature);
}

function cityTemp(city) {
  let apiKey = "o031ff44025aa0btaa12d97420a0a3c6";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searched-city");

  cityTemp(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
