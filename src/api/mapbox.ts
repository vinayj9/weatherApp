import axios from "axios";
import type { Geocoding } from "@/types";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API;

export async function reverseGeocode(
    latitude: number,
    longitude: number
): Promise<Geocoding | null> {

    const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse`,
        {
            params: {
                longitude,
                latitude,
                access_token: MAPBOX_TOKEN,
            },
        }
    );

    console.log("Mapbox Reverse:", response.data);

    const feature = response.data.features?.[0];

    console.log(feature);
    console.log(feature.properties.context);

    if (!feature) return null;

    const context = feature.properties.context ?? {};

    return {
        name:
            context.place?.name ??
            context.neighborhood?.name ??
            context.address?.name ??
            feature.properties.name,

        state:
            context.region?.name ?? "",

        country:
            context.country?.name ?? "",

        latitude,
        longitude,
    };
}