let url = 'https://api.openweathermap.org/data/2.5/weather?q=Chernihiv&appid=d65ca3417d3624d11288475acc964b98&units=metric';
let degree = document.querySelector('.degree')
let speedWind = document.querySelector('.speed-wind')
let humidityPercent = document.querySelector('.humidity-percent')
let weatherImg = document.getElementById('img')
const btnFind = document.querySelector('.find-sity')
const input = document.querySelector('.input')
let inputValue = input.value
const options = {
    method: 'GET'
};
async function getWeather() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        degree.textContent = parseInt(data.main.temp)
        speedWind.textContent = data.wind.speed
        humidityPercent.textContent = data.main.humidity
        if (data.weather[0].main === 'Clouds') {
            weatherImg.src = '/img/cloud.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherImg.src = '/img/rain.png';
        } else if (data.weather[0].main === 'sun') {
            weatherImg.src = '/img/sun.png';
        }
    } catch (error) {
        console.error(error);
    }
}

btnFind.addEventListener('click', function() {
    getCity()
} )

function getCity() {
    input.addEventListener('input', function () {
        inputValue = input.value
    });
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=d65ca3417d3624d11288475acc964b98&units=metric`;
        console.log(url);
        getCity()
        getWeather()
}

getWeather()

