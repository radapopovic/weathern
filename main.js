(function () {
    // tačno vreme
    const time = document.getElementById('time');
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    h = (h < 10 ? '0' : '') + h;
    m = (m < 10 ? '0' : '') + m;

    console.log(date.getTime())
    time.innerText = `${h}:${m}`;

    // pozadina za noć
    if (h > 19 && h < 6) {
        document.body.style.backgroundImage = "url('img/background-moon.jpg')";
    }

    //uzimanje podataka sa API
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Belgrade,RS&APPID=dd64a6ba23306c0f5ea21c31fcba0579",
        function (data) {
            console.log(data)
            console.log(data.weather[0].icon)

            // ikonica
            let wetherIcon = document.getElementById('icon');
            let description = data.weather[0].description;
            console.log(description)
            wetherIcon.innerHTML = `<img src="img/${data.weather[0].icon}.png" alt="${description}">`

            // kratak opis vremenskih uslova
            let innerDescription = document.getElementById('innerDescription');

            const conditions = {
                'clear sky': 'Vedro',
                'few clouds': 'Uglavnom vedro',
                'scattered clouds': 'Delimično oblačno',
                'broken clouds': 'Uglavnom oblačno',
                'shower rain': 'Jaka kiša',
                'rain': 'Kiša',
                'thunderstorm': 'Oluja',
                'snow': 'Sneg',
                'mist': 'Magla'
            }

            console.log(Object.keys(conditions))
            for (let i in conditions) {
                if (description == i) {
                    console.log(i)
                    console.log(conditions[i])
                    innerDescription.innerText = conditions[i];
                    break;
                }
            }

            // temperatura
            let tempC = document.getElementById('temperature');
            let tempK = data.main.temp;
            tempC.innerText = (tempK - 273.15).toFixed();

            // vetar
            let vetar = document.getElementById('wind');
            let wind = data.wind.speed;
            vetar.innerText = wind;

            // vazdušni pritisak
            let pritisak = document.getElementById('pressure');
            let pressure = data.main.pressure;
            pritisak.innerText = pressure;

            // vlažnost vazduha
            let vlaznost = document.getElementById('humidity');
            let humidity = data.main.humidity;
            vlaznost.innerText = humidity;

            // izlazak sunca
            let izlazak = document.getElementById('sunrise');
            let sunriseS = data.sys.sunrise;

            let hours = (Math.floor(sunriseS / 3600) % 24) + 1;
            let minutes = Math.floor(sunriseS / 60) % 60;

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;

            izlazak.innerText = `${hours}:${minutes}`;

            // zalazak sunca
            let zalazak = document.getElementById('sunset');
            let sunsetS = data.sys.sunset;

            let hours2 = (Math.floor(sunsetS / 3600) % 24) + 1;
            let minutes2 = Math.floor(sunsetS / 60) % 60;

            hours2 = (hours2 < 10) ? "0" + hours2 : hours2;
            minutes2 = (minutes2 < 10) ? "0" + minutes2 : minutes2;

            zalazak.innerText = `${hours2}:${minutes2}`;


        })


}())