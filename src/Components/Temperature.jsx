import React, { useState, useEffect } from "react";

function Temperature({ city, onCityChange }) {
  const [weatherData, setWeatherData] = useState(null);
  const [inputCity, setInputCity] = useState("");

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null); // Reset weatherData on error or city not found
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onCityChange(inputCity);
      fetchWeatherData(inputCity);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center p-4 gap-2 md:gap-4">
        <input
          type="text"
          placeholder="Search City"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-100 text-sm md:text-md p-2 focus:outline-none focus:border-slate-400 rounded-3xl"
          value={inputCity}
          onChange={handleCityChange}
          onKeyPress={handleKeyPress}
        />
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => {
            onCityChange(inputCity);
            fetchWeatherData(inputCity);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 text-transform scale-100 hover:scale-105 md:hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
      </div>

      {weatherData ? (
        <>
          <div className="flex justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-12 h-12 text-transform scale-100 hover:scale-105 md:hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>

          <div className="flex justify-center items-center text-slate-200 mt-8 text-transform scale-100 hover:scale-105 md:hover:scale-110 transition-transform duration-300 ease-in-out">
            <p className="font-semibold text-4xl md:text-5xl">
              {Math.round(weatherData.main.temp - 273.15)}
              <span className="text-2xl md:text-3xl">°C</span>
            </p>
          </div>

          <div className="flex justify-center items-center text-slate-300 mt-4 md:mt-8 text-md md:text-lg text-transform scale-100 hover:scale-105 md:hover:scale-110 transition-transform duration-300 ease-in-out">
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </div>

          <div className="flex justify-center text-slate-400 mt-3 md:mt-5 text-xs md:text-sm text-transform scale-100 hover:scale-105 md:hover:scale-110 transition-transform duration-300 ease-in-out">
            Today - {new Date().toLocaleDateString()} | {weatherData.name}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Temperature;
