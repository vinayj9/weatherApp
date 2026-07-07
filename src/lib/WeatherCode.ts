import ClearDay from "@meteocons/svg/fill/clear-day.svg";
import ClearNight from "@meteocons/svg/fill/clear-night.svg";

import PartlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import PartlyCloudyNight from "@meteocons/svg/fill/partly-cloudy-night.svg";

import Cloudy from "@meteocons/svg/fill/cloudy.svg";

import FogDay from "@meteocons/svg/fill/fog-day.svg";
import FogNight from "@meteocons/svg/fill/fog-night.svg";

import Drizzle from "@meteocons/svg/fill/drizzle.svg";
import Rain from "@meteocons/svg/fill/rain.svg";
import Snow from "@meteocons/svg/fill/snow.svg";
import Thunderstorms from "@meteocons/svg/fill/thunderstorms.svg";

export function getWeatherInfo(code: number, isDay: boolean) {
    switch (code) {
        case 0:
            return {
                label: "Clear Sky",
                icon: isDay ? ClearDay : ClearNight,
            };

        case 1:
        case 2:
            return {
                label: "Partly Cloudy",
                icon: isDay
                    ? PartlyCloudyDay
                    : PartlyCloudyNight,
            };

        case 3:
            return {
                label: "Overcast",
                icon: Cloudy,
            };

        case 45:
        case 48:
            return {
                label: "Fog",
                icon: isDay ? FogDay : FogNight,
            };

        case 51:
        case 53:
        case 55:
            return {
                label: "Drizzle",
                icon: Drizzle,
            };

        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return {
                label: "Rain",
                icon: Rain,
            };

        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return {
                label: "Snow",
                icon: Snow,
            };

        case 95:
        case 96:
        case 99:
            return {
                label: "Thunderstorm",
                icon: Thunderstorms,
            };

        default:
            return {
                label: "Unknown",
                icon: Cloudy,
            };
    }
}