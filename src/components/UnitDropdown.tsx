// Custom modules

// Hooks
import { useContext } from "react"

// Components
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import{ WeatherProviderContext } from "@/components/WeatherProvider"
import type { WeatherUnitType } from "@/types"
// Types

export const UnitDropdown = () => {
    // Hooks
    // States
    const {unit, setUnit} = useContext(WeatherProviderContext)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'secondary'} size={'icon'}>
                    °{unit === 'metric' ? 'C' : 'F'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-50">
                <DropdownMenuLabel className="text-muted-foreground">
                    Weather Settings
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value="unit" onValueChange={(value) => setUnit(value as WeatherUnitType)}>
                    <DropdownMenuRadioItem value="metric">
                        Metric (°C)
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="imperial">
                        Imperial (°F)
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}