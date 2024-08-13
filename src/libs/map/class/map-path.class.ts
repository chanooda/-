import { ClientMap } from "./map.class";

export class MapPath {
  private path: naver.maps.Polyline;

  constructor() {
    const map = ClientMap.get();

    const path = new naver.maps.Polyline({
      map,
      path: [map.getCenter()],
      strokeLineJoin: "round",
      startIcon: 3,
      endIcon: 3,
      strokeOpacity: 0.6,
      strokeColor: "green",
    });

    this.path = path;
  }

  get() {
    return this.path;
  }

  redraw(_latitude: number, _longitude: number) {
    const newPathList = this.path.getPath();
    newPathList.push(new naver.maps.LatLng(_latitude, _longitude));
    this.path.setPath(newPathList);
  }
}
