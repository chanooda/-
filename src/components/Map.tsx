"use client";

import { ClientMap, useLocation } from "@libs";
import { MapTrack } from "@libs/map/mapTrack.class";
import { useEffect } from "react";

export const Map = () => {
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
      const map = new ClientMap(location.latitude, location.longitude).getMap();
      const mapTrack = new MapTrack(map);

      mapTrack.redrawPath(location.latitude, location.longitude);

      const mapZoomChangedEvent = map.addListener(
        "zoom_changed",
        (zoom: number) => {
          mapTrack.resizeCircle(zoom);
        }
      );

      return () => {
        map.removeListener(mapZoomChangedEvent);
      };
    }
  }, [location?.latitude, location?.longitude]);

  return <div id="map" className="w-full h-full"></div>;
};
