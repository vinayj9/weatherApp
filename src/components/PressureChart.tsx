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

const chartConfig = {
    pressure: {
        label: "Pressure",
        color: "var(--chart-6)",
    },
} satisfies ChartConfig;

export const PressureChart = () => {
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

                pressure: item.pressure,
            }));
    }, [weather]);

    if (!weather) {
        return (
            <Skeleton className="h-90 w-full rounded-xl" />
        );
    }

    const pressures = chartData.map((d) => d.pressure);

    const minPressure = Math.floor(Math.min(...pressures) - 2);
    const maxPressure = Math.ceil(Math.max(...pressures) + 2);
    
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
                    interval={3}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                />

                <YAxis
                    domain={[minPressure, maxPressure]}
                    width={70}
                    tickCount={5}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickFormatter={(value) => `${value} hPa`}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(label) => `Today • ${label}`}
                            formatter={(value) => [
                                `${value} hPa `,
                                "Pressure",
                            ]}
                        />
                    }
                />

                <Line
                    type="monotone"
                    dataKey="pressure"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                        r: 5,
                    }}
                />

                <ChartLegend
                    content={<ChartLegendContent />}
                />
            </LineChart>
        </ChartContainer>
    );
};