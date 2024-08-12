import { Location } from "@@types";
import { useLayoutEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      if (!location) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {}
        );
      }

      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
    location,
  };
};
