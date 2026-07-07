import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useWeather } from "@/hooks/useWeather";
import { createRoot } from "react-dom/client";
import { Marker } from "@/components/Marker";
import { getWeatherInfo } from "@/lib/WeatherCode";
import { reverseGeocode } from "@/api/mapbox";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

export const WeatherMap = () => {
  const { weather, unit, setWeather } = useWeather();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!weather) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/standard",
        center: [
          weather.location.longitude,
          weather.location.latitude,
        ],
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      map.current.on("click", async (e) => {

        try {

          const { lat, lng } = e.lngLat;

          console.log("Clicked:", lat, lng);

          const location = await reverseGeocode(lat, lng);

          if (!location) return;

          console.log("Reverse Geocoded:", location);

          setWeather({
            location,
          });

        } catch (err) {

          console.error(err);

        }

      });
    }



    const lngLat: [number, number] = [
      weather.location.longitude,
      weather.location.latitude,
    ];

    const weatherInfo = getWeatherInfo(
      weather.current.weatherCode,
      weather.current.isDay
    );

    const markerElement = document.createElement("div");

    createRoot(markerElement).render(
      <Marker
        temperature={weather.current.temperature}
        unit={unit}
        icon={weatherInfo.icon}
      />
    );
    map.current.flyTo({
      center: lngLat,
      zoom: 11,
      essential: true,
    });

    if (marker.current) {
      marker.current.remove();
    }

    marker.current = new mapboxgl.Marker({
      element: markerElement,
      anchor: "bottom",
    })
      .setLngLat(lngLat)
      .addTo(map.current);

  }, [weather]);

  return (
    <div
      ref={mapContainer}
      className="h-112.5 w-full rounded-2xl overflow-hidden"
    />
  );
};