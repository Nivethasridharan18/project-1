// const apiKey = "abc123yourrealkey"; // ✅ Your real key here

// async function getWeather() {
//   const city = document.getElementById("cityInput").value.trim();
//   if (!city) return alert("Please enter a city");

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("City not found");

//     const data = await res.json();
//     document.getElementById("weatherCard").classList.remove("hidden");
//     document.getElementById("cityName").textContent = data.name;
//     document.getElementById("description").textContent = data.weather[0].description;
//     document.getElementById("temperature").textContent = `${data.main.temp} °C`;
//     document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

//   } catch (err) {
//     alert("Could not retrieve weather. Try again.");
//     console.error(err);
//   }
// }

const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('');
});

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    const icon = data.weather[0].icon
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : 'https://openweathermap.org/img/wn/01d@2x.png'; // default icon

    $('#weather-icon').attr('src', icon);

    $('#weather-info').fadeIn();
}