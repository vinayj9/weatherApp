import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OverviewChart } from '@/components/OverviewChart'
import { PrecipitationChart } from '@/components/PrecipitationChart'
import { WindChart } from '@/components/WindChart'
import { useState, useEffect, useRef } from 'react'
import { HumidityChart } from './HumidityChart'
import { CloudCoverChart } from './CloudCoverChart'
import { PressureChart } from './PressureChart'
import { UVIndexChart } from './UVIndexChart'
import { VisibilityChart } from './VisibilityChart'
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Types
 */
type Tab =
    | 'overview'
    | 'precipitation'
    | 'wind'
    | 'humidity'
    | 'cloudCover'
    | 'pressure'
    | 'uv'
    | 'visibility'
/**
 * Constants
 */
const TABS_LIST = [
    {
        title: 'Overview',
        value: 'overview',
    },
    {
        title: 'Precipitation',
        value: 'precipitation',
    },
    {
        title: 'Wind',
        value: 'wind',
    },
    {
        title: 'Humidity',
        value: 'humidity',
    },
    {
        title: 'Cloud cover',
        value: 'cloudCover',
    },
    {
        title: 'Pressure',
        value: 'pressure',
    },
    {
        title: 'UV',
        value: 'uv',
    },
    {
        title: 'Visibility',
        value: 'visibility',
    },

];


export const HourlyWeatherTabs = () => {
    // States
    const [tab, setTab] = useState<Tab>('overview')
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setCanScrollLeft(scrollLeft > 0);

        setCanScrollRight(
            scrollLeft < scrollWidth - clientWidth - 1
        );
    };

    const scrollTabs = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -220 : 220,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        updateScrollButtons();

        container.addEventListener("scroll", updateScrollButtons);

        window.addEventListener("resize", updateScrollButtons);

        return () => {
            container.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, []);
    return (
        <Tabs value={tab}
            onValueChange={(value) => { setTab(value as Tab) }}
            className='flex flex-col py-4 gap-6 w-full'>
            <div className="space-y-3">

                <h2 className="text-lg font-semibold">
                    Hourly Forecast
                </h2>

                <div className="relative">

                    {canScrollLeft && (
                        <button
                            onClick={() => scrollTabs("left")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/90 backdrop-blur shadow-md p-1.5 border"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={() => scrollTabs("right")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-background/90 backdrop-blur shadow-md p-1.5 border"
                        >
                            <ChevronRight size={18} />
                        </button>
                    )}

                    {canScrollLeft && (
                        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background via-background/90 to-transparent z-20 pointer-events-none" />
                    )}

                    {canScrollRight && (
                        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background via-background/90 to-transparent z-20 pointer-events-none" />
                    )}

                    <div
                        ref={scrollRef}
                        className="overflow-x-auto no-scrollbar scroll-smooth"
                    >
                        <TabsList className="inline-flex min-w-max gap-2 bg-transparent px-10">
                            {TABS_LIST.map((item) => (
                                <TabsTrigger
                                    key={item.value}
                                    value={item.value}
                                    className="
                            shrink-0
                            h-9
                            px-4
                            rounded-full
                            bg-secondary
                            border-none
                            data-[state=active]:bg-primary
                            data-[state=active]:text-primary-foreground
                        "
                                >
                                    {item.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                </div>

            </div>
            <TabsContent value='overview'>
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OverviewChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='precipitation'>
                <Card>
                    <CardHeader>
                        <CardTitle>Precipitation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PrecipitationChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='wind'>
                <Card>
                    <CardHeader>
                        <CardTitle>Wind</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WindChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='humidity'>
                <Card>
                    <CardHeader>
                        <CardTitle>Humidity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HumidityChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='cloudCover'>
                <Card>
                    <CardHeader>
                        <CardTitle>Cloud Cover</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CloudCoverChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='pressure'>
                <Card>
                    <CardHeader>
                        <CardTitle>Pressure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PressureChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='uv'>
                <Card>
                    <CardHeader>
                        <CardTitle>UV</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UVIndexChart />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='visibility'>
                <Card>
                    <CardHeader>
                        <CardTitle>Visibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VisibilityChart />
                    </CardContent>
                </Card>
            </TabsContent>

        </Tabs>
    )
}