import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  endpoints: (builder) => ({
    getCurrentweather: builder.query({
      query: (arg) => {
        const { lat = "", lon = "" } = arg || "";
        return {
          url: `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=363c423f8d11223f86fa7bd54b3f93b9`,
        };
      },
    }),
    getHourlyWeather: builder.query({
      query: (arg) => {
        const { lat, lon } = arg || "";
        return {
          url: `/forecast?lat=${lat}&lon=${lon}&units=metric&appid=363c423f8d11223f86fa7bd54b3f93b9`,
        };
      },
    }),
    getDailyWeather: builder.query({
      query: (arg) => {
        const { lat, lon } = arg || "";
        return {
          url: `onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly,alerts&units=metric&appid=363c423f8d11223f86fa7bd54b3f93b9`,
        };
      },
    }),
    getGeoLocation: builder.query({
      query: (arg) => {
        const { lat, lon } = arg || "";
        return {
          url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=363c423f8d11223f86fa7bd54b3f93b9`,
        };
      },
    }),
  }),
});

export const { useGetCurrentweatherQuery,useGetHourlyWeatherQuery,useGetDailyWeatherQuery,useGetGeoLocationQuery } = weatherApi;
// export const {  } = weatherApi;
// export const {  } = weatherApi;
// export const {  } = weatherApi;
