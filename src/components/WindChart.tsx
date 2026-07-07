import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";
import type { ChartConfig } from "@/components/ui/chart";
import { APP } from "@/config";

const chartConfig = {
    wind: {
        label: "Wind Speed",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;

export const WindChart = () => {
    const { weather, unit } = useWeather();

    const chartData = useMemo(() => {
        if (!weather) return [];

        return weather.hourly
            .slice(0, 24)
            .map((item) => ({
                hour: new Date(item.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                }),
                wind: item.windSpeed,
            }));
    }, [weather]);

    if (!weather) {
        return <Skeleton className="h-90 w-full rounded-xl" />;
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="h-90 w-full"
        >
            <LineChart
                accessibilityLayer
                data={chartData}
            >
                <CartesianGrid strokeDasharray="4 4" />

                <XAxis
                    dataKey="hour"
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                    // minTickGap={30}
                    tickMargin={16}
                    // tickCount={12}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickCount={5}
                    tickFormatter={(value) => `${value} ${APP.UNIT.WIND[unit]}`}
                />

                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />

                <ChartLegend
                    content={<ChartLegendContent />}
                />

                <Line
                    type="monotone"
                    dataKey="wind"
                    stroke="var(--color-wind)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                        r: 5,
                    }}
                />
            </LineChart>
        </ChartContainer>
    );
};