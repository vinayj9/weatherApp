import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
    Area,
    AreaChart,
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
    temp: {
        label: "Temperature",
        color: "var(--chart-1)",
    },
    feels: {
        label: "Feels Like",
        color: "var(--muted-foreground)",
    },
} satisfies ChartConfig;

export const OverviewChart = () => {
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
                temp: item.temperature,
                feels: item.feelsLike,
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
            <AreaChart
                accessibilityLayer
                data={chartData}
            >
                <defs>
                    <linearGradient
                        id="fillTemp"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--temp-high)"
                            stopOpacity={0.9}
                        />

                        <stop
                            offset="60%"
                            stopColor="var(--temp-mid)"
                            stopOpacity={0.45}
                        />

                        <stop
                            offset="100%"
                            stopColor="var(--temp-low)"
                            stopOpacity={0}
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
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickCount={5}
                    tickFormatter={(value) => `${value}°`}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                        />
                    }
                />

                <Area
                    type="monotone"
                    dataKey="temp"
                    fill="url(#fillTemp)"
                    fillOpacity={1}
                    stroke="var(--color-temp)"
                    strokeWidth={3}
                    activeDot={{
                        r: 5,
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="feels"
                    fillOpacity={0}
                    stroke="var(--color-feels)"
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    activeDot={false}
                />

                <ChartLegend
                    content={<ChartLegendContent />}
                />
            </AreaChart>
        </ChartContainer>
    );
};