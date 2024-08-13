import { Coords } from "@@types";
import { calculateDistance, MINIMUM_DISTANCE } from "@libs/map";
import { useLayoutEffect, useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);

  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      if (!coords) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {}
        );

        return;
      }

      navigator.geolocation.watchPosition(
        (position) => {
          const prevLat = coords.latitude;
          const prevLon = coords.longitude;
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const distance = calculateDistance(prevLat, prevLon, lat, lon);

          console.log(distance);

          if (MINIMUM_DISTANCE < distance)
            setCoords({
              latitude: lat,
              longitude: lon,
            });
        },
        (err) => {
          console.error("useLocation watchPosition 에러", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    } else {
    }
  }, []);

  return {
    coords,
  };
};
