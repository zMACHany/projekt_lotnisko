import style from './css/index.scss';
import 'bootstrap';
import { get } from 'jquery';
import { apiKeyCurrency } from './api-key';
import { currencies } from './currency-codes';
import { apiKeyWeather } from './api-key';
import rain from '../src/images/rain.png';
import clouds from '../src/images/clouds.png';
import snow from '../src/images/snow.png';
import mist from '../src/images/mist.png';
import drizzle from '../src/images/drizzle.png';
import clear from '../src/images/clear.png';
import wind from '../src/images/wind.png';
import fog from '../src/images/fog.png';
import humidity from '../src/images/humidity.png';
import boeing787 from '../src/images/13.jpg';
import boeing737 from '../src/images/737.jpg';
import embarer from '../src/images/Embraer_ERJ_175.jpg';

//// nav
document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.navbar');

	function addShadow() {
		if (window.scrollY >= 200) {
			nav.classList.add('shadow-bg');
		} else {
			nav.classList.remove('shadow-bg');
		}
	}
	window.addEventListener('scroll', addShadow);
	document.querySelector('.navbar-toggler').onclick = function () {
		nav.classList.toggle('shadow-bg-click');
	};
});
///// search flights
const searchFlightsBtn = document.getElementById('searchFlightBtn');
const formSection = document.getElementById('formReservation');

formSection.style.display = 'none';

searchFlightsBtn.addEventListener('click', () => {
	formSection.style.display = 'block';
	formSection.scrollIntoView({
		behavior: 'smooth',
	});
	const placeStart = document.getElementById('placeStart').value;
	document.getElementById('start1').innerHTML = placeStart;
	const placeEnd = document.getElementById('placeEnd').value;
	document.getElementById('end1').innerHTML = placeEnd;
});



//date blocked
const ticketTypeSelect = document.getElementById('ticketType');
const startDateInput = document.getElementById('startDate');
const startDatelabel = document.getElementById('startDateLabel');
const endDateInput = document.getElementById('endDate');
const endDateLabel = document.querySelector('.endDate');
const dateEndSection = document.getElementById('dateEndSection');
let startDateChanged = false;
let endDateChanged = false;

// Set minimum values of input fields to current date
const today = new Date();
const todayFormatted = formatDate(today);
startDateInput.min = todayFormatted;
endDateInput.min = todayFormatted;

// Hide return date input field by default
endDateInput.style.display = 'none';
endDateLabel.style.display = 'none';

// Show or hide return date input field depending on ticket type
ticketTypeSelect.addEventListener('change', () => {
	const ticketType = ticketTypeSelect.value;
	if (ticketType === 'Jedna-strona') {
		startDateInput.style.display = 'block';
		startDatelabel.style.display = 'block';
		startDateInput.required = true;
		endDateInput.style.display = 'none';
		endDateLabel.style.display = 'none';
		endDateInput.required = false;
		dateEndSection.style.display = 'none';
	} else if (ticketType === 'Obie-strony') {
		startDateInput.style.display = 'block';
		startDatelabel.style.display = 'block';
		startDateInput.required = true;
		endDateInput.style.display = 'block';
		endDateLabel.style.display = 'block';
		endDateInput.required = true;
		dateEndSection.style.display = 'block';
	} else {
		endDateInput.style.display = 'none';
		endDateLabel.style.display = 'none';
		startDateInput.style.display = 'none';
		startDatelabel.style.display = 'none';
		startDateInput.required = false;
		endDateInput.required = false;
	}
});

// Make end date input field depend on start date input field
startDateInput.addEventListener('input', () => {
	const startDate = new Date(startDateInput.value);
	const endDate = new Date(startDate.getTime());
	endDateInput.min = formatDate(endDate);
	startDateChanged = true;
	endDateInput.disabled = false;
	if (endDateChanged && endDate < startDate) {
		endDateInput.value = formatDate(startDate);
	}
});

// Make start date input field depend on end date input field
startDateInput.addEventListener('input', () => {
	const endDate = new Date(endDateInput.value);
	const startDate = new Date(startDateInput.value);
	endDateChanged = true;
	if (endDate < startDate) {
		endDateInput.value = formatDate(startDate);
	}
});

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

/// number place select
const numSeatsInput = document.getElementById('num-seats');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');

minusBtn.addEventListener('click', () => {
	// decrease the input value by 1, but not less than 1
	numSeatsInput.value = Math.max(parseInt(numSeatsInput.value) - 1, 1);
	// updating the maximum number of seats
	maxNumSeats = parseInt(numSeatsInput.value);
});

