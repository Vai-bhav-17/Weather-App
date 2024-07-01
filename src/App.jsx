import React, { useState } from "react";
import "./App.css";
import Wind from "./Components/Wind";
import Temperature from "./Components/Temperature";
import Humidity from "./Components/Humidity";
import Visibility from "./Components/Visibility";
import AirPressure from "./Components/AirPressure";

function App() {
  const [city, setCity] = useState("London");

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="bg-[#1F213A] min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 p-4 md:p-8">
      <div className="w-full md:w-2/5 lg:w-1/3">
        <Temperature city={city} onCityChange={handleCityChange} />
      </div>
      <div className="w-full md:w-3/5 lg:w-1/2 p-4 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <h2 className="text-slate-200 text-xl md:text-2xl col-span-1 md:col-span-2">
          Today's Highlights
        </h2>
        <Wind city={city} />
        <Humidity city={city} />
        <Visibility city={city} />
        <AirPressure city={city} />
      </div>
    </div>
  );
}

export default App;
