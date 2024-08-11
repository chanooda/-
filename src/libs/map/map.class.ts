export class ClientMap {
  private static instance: ClientMap | null = null;
  private static map: naver.maps.Map;

  constructor(_latitude: number, _longitude: number) {
    if (!ClientMap.instance) {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(_latitude, _longitude),
        zoom: 15,
      });
      ClientMap.instance = this;
      ClientMap.map = map;
    }
    return ClientMap.instance;
  }

  getMap() {
    return ClientMap.map;
  }
}
