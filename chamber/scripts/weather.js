const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ICON_BASE_URL = "https://openweathermap.org/img/w";
const APP_ID = "6fa2c5168c241b951b500db1cdcbeb10";
const CITY_ID = "6322752"; // Curitiba, BR
const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satudary",
];

async function getCurrentWeather() {
  const queryParams = new URLSearchParams({
    id: CITY_ID,
    appid: APP_ID,
    units: "metric",
  }).toString();
  const url = `${BASE_URL}/weather?${queryParams}`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getWeatherForecast(numberOfDays = 3) {
  const HOURS_PER_DAY = 24;
  const TIMESTAMP_PERIOD = 3;
  const TIMESTAMPS_PER_DAY = HOURS_PER_DAY / TIMESTAMP_PERIOD;
  const today = new Date();

  const todayTimestampsOffset = Math.ceil(
    (HOURS_PER_DAY - today.getHours()) / TIMESTAMP_PERIOD
  );
  const cnt = TIMESTAMPS_PER_DAY * numberOfDays + todayTimestampsOffset;

  const queryParams = new URLSearchParams({
    id: CITY_ID,
    appid: APP_ID,
    cnt: cnt,
    units: "metric",
  }).toString();
  const url = `${BASE_URL}/forecast?${queryParams}`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function displayForecast(selector = "", forecastData = []) {
  const days = forecastData.list.filter((day) => day.dt_txt.match(/12:00:00/));
  const parent = document.querySelector(selector);
  parent.innerHTML = "";

  const elements = days.map((day) => {
    const weekday = new Date(Number(day.dt.toString() + "000")).getDay();

    const element = document.createElement("p");
    element.innerHTML = `${WEEK_DAYS[weekday]}: <span>${Math.round(
      day.main.temp
    )} ºC</span>`;

    return element;
  });
  parent.append(...elements);
}

function displayCurrentWeather(selector = "", weatherData = {}) {
  const df = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  const weatherDescription = weatherData.weather[0].main;

  const parent = document.querySelector(selector);
  parent.innerHTML = "";

  const temperatureSummary = document.createElement("div");
  temperatureSummary.classList.add("temperature");
  const temperatureText = document.createElement("p");
  temperatureText.textContent = `${Math.round(weatherData.main.temp)} ºC`;
  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `${ICON_BASE_URL}/${weatherData.weather[0].icon}.png`
  );
  weatherIcon.setAttribute("alt", weatherDescription);
  weatherIcon.setAttribute("loading", "lazy");

  temperatureSummary.appendChild(weatherIcon);
  temperatureSummary.appendChild(temperatureText);
  parent.appendChild(temperatureSummary);

  const sunrise = new Date(
    Number((weatherData.sys.sunrise + weatherData.timezone).toString() + "000")
  );
  const sunset = new Date(
    Number((weatherData.sys.sunset + weatherData.timezone).toString() + "000")
  );

  [
    weatherDescription,
    `High: ${Math.round(weatherData.main.temp_max)} ºC`,
    `Low: ${Math.round(weatherData.main.temp_min)} ºC`,
    `Humidity: ${weatherData.main.humidity}%`,
    `Sunrise: ${df.format(sunrise)}`,
    `Sunset: ${df.format(sunset)}`,
  ].forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  });
}

export {
  getCurrentWeather,
  displayCurrentWeather,
  getWeatherForecast,
  displayForecast,
};
