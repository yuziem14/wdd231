import {
  displayCurrentWeather,
  displayForecast,
  getCurrentWeather,
  getWeatherForecast,
} from "./weather.js";
import {
  getMembers,
  getRandomMembers,
  displaySpotlightMembers,
} from "./members.js";

getMembers().then((members) =>
  displaySpotlightMembers(getRandomMembers(members, 3, 2), "#spotlight .cards")
);

getCurrentWeather().then((currentWeather) => {
  displayCurrentWeather("#current-weather .content", currentWeather);
});

getWeatherForecast(3).then((forecast) => {
  displayForecast("#weather-forecast .content", forecast);
});
