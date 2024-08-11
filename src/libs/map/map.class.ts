import { getMapCircleSize } from "./map.const";

export class ClientMap {
  private map: naver.maps.Map;
  private circle: naver.maps.Circle;

  constructor(_latitude: number, _longitude: number) {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(_latitude, _longitude),
      zoom: 15,
    });

    this.map = map;

    const circle = new naver.maps.Circle({
      center: new naver.maps.LatLng(_latitude, _longitude),
      fillColor: "red",
      strokeColor: "black",
      map: this.map,
      radius: getMapCircleSize(map.getZoom()),
      fillOpacity: 0.6,
    });

    this.circle = circle;
  }

  getMap() {
    return this.map;
  }

  resizeCircle(zoom: number) {
    this.circle.setRadius(getMapCircleSize(zoom));
  }
}
