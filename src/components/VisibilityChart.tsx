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
    visibility: {
        label: "Visibility",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export const VisibilityChart = () => {
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

                visibility: item.visibility / 1000, // meters → km
            }));
    }, [weather]);

    if (!weather) {
        return <Skeleton className="h-90 w-full rounded-xl" />;
    }

    const visibilities = chartData.map((d) => d.visibility);

    const minVisibility = Math.max(
        0,
        Math.floor(Math.min(...visibilities) - 1)
    );

    const maxVisibility = Math.ceil(
        Math.max(...visibilities) + 1
    );

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
                    domain={[minVisibility, maxVisibility]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickCount={6}
                    tickFormatter={(value) => `${value} km`}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(label) => `Today • ${label}`}
                            formatter={(value) => [
                                `${Number(value).toFixed(1)} km `,
                                "Visibility",
                            ]}
                        />
                    }
                />

                <Line
                    type="monotone"
                    dataKey="visibility"
                    stroke="var(--color-visibility)"
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