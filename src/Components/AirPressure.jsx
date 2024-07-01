import React, { useState, useEffect } from "react";

function AirPressure({ city }) {
  const [pressure, setPressure] = useState(null);

  useEffect(() => {
    const fetchAirPressure = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_ID;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
          setPressure(data.main.pressure);
        } else {
          setPressure(null); // Reset pressure on error or city not found
        }
      } catch (error) {
        console.error("Error fetching air pressure data:", error);
        setPressure(null);
      }
    };

    fetchAirPressure();
  }, [city]);

  return (
    <div className="bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center rounded-xl text-transform scale-100 hover:scale-100 md:hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-xs md:text-sm mt-2">Air Pressure</h2>
      {pressure !== null && (
        <div className="mt-2">
          <span className="text-2xl md:text-3xl font-bold">{pressure}</span>
          <span className="text-xl md:text-2xl">mb</span>
        </div>
      )}
    </div>
  );
}

export default AirPressure;
