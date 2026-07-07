import { Skeleton } from "@/components/ui/skeleton"
import{useWeather} from "@/hooks/useWeather"

export const PageHeader = () => {
    const { weather } = useWeather();

    if (!weather) {
        return <Skeleton className="h-16 w-64 rounded-xl mb-6" />;
    }

    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());

    return (
        <header className="mb-8">
            <p className="text-sm text-muted-foreground mb-1">
                {today}
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
                {weather.location.name}
            </h1>

            <p className="text-muted-foreground">
                {weather.location.state
                    ? `${weather.location.state}, `
                    : ""}
                {weather.location.country}
            </p>
        </header>
    );
};