import React, { useState, useEffect } from "react";

function Visibility({ city }) {
  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_ID;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
          setVisibility(data.visibility);
        } else {
          setVisibility(null); // Reset visibility on error or city not found
        }
      } catch (error) {
        console.error("Error fetching visibility data:", error);
        setVisibility(null);
      }
    };

    fetchVisibility();
  }, [city]);

  return (
    <div className="bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center rounded-xl text-transform scale-100 hover:scale-100 md:hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-xs md:text-sm mt-2">Visibility</h2>
      {visibility !== null && (
        <div className="mt-2">
          <span className="text-2xl md:text-3xl font-bold">
            {visibility / 1000}
          </span>
          <span className="text-xl md:text-2xl">km</span>
        </div>
      )}
    </div>
  );
}

export default Visibility;
