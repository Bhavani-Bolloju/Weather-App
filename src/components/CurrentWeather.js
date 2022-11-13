import React from "react";
import TimeFormat from "./Ui/TimeFormat";
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";

import format from "date-fns/format";
import Spinner from "./Ui/Spinner";

import { useGetCurrentweatherQuery } from "./store/fetch-data";
import { useGetGeoLocationQuery } from "./store/fetch-data";

function CurrentWeather(props) {
  const {
    data,
    isLoading: currentLoading,
    error: currentError,
  } = useGetCurrentweatherQuery(props.coords);

  const {
    data: geoLocation,
    isLoading: locationLoading,
    error: locationError,
  } = useGetGeoLocationQuery(props.coords);

  // format(time, "hh:mm aaaa")
  const sunrise = data?.current?.sunrise;
  const sunset = data?.current?.sunset;
  const sunriseFormat = sunrise
    ? format(new Date(sunrise * 1000), "hh:mm aaaa")
    : "00:00";
  const sunsetFormat = sunset
    ? format(new Date(sunset * 1000), "hh:mm aaaa")
    : "00:00";

  let currentweather = (
    <div className="flex justify-between w-full items-center">
      <div className="relative left-[50%] md:left-0 -translate-x-[50%] md:translate-x-0">
        <div className="md:hidden flex">
          <div className="flex items-end font-thin">
            <span className="text-6xl font-thin">
              {(+data?.current?.temp).toFixed(1)}
            </span>
            <div className="flex self-center mt-3">
              <span className="text-3xl">&deg;</span>
              <span className="text-4xl font-thin">C</span>
            </div>
            <span className="text-7xl self-center px-2  text-gray-800/90">
              |
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img
              className="align-bottom block -ml-4 w-20"
              src={`http://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`}
              alt="Weather-icon"
            />

            <span className="text-2xl -mt-6">
              {data?.current?.weather[0]?.description}
            </span>
          </div>
        </div>
        <div className="md:hidden">
          {data?.current?.dt && <TimeFormat date={data?.current?.dt} />}
        </div>
        <div className="flex items-center">
          <SiWindicss className="text-3xl pr-2" />
          <span>Wind - {data?.current?.wind_speed}m/s</span>
        </div>
        <div className="flex items-center">
          <WiHumidity className="text-3xl -ml-1" />
          <span>Humidity - {data?.current?.humidity}% </span>
        </div>
        <div className="flex items-center">
          <WiSunrise className="text-3xl -ml-1" />
          <span>Sunrise - {sunriseFormat} </span>
        </div>
        <div className="flex items-center">
          <WiSunset className="text-3xl -ml-1" />
          <span>Sunset - {sunsetFormat} </span>
        </div>
      </div>
      <div className="md:flex md:self-start hidden ">
        <div className="flex items-end font-thin">
          <span className="text-6xl font-thin">
            {(+data?.current?.temp).toFixed(1)}
          </span>
          <div className="flex self-center mt-3">
            <span className="text-3xl">&deg;</span>
            <span className="text-4xl font-thin">C</span>
          </div>
          <span className="text-6xl self-center px-2  text-gray-800/90">|</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img
            className="align-bottom block -ml-4 w-20"
            src={`http://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`}
            alt="Weather-icon"
          />

          <span className="text-2xl -mt-6">
            {data?.current?.weather[0]?.description}
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        {data?.current?.dt && <TimeFormat date={data?.current?.dt} />}
        {geoLocation && (
          <div>
            <div>City: {geoLocation[0]?.name}</div>
            <div>State: {geoLocation[0]?.state}</div>
            <div>Country: {geoLocation[0]?.country}</div>
          </div>
        )}
      </div>
    </div>
  );
  if (locationLoading || currentLoading) {
    currentweather = <Spinner />;
  }

  if (currentError || locationError) {
    currentweather = <h2>Error in Loading</h2>;
  }

  return <div className="flex justify-center">{currentweather}</div>;
}

export default CurrentWeather;
