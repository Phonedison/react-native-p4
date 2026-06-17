import axios from "axios";

export const openMeteoApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export const geoCodeApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});
