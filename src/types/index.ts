/**
 * Application Weather Types
 * Provider: Open-Meteo
 * These types represent the application's data model,
 * NOT the raw API response.
 */

export interface Weather {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  location: Geocoding;
  timezone: WeatherTimezone;
}

export interface CurrentWeather {
  time: string;

  temperature: number;
  feelsLike: number;

  humidity: number;
  pressure: number;

  cloudCover: number;

  windSpeed: number;
  windDirection: number;
  windGust?: number;

  visibility?: number;

  weatherCode: number;
  isDay: boolean;
  dewPoint: number;
}

export interface HourlyForecast {
  time: string;

  temperature: number;

  feelsLike: number;

  humidity: number;

  precipitationProbability: number;

  weatherCode: number;

  windSpeed: number;

  cloudCover: number;

  pressure: number;

  uvIndex: number;

  visibility: number;
}

export interface DailyForecast {
  date: string;

  temperature: {
    min: number;
    max: number;
  };

  sunrise: string;
  sunset: string;

  weatherCode: number;

  precipitationProbabilityMax?: number;

  windSpeedMax?: number;
}

export interface Geocoding {
  name: string;
  country: string;
  state?: string;

  latitude: number;
  longitude: number;
}

export interface WeatherTimezone {
  timezone: string;
}

export type WeatherUnitType = "metric" | "imperial";