import React, { useState } from 'react';

const WeatherApp = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const api = {
        api: "899db90d99e205468b2f79d23f0a4d1e",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const search = (evt) => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.api}`)
                .then((response) => response.json())
                .then((result) => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    };

    return (
        <div>
            <main>
                <h1>  Weather App </h1>
                <div className="search-box">
                    <input
                        className="search-bar"
                        type="text"
                        value={query}
                        placeholder="Enter a city name"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={search} // Corrected event handler
                    />
                    <button>Search</button>
                </div>

                {typeof weather.main !== 'undefined' ? (
                    <>
                        {weather.name && weather.sys && (
                            <div className="location-box">
                                <div className="location">
                                    {weather.name}, {weather.sys.country}
                                    <div className="date">{dateBuilder(new Date())}</div>
                                </div>
                            </div>
                        )}

                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}℃
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </>
                ) : ('')}
              
            </main>
        </div>
    );
};

export default WeatherApp;
