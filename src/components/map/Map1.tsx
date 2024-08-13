"use client";

import { ClientMap, useLocation } from "@libs";
import { MapCircle } from "@libs/map/map-circle.class";
import { MapPath } from "@libs/map/map-path.class";
import { ReactNode, useEffect } from "react";

export const Map = ({ children }: { children: ReactNode }) => {
  const { coords } = useLocation();

  useEffect(() => {
    if (coords) {
      ClientMap.getInstance(coords);
      const map = ClientMap.getMap();
      const circle = new MapCircle();
      const path = new MapPath();

      circle.redraw(coords.latitude, coords.longitude);
      path.redraw(coords.latitude, coords.longitude);

      const mapZoomChangedEvent = map.addListener(
        "zoom_changed",
        (zoom: number) => {
          circle.resize(zoom);
        }
      );

      return () => {
        map.removeListener(mapZoomChangedEvent);
      };
    }
  }, [coords?.latitude, coords?.longitude]);

  return <div id="map" className="w-full h-full"></div>;
};