plusBtn.addEventListener('click', () => {
	//  increase the input value by 1
	numSeatsInput.value = parseInt(numSeatsInput.value) + 1;
	// updating the maximum number of seats
	maxNumSeats = parseInt(numSeatsInput.value);
});

// we set the event listener to change the input value
numSeatsInput.addEventListener('change', () => {
	// updating the maximum number of seats
	maxNumSeats = parseInt(numSeatsInput.value);
});
//// seats select
let maxNumSeats = parseInt(numSeatsInput.value); // convert the string to a number
let minNumSeats = parseInt(numSeatsInput.value); // convert the string to a number

// find all checkboxes with places on the map
const checkboxes = document.querySelectorAll(
	".plane .seats input[type='checkbox']"
);

// set listening for events on each checkbox
checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('click', () => {
		// find the number of places already selected
		const selectedSeats = document.querySelectorAll(
			".plane .seats input[type='checkbox']:checked"
		);
		const numSelectedSeats = selectedSeats.length;

		// check that the number of seats selected does not exceed the maximum number of seats specified by the user
		if (numSelectedSeats > maxNumSeats) {
			// show Alert
			alert('Wybrano zbyt dużą liczbę miejsc!');
			// display a notification
			checkbox.checked = false;
		} else {
			// add class "selected"
			checkbox.parentElement.classList.toggle('selected');
		}
		if (numSelectedSeats === maxNumSeats) {
			saveButton.disabled = false;
		}
	});
});

let selectedSeats = [];
const saveButton = document.querySelector('#reserve-button');
const myModal = document.getElementById('seatSelectModal');

/// save checked seats to array
saveButton.addEventListener('click', () => {
	clearSelectedSeats(); // clear selected seats before adding new ones
	const checkedCheckboxes = document.querySelectorAll(
		'.plane .seats input[type="checkbox"]:checked'
	);
	const checkedSeats = Array.from(checkedCheckboxes).map(
		(checkbox) => checkbox.value
	);
	selectedSeats = selectedSeats.concat(checkedSeats);
	localStorage.setItem('selectedSeats', selectedSeats);
	console.log(selectedSeats);
	closeModal();
});
function closeModal() {
	// close modal
	$(myModal).modal('hide');
	alert(`Wybrane miejsca to: ${selectedSeats.join(', ')}`);
}
// clear selected seats array
function clearSelectedSeats() {
	selectedSeats = [];
}

///// disable/enable option
const input1 = document.querySelector('#placeEnd');
input1.addEventListener('input', () => {
	const input2 = document.querySelector('#ticketType');
	input2.disabled = false;
});

const input3 = document.querySelector('#startDate');
input3.addEventListener('input', () => {
	const input4btn = document.querySelector('#minus-btn');
	const input4btnPlus = document.querySelector('#plus-btn');
	const input4 = document.querySelector('#num-seats');
	input4.disabled = false;
	input4btn.disabled = false;
	input4btnPlus.disabled = false;
});

////  summary info

const summaryButton = document.getElementById('summary');
const summaryInfo = document.querySelector('.summary-info');

summaryInfo.style.display = 'none';

summaryButton.addEventListener('click', () => {
	const placeStart = document.getElementById('placeStart').value;
	const placeEnd = document.getElementById('placeEnd').value;
	const startDate = document.getElementById('startDate').value;
	const endDate = document.getElementById('endDate').value;
	const seatsNum = document.getElementById('num-seats').value;
	const seatSelected = selectedSeats.join(', ');
	summaryInfo.style.display = 'block'; ///visible summary info section
	summaryInfo.classList.toggle('fade-in');
	document.getElementById('start').innerHTML = placeStart;
	document.getElementById('end').innerHTML = placeEnd;
	document.getElementById('dateStart').innerHTML = startDate;
	document.getElementById('dateEnd').innerHTML = endDate;
	document.getElementById('numSeats').innerHTML = seatsNum;
	document.getElementById('seatsSelected').innerHTML = seatSelected;
	calcPrice();
	checkWeather(placeEnd);
});

summaryButton.onclick = function () {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			window.navigator.userAgent
		)
	) {
		summaryInfo.scrollIntoView({
			behavior: 'smooth',
		});
	}
};

//// price
let price = 0;

