function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  //let temperature = response.data.temperature.current;
  let temperature = response.data.daily[0].temperature.day;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.daily[0].time * 1000);
  let iconElement = document.querySelector(".temp-icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.daily[0].condition.description;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  windElement.innerHTML = `${response.data.daily[0].wind.speed}Km/H`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.daily[0].condition.icon_url}" class= "temp-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) minutes = `0${minutes}`;

  return `${day} ${hours}:${minutes}`;
}

function cityTemp(city) {
  let apiKey = "o031ff44025aa0btaa12d97420a0a3c6";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searched-city");

  cityTemp(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
