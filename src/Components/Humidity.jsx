import React, { useState, useEffect } from "react";

function Humidity({ city }) {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchHumidity = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_ID;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
          setHumidity(data.main.humidity);
        } else {
          setHumidity(null); // Reset humidity on error or city not found
        }
      } catch (error) {
        console.error("Error fetching humidity data:", error);
        setHumidity(null);
      }
    };

    fetchHumidity();
  }, [city]);

  const calculateProgressBarWidth = () => {
    if (humidity !== null) {
      return `${humidity}%`;
    } else {
      return "0%";
    }
  };

  return (
    <div className="bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center rounded-xl text-transform scale-100 hover:scale-100 md:hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-xs md:text-sm mt-2">Humidity</h2>
      {humidity !== null && (
        <>
          <div className="mt-2">
            <span className="text-2xl md:text-3xl font-bold">{humidity}</span>
            <span className="text-xl md:text-2xl">%</span>
          </div>

          <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
              style={{ width: calculateProgressBarWidth() }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Humidity;
