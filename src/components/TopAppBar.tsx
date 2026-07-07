import { Logo } from "@/assets/Logo";
import { SearchDialog } from "@/components/SearchDialog";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { UnitDropdown } from "@/components/UnitDropdown";
import { LocateFixedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/useWeather";
import { getCurrentPosition } from "@/lib/geolocation"
import { reverseGeocode } from "@/api/mapbox";

export const TopAppBar = () => {
    const { setWeather } = useWeather();
    const handleCurrentLocation = async () => {
        try {
            const position = await getCurrentPosition();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Coordinates:", latitude, longitude);

            const location = await reverseGeocode(
                latitude,
                longitude
            );

            if (!location) {
                console.error("Unable to determine location");
                return;
            }
            console.log("Current Location:", location);

            setWeather({
                location,
            });

        } catch (error) {

            console.error(error);

        }
    };
    return (
        <div className=' h-16 lg:my-4 '>
            <header className='h-16 px-4  flex items-center justify-between fixed top-0 left-0 w-full bg-background/50 backdrop-blur-lg border-b border-border z-50 lg:border lg-rounded-2xl lg:w-auto lg:max-w-384 lg:max-auto lg:top-4 lg:left-4 lg:right-4 gap-5'>
                <Logo />
                <SearchDialog />
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleCurrentLocation}
                >
                    <LocateFixedIcon />
                </Button>
                <div className='flex gap-2'>
                    <ThemeDropdown />
                    <UnitDropdown />
                </div>
            </header>
        </div>
    )

};
