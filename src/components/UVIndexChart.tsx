import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
    uv: {
        label: "UV Index",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

const getUVColor = (uv: number) => {
    if (uv <= 2) return "#22c55e"; // Low
    if (uv <= 5) return "#eab308"; // Moderate
    if (uv <= 7) return "#f97316"; // High
    if (uv <= 10) return "#ef4444"; // Very High
    return "#a855f7"; // Extreme
};

const getUVLevel = (uv: number) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
};

export const UVIndexChart = () => {
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

                uv: item.uvIndex,
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
                <CartesianGrid strokeDasharray="4 4" />

                <XAxis
                    dataKey="hour"
                    interval={3}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                />

                <YAxis
                    domain={[0, 12]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickCount={7}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(label) => `Today • ${label}`}
                            formatter={(value) => [
                                `${value} (${getUVLevel(Number(value))})`,
                                "UV Index",
                            ]}
                        />
                    }
                />

                <Bar
                    dataKey="uv"
                    radius={[6, 6, 0, 0]}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={getUVColor(entry.uv)}
                        />
                    ))}
                </Bar>

                <ChartLegend
                    content={<ChartLegendContent />}
                />
            </BarChart>
        </ChartContainer>
    );
};