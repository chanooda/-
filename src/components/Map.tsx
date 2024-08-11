"use client";

import { ClientMap, useLocation } from "@libs";
import { useEffect } from "react";

export const Map = () => {
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
      const clientMap = new ClientMap(location.latitude, location.longitude);

      const map = clientMap.getMap();

      map.addListener("zoom_changed", (zoom: number) => {
        clientMap.resizeCircle(zoom);
      });
    }
  });

  return <div id="map" className="w-full h-full"></div>;
};
