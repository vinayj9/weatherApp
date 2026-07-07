import { useContext } from "react";
import { WeatherProviderContext } from "@/components/WeatherProvider";

export const useWeather = () => {
    return useContext(WeatherProviderContext);
};