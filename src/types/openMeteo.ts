/**
 * Open-Meteo API Response Types
 * https://open-meteo.com/en/docs
 */

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current: OpenMeteoCurrent;
  // current_units: OpenMeteoCurrentUnits;

  hourly: OpenMeteoHourly;
  // hourly_units: OpenMeteoHourlyUnits;

  daily: OpenMeteoDaily;
  // daily_units: OpenMeteoDailyUnits;
}

export interface OpenMeteoCurrent {
  time: string;

  interval: number;

  temperature_2m: number;

  apparent_temperature: number;

  relative_humidity_2m: number;

  pressure_msl: number;

  cloud_cover: number;

  wind_speed_10m: number;

  wind_direction_10m: number;

  wind_gusts_10m: number;

  weather_code: number;

  is_day: number;

  dew_point_2m: number;

  visibility: number;
}

export interface OpenMeteoHourly {
  time: string[];

  temperature_2m: number[];

  relative_humidity_2m: number[];

  precipitation_probability: number[];

  weather_code: number[];

  wind_speed_10m: number[];

  apparent_temperature: number[];

  cloud_cover: number[];

  pressure_msl: number[];

  uv_index: number[];

  visibility: number[];
}

export interface OpenMeteoDaily {
  time: string[];

  weather_code: number[];

  temperature_2m_max: number[];

  temperature_2m_min: number[];

  sunrise: string[];

  sunset: string[];

  precipitation_probability_max: number[];

  wind_speed_10m_max: number[];
}