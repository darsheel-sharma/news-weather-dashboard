// for fetching weather data
const getWeather = async (city = 'Delhi') => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b29a47e161ab352c6cb47f5da695cf2&units=metric`);

  if (response.status !== 200) {
    throw new Error("Cannot fetch the weather data");
  }

  const data = await response.json();
  return data;
};

// takes the weather data and uses it to update Values

const updateWeather = (data) => {
  document.querySelector(".city").innerText = `${data.name}, ${data.sys.country}`;
  document.querySelector(".weatherdisc").innerHTML = `${data.weather[0].main}`;

  document.querySelector(".realtempval").innerText = `${data.main.temp}°C`;
  document.querySelector(".feeltempval").innerText = `${data.main.feels_like}°C`;
  document.querySelector(".mintempval").innerText = `${data.main.temp_min}°C`;
  document.querySelector(".maxtempval").innerText = `${data.main.temp_max}°C`;
  document.querySelector(".humidityval").innerText = `${data.main.humidity}%`;
  document.querySelector(".windval").innerText = `${data.wind.speed} m/s`;

  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
  document.querySelector(".sunrisetime").innerText = sunriseTime;

  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
  document.querySelector(".sunsettime").innerText = sunsetTime;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  document.querySelector(".datetime").innerText   = `${today}`;
};

// takes city input from user

const fetchCityWeather = () => {
  const city = document.querySelector(".cityinput").value.trim();
  getWeather(city)
    .then(data => updateWeather(data))
    .catch(err => alert(err.message));
};

// shows weather data when we first open the page

window.onload = () => {
  getWeather()
    .then(data => updateWeather(data))
    .catch(err => alert(err.message));
};

// when we click search button it uses fetchCityWeather func

document.querySelector(".searchbutton").addEventListener("click", fetchCityWeather);

// for fetching news data

const getNews = async (category = 'business') => {
  const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_832fe13d4cc44ca496e4ad7ffb7b6512&country=in&category=${category}&language=en`);
  if (response.status !== 200) {
    throw new Error("Cannot fetch the news data");
  }

  const data = await response.json();
  return data;
};

// upadates news data in the unordered list

const updateNews = (data) => {
  const newsList = document.querySelector('.newslist');
  newsList.innerHTML = '';

  if (!data) {
    newsList.innerHTML = '<li>No news found.</li>';
    return;
  }

  data.results.slice(0, 5).forEach(article => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = article.title;
    a.href = article.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    li.appendChild(a);
    newsList.appendChild(li);
  });
};

getNews()
    .then(data => updateNews(data))
    .catch(err => updateNews(err));

// shows news for category selected from dropdown

document.querySelector('#type').addEventListener('change', (e) => {
  const category = e.target.value;
  getNews(category)
    .then(data => updateNews(data))
    .catch(err => updateNews(err));
});