import { ClientMap } from "./map.class";
import { getMapCircleSize } from "./map.const";

export class MapCircle {
  private circle: naver.maps.Circle;

  constructor() {
    const map = ClientMap.getMap();

    const circle = new naver.maps.Circle({
      center: map.getCenter(),
      fillColor: "red",
      strokeColor: "black",
      map,
      radius: getMapCircleSize(map.getZoom()),
      fillOpacity: 0.6,
    });

    this.circle = circle;
  }

  get() {
    return this.circle;
  }

  resize(zoom: number) {
    this.circle.setRadius(getMapCircleSize(zoom));
  }

  redraw(_latitude: number, _longitude: number) {
    this.circle.setCenter(new naver.maps.LatLng(_latitude, _longitude));
  }
}
