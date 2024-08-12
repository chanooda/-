import { getMapCircleSize } from "./map.const";

export class MapTrack {
  private static instance: MapTrack | null = null;
  private static circle: naver.maps.Circle;
  private static path: naver.maps.Polyline;

  constructor(map: naver.maps.Map) {
    if (!MapTrack.instance) {
      const circle = new naver.maps.Circle({
        center: map.getCenter(),
        fillColor: "red",
        strokeColor: "black",
        map,
        radius: getMapCircleSize(map.getZoom()),
        fillOpacity: 0.6,
      });

      const path = new naver.maps.Polyline({
        map,
        path: [map.getCenter()],
        strokeLineJoin: "round",
        startIcon: 3,
        endIcon: 3,
        strokeOpacity: 0.6,
        strokeColor: "red",
      });

      MapTrack.instance = this;
      MapTrack.circle = circle;
      MapTrack.path = path;
    }

    return MapTrack.instance;
  }

  getCircle() {
    return MapTrack.circle;
  }

  resizeCircle(zoom: number) {
    MapTrack.circle.setRadius(getMapCircleSize(zoom));
  }

  redrawCircle(_latitude: number, _longitude: number) {
    MapTrack.circle.setCenter(new naver.maps.LatLng(_latitude, _longitude));
  }

  redrawPath(_latitude: number, _longitude: number) {
    const newPathList = MapTrack.path.getPath();
    newPathList.push(new naver.maps.LatLng(_latitude, _longitude));
    MapTrack.path.setPath(newPathList);
  }
}
