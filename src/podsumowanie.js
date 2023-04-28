import style from './css/index.scss';
import 'bootstrap';
import { get } from 'jquery';
import { apiKeyCurrency } from './api-key';
import { currencies } from './currency-codes';
import { apiKeyWeather } from './api-key';
import boeing787 from '../src/images/13.jpg';
import boeing737 from '../src/images/737.jpg';
import embarer from '../src/images/Embraer_ERJ_175.jpg';
import rain from '../src/images/rain.png';
import clouds from '../src/images/clouds.png';
import snow from '../src/images/snow.png';
import mist from '../src/images/mist.png';
import drizzle from '../src/images/drizzle.png';
import clear from '../src/images/clear.png';
import wind from '../src/images/wind.png';
import fog from '../src/images/fog.png';
import humidity from '../src/images/humidity.png';

document.addEventListener('DOMContentLoaded', function() {
const placeStart = localStorage.getItem('placeStart');
const placeEnd = localStorage.getItem('placeEnd');
const startDate = localStorage.getItem('startDate');
const endDate = localStorage.getItem('endDate');
const seatsNum = localStorage.getItem('seatsNum');
const selectedSeats = localStorage.getItem('selectedSeats');
const ticketType = localStorage.getItem('ticketType');
const ticketPrice = localStorage.getItem('ticketPrice');

// Przypisanie wartości do elementów na stronie
document.getElementById('seatsSelected1').textContent = selectedSeats;
document.getElementById('placeStart1').textContent = placeStart;
document.getElementById('placeEnd1').textContent = placeEnd;
document.getElementById('startDate1').textContent = startDate;
document.getElementById('endDate1').textContent = endDate;
document.getElementById('seatsNum1').textContent = seatsNum;
document.getElementById('ticketType1').textContent = ticketType;
document.getElementById('ticketPrice1').textContent = ticketPrice;

const planePic = document.getElementById('planePic1')
	
    if (placeStart === 'Katowice' && placeEnd === 'Warszawa') {
		planePic.src = embarer;
	} else if (placeStart === 'Katowice' && placeEnd === 'Kraków') {
		planePic.src = embarer;
	} else if (placeStart === 'Katowice' && placeEnd === 'Paryż') {
		planePic.src = boeing737;
	} else if (placeStart === 'Katowice' && placeEnd === 'Nowy Jork') {
		planePic.src = boeing787;
	} else {
		planePic.src = boeing787;
	}
    checkWeather(placeEnd);
});


    ///// weather
const searchBox = document.querySelector('.searchBar');
const searchBtn = document.querySelector('#searchBtn');
const apiUrl =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pl&q=';
const weatherIcon = document.querySelector('.weather-pic');
async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKeyWeather}`);
	const data = await response.json();



	document.querySelector('.city').innerHTML = data.name;
	document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
	document.querySelector('.humidity').innerHTML =
		'Wilgotność powietrza ' + data.main.humidity + '%';
	document.querySelector('.wind').innerHTML =
		'Prędkość wiatru ' + data.wind.speed + ' km/h';
	document.querySelector('.description').innerHTML =
		data.weather[0].description;

	if (data.weather[0].main === 'Clouds') {
		weatherIcon.src = clouds;
	} else if (data.weather[0].main === 'Rain') {
		weatherIcon.src = rain;
	} else if (data.weather[0].main === 'Snow') {
		weatherIcon.src = snow;
	} else if (data.weather[0].main === 'Mist') {
		weatherIcon.src = mist;
	} else if (data.weather[0].main === 'Clear') {
		weatherIcon.src = clear;
	} else if (data.weather[0].main === 'Wind') {
		weatherIcon.src = wind;
	} else if (data.weather[0].main === 'Fog') {
		weatherIcon.src = humidity;
	} else if (data.weather[0].main === 'Wind') {
		weatherIcon.src = wind;
	} else {
		// jeśli pogoda nie pasuje do powyższych warunków,
		// można ustawić domyślny obrazek
		weatherIcon.src = clouds;
	}
}
searchBtn.addEventListener('click', () => {
	checkWeather(searchBox.value);
});
searchBox.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		checkWeather(searchBox.value);
	}
});