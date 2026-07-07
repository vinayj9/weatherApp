// src/api/geocoding.ts
import axios from "axios";

export const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});

