import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./fetch-data";

const store = configureStore({
  reducer: { [weatherApi.reducerPath]: weatherApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
