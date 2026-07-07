import { WEATHER_API } from "@/config"

// Hooks
import { useState, useEffect, useCallback, useContext } from "react"

// Components
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from "@/components/ui/item"

import { MapPinnedIcon, SearchIcon } from "lucide-react"
import type { Geocoding } from "@/types"
import { geocodingApi } from "@/api/geocoding";
import { WeatherProviderContext } from "@/components/WeatherProvider";

export const SearchDialog = () => {
    const [search, setSearch] = useState<string>("")
    const [results, setResults] = useState<Geocoding[]>([])
    const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false)

    // Search request
    const geocoding = useCallback(async (search: string) => {
        if (!search) return;
        const response = await geocodingApi.get('/search', {
            params: {
                name: search,
                count: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
                language: 'en',
                format: 'json',
            },
        });
        // console.log(response.data);
        return (response.data.results ?? []).map((item: any) => ({
            name: item.name,
            country: item.country,
            state: item.admin1,
            latitude: item.latitude,
            longitude: item.longitude,
        }));
    }, []);

    const { setWeather } = useContext(WeatherProviderContext);

    // Keyboard shortcut for opening search modal <Ctrl-K>
    useEffect(() => {
        const shortcut = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setSearchDialogOpen(true);
            }
        };
        document.addEventListener('keydown', shortcut);

        // Remove the listener when SearchDialog is removed from the DOM
        return () => {
            document.removeEventListener('keydown', shortcut);
        }
    }, []);



    // Search Functionality
    useEffect(() => {
        if (!search) return;

        (async () => {
            const results = await geocoding(search);
            if (results) setResults(results);
        })();
    }, [search, geocoding]);

    return (
        <Dialog open={searchDialogOpen}
            onOpenChange={setSearchDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost"
                    className='me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50'
                    onClick={() => setSearchDialogOpen((prev) => !prev)}>
                    <SearchIcon className="lg:text-muted-foreground" />
                    <div className='flex justify-between w-62.5 max-lg:hidden'>Search weather ...
                        <KbdGroup>
                            <Kbd>⌘</Kbd>
                            <Kbd>K</Kbd>
                        </KbdGroup>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-card gap-0"
                showCloseButton={false}>
                <DialogHeader className="sr-only">
                    <DialogTitle>Search Weather</DialogTitle>
                    <DialogDescription>
                        Search weather by city or country
                    </DialogDescription>
                </DialogHeader>
                <InputGroup className="ring-0! border-t-0! border-x-0! border-b border-border! rounded-b-none bg-transparent">
                    <InputGroupInput placeholder="Search weather..." value={search} onInput={(e) => setSearch(e.currentTarget.value)} />
                </InputGroup>
                <ItemGroup className="min-h-80 p-2">
                    {search && results.length === 0 && (
                        <p className="text-center text-sm py-4">
                            No results found!
                        </p>
                    )}
                    {results.map(({ name, latitude, longitude, country, state }) =>
                        <Item
                            key={name + latitude + longitude}
                            size="sm"
                            className="relative p-2"
                        >
                            <ItemContent>
                                <ItemTitle>{name}</ItemTitle>
                                <ItemDescription>
                                    {state ? state + ', ' : ''}
                                    {country}
                                </ItemDescription>
                            </ItemContent>

                            <ItemActions>
                                <DialogClose asChild>
                                    <Button variant="ghost" size='icon' className='after:absoulute after:inset-0'
                                        onClick={() => {
                                            const location: Geocoding = {
                                                name,
                                                state,
                                                country,
                                                latitude,
                                                longitude,
                                            };
                                            console.log("Selected:", location);
                                            setWeather({ location });
                                        }}>
                                        <MapPinnedIcon className="text-muted-foreground" />
                                    </Button>
                                </DialogClose>
                            </ItemActions>
                        </Item>
                    )}

                </ItemGroup>
            </DialogContent>
        </Dialog>
    );
}; 