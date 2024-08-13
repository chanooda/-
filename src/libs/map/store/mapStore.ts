import { create } from "zustand";
import { MapCircle, MapPath } from "../class";

interface mapStoreData {
  point: MapCircle[];
  path: MapPath[];
}

interface MapStore {
  data: mapStoreData;
  setPath: (path: MapPath[]) => void;
  setPoint: (point: MapCircle[]) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  data: {
    path: [],
    point: [],
  },
  setPath: (path: MapPath[]) =>
    set((state) => ({
      data: { ...state.data, path: [...state.data.path, ...path] },
    })),
  setPoint: (point) => set((state) => ({ data: { ...state.data, point } })),
}));
