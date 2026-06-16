const apiKey = "5d4edccd399abd3e89beb4da13d5e9f7"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBtn = document.querySelector("#search-btn");
const searchBox = document.querySelector("#input");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&APPID=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        let data = await response.json();

        console.log(data);

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".condition").innerHTML = data.weather[0].main;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const namaNegaraFormat = new Intl.DisplayNames(['en'], { type: 'region' });
        const countryCode = data.sys.country;
        const namaLengkap = namaNegaraFormat.of(countryCode);
        console.log(namaLengkap);

        document.querySelector(".country").innerHTML = data.name + ", " + namaLengkap;

        if (data.weather[0].description == "overcast clouds") {
            weatherIcon.src = "assets/overcast.png"
        }
        else if (data.weather[0].description == "few clouds") {
            weatherIcon.src = "assets/partly-cloudy.png"
        }
        else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "assets/thunder.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/drizzle.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "assets/snow.png"
        }
        else if (data.weather[0].main == "Atmosphere") {
            weatherIcon.src = "assets/fog.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/clear.png"
        }
        else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/clouds.png"
        }
        else if (data.weather[0].main == "Extreme") {
            weatherIcon.src = "assets/extreme.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

function validasiInput() {
    if (searchBox.value.trim() === "") {
        alert("Masukkan Nama kota dulu ya!");
    }
    else {
        checkWeather(searchBox.value);
    }
}

searchBtn.addEventListener("click", validasiInput);
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        validasiInput();
    }
});
