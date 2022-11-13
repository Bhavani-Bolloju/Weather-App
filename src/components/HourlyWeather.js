import React from "react";
import { useGetHourlyWeatherQuery } from "./store/fetch-data";
import format from "date-fns/format";
import Spinner from "./Ui/Spinner";
import Graph from "./Graph";

function HourlyWeather(props) {
  const { data, isLoading, error } = useGetHourlyWeatherQuery(props.coords);

  const hourly = data?.list;

  const hourlyWeather = hourly?.slice(0, 8);

  const hourlyDate = hourlyWeather?.map((item) => {
    const time = new Date(item.dt * 1000);

    return { date: format(time, "hh:mm aaaa"), temp: item?.main?.temp };
  });

  let hourlyweather = <Graph data={hourlyDate} />;
  if (isLoading) {
    hourlyweather = <Spinner />;
  }

  if (error) {
    hourlyweather = <h2>Error in loading</h2>;
  }

  return (
    <div className="relative -left-10 flex justify-center">{hourlyweather}</div>
  );
}

export default HourlyWeather;
