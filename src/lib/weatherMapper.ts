import type {
  Weather,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  Geocoding,
} from "@/types";

import type { OpenMeteoResponse } from "@/types/openMeteo";

export function mapOpenMeteoToWeather(
  data: OpenMeteoResponse,
  location: Geocoding
): Weather {
  // Current Weather
  const current: CurrentWeather = {
    time: data.current.time,

    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,

    humidity: data.current.relative_humidity_2m,
    pressure: data.current.pressure_msl,

    cloudCover: data.current.cloud_cover,

    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    windGust: data.current.wind_gusts_10m,

    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    visibility: data.current.visibility,
    dewPoint: data.current.dew_point_2m,
  };

  // Hourly Forecast
  const hourly: HourlyForecast[] = data.hourly.time.map((time, index) => ({
    time,

    temperature: data.hourly.temperature_2m[index],

    humidity: data.hourly.relative_humidity_2m[index],

    precipitationProbability:
      data.hourly.precipitation_probability[index],

    weatherCode: data.hourly.weather_code[index],

    windSpeed: data.hourly.wind_speed_10m[index],

    feelsLike: data.hourly.apparent_temperature[index],

    cloudCover: data.hourly.cloud_cover[index],

    pressure: data.hourly.pressure_msl[index],

    uvIndex: data.hourly.uv_index[index],

    visibility: data.hourly.visibility[index],
  }));

  // Daily Forecast
  const daily: DailyForecast[] = data.daily.time.map((date, index) => ({
    date,

    temperature: {
      min: data.daily.temperature_2m_min[index],
      max: data.daily.temperature_2m_max[index],
    },

    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],

    weatherCode: data.daily.weather_code[index],

    precipitationProbabilityMax:
      data.daily.precipitation_probability_max[index],

    windSpeedMax: data.daily.wind_speed_10m_max[index],
  }));

  return {
    current,
    hourly,
    daily,

    location,

    timezone: {
      timezone: data.timezone,
    },
  };
}