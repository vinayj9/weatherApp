import { useWeather } from "@/hooks/useWeather";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { APP } from "@/config";
import { Wind, Droplets, Gauge, Eye, Thermometer, } from "lucide-react";
import { getWeatherInfo } from "@/lib/WeatherCode";

export const CurrentWeatherCard = () => {
    const { weather, unit } = useWeather();

    if (!weather) {
        return <Skeleton className="h-80 rounded-xl" />;
    }

    const current = weather.current;
    const weatherInfo = getWeatherInfo(current.weatherCode, current.isDay);
    return (

        <Card className="rounded-2xl p-4 sm:p-6">

            <CardHeader className="p-0">

                <CardTitle>
                    Current Weather
                </CardTitle>

                <CardDescription>
                    Last updated{" "}
                    {new Date(current.time).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        timeZone: weather.timezone.timezone,
                    })}

                </CardDescription>

            </CardHeader>

            <CardContent className="p-0 mt-8">

                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">

                    <img
                        src={weatherInfo.icon}
                        alt={weatherInfo.label}
                        className="w-20 h-20"
                    />

                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold">

                        {Math.round(current.temperature)}

                        <span className="text-3xl sm:text-4xl">

                            {APP.UNIT.TEMP[unit]}

                        </span>

                    </h2>

                    <div>

                        <h3 className="text-2xl font-semibold">

                            {weatherInfo.label}

                        </h3>

                        <p className="text-muted-foreground">

                            Feels like{" "}

                            {Math.round(current.feelsLike)}

                            {APP.UNIT.TEMP[unit]}

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">

                    <div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Wind size={16} />

                            Wind

                        </div>

                        <p className="font-semibold mt-1">

                            {current.windSpeed} {APP.UNIT.WIND[unit]}

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Droplets size={16} />

                            Humidity

                        </div>

                        <p className="font-semibold mt-1">

                            {current.humidity}%

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Eye size={16} />

                            Visibility

                        </div>

                        <p className="font-semibold mt-1">

                            {current.visibility
                                ? `${(current.visibility / 1000).toFixed(1)} km`
                                : "--"}

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Gauge size={16} />

                            Pressure

                        </div>

                        <p className="font-semibold mt-1">

                            {current.pressure} hPa

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Thermometer size={16} />

                            Dew Point

                        </div>

                        <p className="font-semibold mt-1">

                            {Math.round(current.dewPoint)}

                            {APP.UNIT.TEMP[unit]}

                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
};
