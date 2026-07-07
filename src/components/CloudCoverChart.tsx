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
    cloudCover: {
        label: "Cloud Cover",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export const CloudCoverChart = () => {
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

                cloudCover: item.cloudCover,
            }));
    }, [weather]);

    if (!weather) {
        return (
            <Skeleton className="h-90 w-full rounded-xl" />
        );
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
                        id="fillCloudCover"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--color-cloudCover)"
                            stopOpacity={0.9}
                        />

                        <stop
                            offset="100%"
                            stopColor="var(--color-cloudCover)"
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
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={16}
                    tickCount={5}
                    tickFormatter={(value) => `${value}%`}
                />

                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(label) => `Today • ${label}`}
                            formatter={(value) => [
                                `${value}%`,
                                "Cloud Cover",
                            ]}
                        />
                    }
                />

                <Area
                    type="monotone"
                    dataKey="cloudCover"
                    fill="url(#fillCloudCover)"
                    fillOpacity={1}
                    stroke="var(--color-cloudCover)"
                    strokeWidth={3}
                    activeDot={{
                        r: 5,
                    }}
                />

                <ChartLegend
                    content={<ChartLegendContent />}
                />
            </AreaChart>
        </ChartContainer>
    );
};