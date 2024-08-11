import { Location } from "@@types";
import { useLayoutEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
    }
  }, []);

  return {
    location,
  };
};
