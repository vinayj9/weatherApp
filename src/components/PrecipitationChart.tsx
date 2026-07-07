import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
    Bar,
    BarChart,
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

const chartConfig = {
    precipitation: {
        label: "Chance of Rain",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export const PrecipitationChart = () => {
    const { weather } = useWeather();

    const chartData = useMemo(() => {
        if (!weather) return [];

        return weather.hourly
            .slice(0, 24)
            .map((item, index) => ({
                hour:
                    index === 0
                        ? "Now"
                        : new Date(item.time).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              hour12: true,
                          }),
                precipitation: item.precipitationProbability,
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
            <BarChart
                accessibilityLayer
                data={chartData}
            >
                <defs>
                    <linearGradient
                        id="precipitationGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--color-precipitation)"
                            stopOpacity={1}
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--color-precipitation)"
                            stopOpacity={0.45}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="4 4" />

                <XAxis
                    dataKey="hour"
                    interval={3}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                />

                <YAxis
                    domain={[0, 100]}
                    tickCount={5}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickFormatter={(value) => `${value}%`}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            formatter={(value) => [`${value}%`, "Chance of Rain"]}
                        />
                    }
                />

                <ChartLegend
                    content={<ChartLegendContent />}
                />

                <Bar
                    dataKey="precipitation"
                    fill="url(#precipitationGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={22}
                />
            </BarChart>
        </ChartContainer>
    );
};