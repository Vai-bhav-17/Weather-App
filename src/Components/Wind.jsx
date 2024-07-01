import React, { useState, useEffect } from "react";

function Wind({ city }) {
  const [windData, setWindData] = useState(null);

  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_ID;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
          setWindData({
            speed: data.wind.speed,
            direction: data.wind.deg,
          });
        } else {
          setWindData(null); // Reset windData on error or city not found
        }
      } catch (error) {
        console.error("Error fetching wind data:", error);
        setWindData(null);
      }
    };

    fetchWindData();
  }, [city]);

  const getWindDirection = (degrees) => {
    if (degrees > 337.5 || degrees <= 22.5) return "N";
    if (degrees > 22.5 && degrees <= 67.5) return "NE";
    if (degrees > 67.5 && degrees <= 112.5) return "E";
    if (degrees > 112.5 && degrees <= 157.5) return "SE";
    if (degrees > 157.5 && degrees <= 202.5) return "S";
    if (degrees > 202.5 && degrees <= 247.5) return "SW";
    if (degrees > 247.5 && degrees <= 292.5) return "W";
    if (degrees > 292.5 && degrees <= 337.5) return "NW";
  };

  return (
    <div className="bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center rounded-xl text-transform scale-100 hover:scale-100 md:hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-xs md:text-sm mt-2">Wind Status</h2>
      {windData && (
        <>
          <div className="mt-2">
            <span className="text-2xl md:text-3xl font-bold">
              {windData.speed.toFixed(1)}
            </span>
            <span className="text-xl md:text-2xl">mph</span>
          </div>
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-200"
              style={{ transform: `rotate(${windData.direction}deg)` }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <div className="ms-2 text-slate-200">
              {getWindDirection(windData.direction)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Wind;
