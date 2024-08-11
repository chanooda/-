import { Location } from "@@types";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
    }
  }, []);

  return {
    location,
  };
};