function calcPrice() {
	const airportStart = document.getElementById('placeStart').value;
	const airportEnd = document.getElementById('placeEnd').value;
	const ticketType = document.getElementById('ticketType').value;
	const ticketNumber = document.getElementById('num-seats').value;
	const planePic = document.getElementById('airplanePic');

	if (airportStart === 'Katowice' && airportEnd === 'Warszawa') {
		price = 300;
		planePic.src = embarer;
	} else if (airportStart === 'Katowice' && airportEnd === 'Kraków') {
		price = 200;
		planePic.src = embarer;
	} else if (airportStart === 'Katowice' && airportEnd === 'Paryż') {
		price = 860;
		planePic.src = boeing737;
	} else if (airportStart === 'Katowice' && airportEnd === 'Nowy Jork') {
		price = 1260;
		planePic.src = boeing787;
	} else {
		price = 0;
	}
	if (ticketType === 'round-trip') {
		price = price * 2;
	}
	price = price * ticketNumber;
	if (document.getElementById('luggage').checked) {
		price = price + 150 * ticketNumber;
	}
	document.getElementById('ticketPrice').innerHTML = price + ' zł';
	const ammount = (document.querySelector('#ammount').value = price);
}

/// currency converter
let api = `https://v6.exchangerate-api.com/v6/${apiKeyCurrency}/latest/USD`;
const formDropDown = document.getElementById('fromCurrencySelect');
const toDropDown = document.getElementById('toCurrencySelect');

///create dropdown from the currencies array
currencies.forEach((currency) => {
	const option = document.createElement('option');
	option.value = currency;
	option.text = currency;
	formDropDown.add(option);
});
currencies.forEach((currency) => {
	const option = document.createElement('option');
	option.value = currency;
	option.text = currency;
	toDropDown.add(option);
});

/// set default value
formDropDown.value = 'PLN';
toDropDown.value = 'EUR';

let convertCurrency = () => {
	/// Create References
	const ammount = (document.querySelector('#ammount').value = price);
	const fromCurrency = formDropDown.value;
	const toCurrency = toDropDown.value;
	const result = document.querySelector('#result');
	if (ammount.length != 0) {
		fetch(api)
			.then((resp) => resp.json())
			.then((data) => {
				let fromExchangeRate = data.conversion_rates[fromCurrency];
				let toExchangeRate = data.conversion_rates[toCurrency];
				const convertedAmmount = (ammount / fromExchangeRate) * toExchangeRate;
				result.innerHTML = `${ammount} ${fromCurrency} = ${convertedAmmount.toFixed(
					2
				)} ${toCurrency}`;
			});
	} else {
		alert('Wypełnij pole');
	}
};

document
	.querySelector('#convertButton')
	.addEventListener('click', convertCurrency);
///// weather
const searchBox = document.querySelector('.searchBar');
const searchBtn = document.querySelector('#searchBtn');
const apiUrl =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pl&q=';
const weatherIcon = document.querySelector('.weather-pic');
async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKeyWeather}`);
	const data = await response.json();

	console.log(data);

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

//// popup login form

$(document).ready(function () {
	var modal = $('.wrapper');
	var loginLink = $('.login-link');
	var registerLink = $('.register-link');
	var closeBtn = $('.icon-close');

	//Funkcje
	function closeModal() {
		modal.fadeOut();
	}

	function openLogin() {
		modal.find('.register').fadeOut();
		modal.find('.login').fadeIn();
	}

	function openRegister() {
		modal.find('.login').fadeOut();
		modal.find('.register').fadeIn();
	}

	//Events
	loginLink.on('click', function () {
		modal.fadeIn();
		openLogin();
	});

	registerLink.on('click', function () {
		modal.fadeIn();
		openRegister();
	});

	closeBtn.on('click', function () {
		closeModal();
	});
});

/////// forms
function handleLoginFormSubmit(event) {
	event.preventDefault();
	const placeStart = document.getElementById('placeStart').value;
	const placeEnd = document.getElementById('placeEnd').value;
	const startDate = document.getElementById('startDate').value;
	const endDate = document.getElementById('endDate').value;
	const seatsNum = document.getElementById('num-seats').value;
	const ticketType = document.getElementById('ticketType').value;
	const ticketPrice = document.getElementById('ticketPrice').textContent;

	localStorage.setItem('placeStart', placeStart);
	localStorage.setItem('placeEnd', placeEnd);
	localStorage.setItem('startDate', startDate);
	localStorage.setItem('endDate', endDate);
	localStorage.setItem('seatsNum', seatsNum);
	localStorage.setItem('ticketType', ticketType);
	localStorage.setItem('ticketPrice', ticketPrice);
  
	window.location.href = 'podsumowanie.html';
  }
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
	loginForm.addEventListener('submit', handleLoginFormSubmit);
  };

const coursorPlane = document.querySelector('.coursorPlane');
document.addEventListener("mousemove", (e) =>{
	let x = e.pageX +'px';
	let y = e.pageY +'px';
});

