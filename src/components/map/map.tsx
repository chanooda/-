"use client";

import { useMap } from "@libs";
import { ReactNode } from "react";

export const Map = ({ children }: { children: ReactNode }) => {
  useMap();

  return (
    <div id="map" className="w-full h-full relative">
      {children}
    </div>
  );
};
