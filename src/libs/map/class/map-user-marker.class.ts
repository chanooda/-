import { getMapCircleSize } from "../map.const";
import { ClientMap } from "./map.class";

export class UserTrackMarker {
  private static instance: UserTrackMarker;
  private marker: naver.maps.Circle;

  constructor() {
    const map = ClientMap.get();
    const marker = new naver.maps.Circle({
      center: map.getCenter(),
      fillColor: "red",
      strokeColor: "black",
      map,
      radius: getMapCircleSize(map.getZoom()),
      zIndex: 10,
    });

    this.marker = marker;
  }

  static getInstance() {
    if (!UserTrackMarker.instance) {
      UserTrackMarker.instance = new UserTrackMarker();
    }

    return UserTrackMarker.instance;
  }

  static get() {
    return this.getInstance().marker;
  }

  static resize(zoom: number) {
    this.get().setRadius(getMapCircleSize(zoom));
  }

  static redraw(_latitude: number, _longitude: number) {
    this.get().setCenter(new naver.maps.LatLng(_latitude, _longitude));
  }
}
