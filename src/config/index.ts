/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Types
 */

export const WEATHER_API = {
  DEFAULTS: {
    LAT: 40.2338211,
    LON: -84.4096729,

    UNIT: "metric",

    SEARCH_RESULT_LIMIT: 5,
  },
} as const;

export const APP = {
  STORE_KEY: {
    LAT: "cloudcast-lat",
    LON: "cloudcast-lon",
    UNIT: "cloudcast-unit",
  },

  UNIT: {
    TEMP: {
      metric: "°C",
      imperial: "°F",
    },

    WIND: {
      metric: "km/h",
      imperial: "mph",
    },
  },

  OPEN_METEO: {
    TEMPERATURE_UNIT: {
      metric: "celsius",
      imperial: "fahrenheit",
    },

    WIND_SPEED_UNIT: {
      metric: "kmh",
      imperial: "mph",
    },
  },
} as const;