let url = 'https://api.openweathermap.org/data/2.5/weather?q=Chernihiv&appid=d65ca3417d3624d11288475acc964b98&units=metric';
let degree = document.querySelector('.degree')
let speedWind = document.querySelector('.speed-wind')
let humidityPercent = document.querySelector('.humidity-percent')
let weatherImg = document.getElementById('img')
const cityName = document.querySelector('.city')
const btnFind = document.querySelector('.find-sity')
const input = document.querySelector('.input')
const loader = document.querySelector('.loader');
const contentWeather = document.querySelector('.content-weather')

const options = {
    method: 'GET'
};

async function getWeather() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.cod === "404") {
            input.style.outline = "3px solid red";
            input.placeholder = "City not found";
            input.value = "";
            return;
        }
        console.log(data);
        degree.textContent = parseInt(data.main.temp)
        speedWind.textContent = data.wind.speed
        humidityPercent.textContent = data.main.humidity
        cityName.textContent = data.name
        if (data.weather[0].main === 'Clouds') {
            weatherImg.src = '/img/cloud.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherImg.src = '/img/rain.png';
        } else if (data.weather[0].main === 'Clear') {
            weatherImg.src = '/img/sun.png';
        } else if (data.weather[0].main === 'Snow') {
            weatherImg.src = '/img/snow.png';
        }
    } catch (error) {
        console.error(error);
    } finally {
        if (loader) loader.style.display = "none";
        if (contentWeather) contentWeather.style.display = "";
    }
}

btnFind.addEventListener('click', function () {
    input.style.outline = "";
    input.placeholder = "";
    if (loader) loader.style.display = "block";
    if (contentWeather) contentWeather.style.display = "none";
    getCity()

})

function getCity() {
    try {
        let inputValue = input.value;
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=d65ca3417d3624d11288475acc964b98&units=metric`;
        console.log(url);
        getWeather();
    } catch (error) {
        console.log(error);
    }
}

getWeather()
