// Node modules
import { createContext } from "react";

// Custom modules
import { openMeteoApi } from "@/api/openMeteo";

// Hooks
import { useState, useEffect, useCallback } from "react";

// Types
import type {
    Weather,
    Geocoding,
    WeatherUnitType
} from "@/types";

import type { OpenMeteoResponse } from "@/types/openMeteo";

import { mapOpenMeteoToWeather } from "@/lib/weatherMapper";

type WeatherStateParam = {
    location: Geocoding;
};

type WeatherProviderState = {
    weather: Weather | null;
    unit: WeatherUnitType;
    setUnit: (unit: WeatherUnitType) => void;
    setWeather: (weather: WeatherStateParam) => void;
};

const initialState: WeatherProviderState = {
    weather: null,
    setWeather: () => null,
    unit: "metric",
    setUnit: () => null
};

// Context
export const WeatherProviderContext = createContext<WeatherProviderState>(initialState);

export const WeatherProvider = ({ children }: React.PropsWithChildren) => {
    const DEFAULT_LOCATION: Geocoding = {
        name: "New York",
        state: "New York",
        country: "United States",
        latitude: 40.7128,
        longitude: -74.0060,
    };
    // States
    const [weather, setWeatherState] = useState<Weather | null>(null);
    const [unit, setUnit] = useState<WeatherUnitType>("metric");
    const [location, setLocation] = useState<Geocoding>(DEFAULT_LOCATION);

    // Callbacks
    const fetchWeather = useCallback(async (location: Geocoding, unit: WeatherUnitType) => {
        try {
            const { latitude, longitude } = location;
            const response = await openMeteoApi.get("/forecast", {
                params: {
                    latitude,
                    longitude,

                    temperature_unit:
                        unit === "metric"
                            ? "celsius"
                            : "fahrenheit",

                    wind_speed_unit:
                        unit === "metric"
                            ? "kmh"
                            : "mph",

                    current: [
                        "temperature_2m",
                        "apparent_temperature",
                        "relative_humidity_2m",
                        "pressure_msl",
                        "cloud_cover",
                        "wind_speed_10m",
                        "wind_direction_10m",
                        "wind_gusts_10m",
                        "is_day",
                        "weather_code",
                        "visibility",
                        "dew_point_2m",
                    ].join(","),

                    hourly: [
                        "temperature_2m",
                        "apparent_temperature",
                        "relative_humidity_2m",
                        "precipitation_probability",
                        "weather_code",
                        "wind_speed_10m",
                        "cloud_cover",
                        "pressure_msl",
                        "uv_index",
                        "visibility",
                    ].join(","),

                    daily: [
                        "weather_code",
                        "temperature_2m_max",
                        "temperature_2m_min",
                        "sunrise",
                        "sunset",
                        "precipitation_probability_max",
                        "wind_speed_10m_max"
                    ].join(","),

                    timezone: "auto"
                }
            });
            const data: OpenMeteoResponse = response.data;
            // console.log("Current API data:", data.current);

            // const mappedWeather: Weather = mapOpenMeteoToWeather(data, location);
            // console.log("Mapped Weather Data:", mappedWeather);
            // setWeatherState(mappedWeather);
            const mappedWeather = mapOpenMeteoToWeather(data, location);
            setWeatherState(mappedWeather);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }, []);

    const setWeather = useCallback(
        ({ location }: WeatherStateParam) => {
            setLocation(location);
            console.log("New location:", location);
        },
        [fetchWeather, unit]
    );

    useEffect(() => {
        fetchWeather(location, unit);
    }, [fetchWeather, location, unit]);

    type WeatherStateParam = {
        location: Geocoding;
    };
    return (
        <WeatherProviderContext.Provider
            value={{
                weather,
                unit,
                setUnit,
                setWeather,
            }}
        >
            {children}
        </WeatherProviderContext.Provider>
    );
};