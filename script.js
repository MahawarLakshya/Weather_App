$(document).ready(function() {
    const inputBox = $(".input-box");
    const searchbtn = $("#search-btn");
    const weatherImg = $(".weather-img");
    const temp = $(".temprature");
    const desp = $(".description");
    const humid = $("#humidity");
    const windspd = $("#wind-speed");
    const er = $('.location-not-found');
    const er1 = $('.weather-box');
    const er2 = $('.weather-body');
    const glass = $('.glass');

    searchbtn.click(function() {
        const api_key = "ff17a5ae16df7cfbcb06afe3dd33e0a2";
        const inputVal = inputBox.val();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api_key}`;

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(weather_data) {
                if (weather_data.cod === '404' || !weather_data.main || !weather_data.weather) {
                    // Display error message and hide weather information
                    weatherImg.attr("src", "error.png");
                    er.css("display", "flex");
                    er1.css("display", "none");
                    er2.css("display", "none");
                    inputBox.val('');
                } else {
                    // Display weather information
                    temp.html(`${Math.round(weather_data.main.temp - 273.15)}°C`);
                    desp.html(`${weather_data.weather[0].description}`);
                    humid.html(`${weather_data.main.humidity}%`);
                    windspd.html(`${weather_data.wind.speed} Km/H`);

                    switch (weather_data.weather[0].main) {
                        case 'Clouds':
                            weatherImg.attr("src", "cloud.png");
                            break;
                        case 'Clear':
                            weatherImg.attr("src", "clear.jpeg");
                            break;
                        case 'Mist':

                            weatherImg.attr("src", "mist.png");
                            break;
                        case 'Haze':
                        case 'Smoke':
                            weatherImg.attr("src", "smoke.jpeg");
                            break;
                        case 'Rain':
                            weatherImg.attr("src", "rain.png");
                            break;
                        case 'Snow':
                            weatherImg.attr("src", "snow.jpg");
                            break;
                    }

                    // Hide error message and show weather information
                    er.css("display", "none");
                    er1.css("display", "flex");
                    er2.css("display", "flex");
                }


            },
            error: function(error) {
                // Handle errors if necessary
                console.error("Error fetching weather data:", error);
                weatherImg.attr("src", "error.png");
                er.css("display", "flex");
                er1.css("display", "none");
                er2.css("display", "none");
                inputBox.val('');
            }
        });
    });
});