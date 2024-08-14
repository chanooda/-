import { Coords } from "@@types";
import {
  calculateDistance,
  ClientMap,
  MapCircle,
  MapPath,
  MINIMUM_DISTANCE,
  pointTime,
  useMapStore,
  UserTrackMarker,
  watchPositionOptions,
} from "@libs/map";
import { useEffect, useRef, useState } from "react";

export const useMap = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const paths = useMapStore((state) => state.data.path);
  const points = useMapStore((state) => state.data.point);
  const setPoints = useMapStore((state) => state.setPoint);
  const setPaths = useMapStore((state) => state.setPath);
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  const record = () => {
    const newPath = new MapPath();
    const newPoint = new MapCircle();
    if (coords) {
      newPoint.redraw(coords?.latitude, coords?.longitude);
    }
    setPoints([...points, newPoint]);
    setPaths([...paths, newPath]);
    console.log(newPath);
    console.log(newPoint);
    clearTimeout(timeoutId.current);
  };

  const currentPositionSuccessCallback: PositionCallback = (position) => {
    console.log("currentPosition", position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    ClientMap.getInstance({
      latitude: lat,
      longitude: lon,
    });
    const map = ClientMap.get();
    UserTrackMarker.get();
    const startPath = new MapPath();

    setPaths([startPath]);

    map.addListener("zoom_changed", (zoom: number) => {
      UserTrackMarker.resize(zoom);
    });
  };

  const watchPositionSuccessCallback: PositionCallback = (position) => {
    console.log("watchPosition", position);

    const prevLat = coords?.latitude || position.coords.latitude;
    const prevLon = coords?.longitude || position.coords.longitude;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const distance = calculateDistance(prevLat, prevLon, lat, lon);

    console.log("watchPosition", lat, lon);
    console.log("distance", lat, lon);

    timeoutId.current = setTimeout(() => {
      record();
      clearTimeout(timeoutId.current);
    }, pointTime);

    if (MINIMUM_DISTANCE < distance) {
      clearTimeout(timeoutId.current);

      paths[paths.length - 1].redraw(lat, lon);
      UserTrackMarker.redraw(lat, lon);

      setCoords({
        latitude: lat,
        longitude: lon,
      });
    }
  };

  const currentPositionErrorCallback: PositionErrorCallback = (err) => {
    console.error("getCurrentPosition 에러", err);
  };

  const watchPositionErrorCallback: PositionErrorCallback = (err) => {
    console.error("geolocation 에러", err);
  };

  useEffect(() => {
    console.log("init");
    if ("geolocation" in navigator) {
      if (!coords) {
        navigator.geolocation.getCurrentPosition(
          currentPositionSuccessCallback,
          currentPositionErrorCallback,
          {
            enableHighAccuracy: true,
          }
        );

        return;
      }

      navigator.geolocation.watchPosition(
        watchPositionSuccessCallback,
        watchPositionErrorCallback,
        watchPositionOptions
      );
    } else {
    }
  }, []);

  return {
    coords,
  };
};
