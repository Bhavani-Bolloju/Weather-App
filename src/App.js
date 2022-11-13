import React, { useEffect, useState } from "react";

import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";

function App() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        const { latitude: lat, longitude: lon } = location?.coords;
        setCoords({ lat: lat, lon: lon });
      },
      () => {
        console.log("failed to get coords");
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <CurrentWeather coords={coords} />
      <HourlyWeather coords={coords} />
      <DailyWeather coords={coords} />
    </div>
  );
}

export default App;
