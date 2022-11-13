import React, { useState } from "react";
import DailyWeatherItem from "./DailyWeatherItem";
import { useGetDailyWeatherQuery } from "./store/fetch-data";
import { nanoid } from "nanoid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Spinner from "./Ui/Spinner";

import "@splidejs/splide/css";

function DailyWeather(props) {
  const [selectedId, setSelectedId] = useState("initialState");
  const { data, isLoading, error } = useGetDailyWeatherQuery(props.coords);
  const daily = data?.daily;
  // console.log(daily);

  const weatherExpandHandler = function (id) {
    setSelectedId(id);
  };

  let dailyweather = (
    <Splide
      options={{
        perPage: "0",
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "25px",
        width: "100%",
        autoWidth: true,
      }}
    >
      {daily?.map((item, i) => {
        return (
          <SplideSlide key={nanoid(4)}>
            <DailyWeatherItem
              isExpand={i === selectedId}
              date={item.dt}
              temp={item.temp}
              sunrise={item.sunrise}
              sunset={item.sunset}
              weather={item.weather}
              onExpand={weatherExpandHandler.bind(null, i)}
            />
          </SplideSlide>
        );
      })}
    </Splide>
  );

  if (error) {
    dailyweather = <p>Error Loading</p>;
  }

  if (isLoading) {
    dailyweather = <Spinner />;
  }

  return <div className="w-full mt-10 flex justify-center">{dailyweather}</div>;
}

export default DailyWeather;
