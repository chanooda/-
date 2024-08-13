export class ClientMap {
  private static instance: ClientMap;
  private map: naver.maps.Map;

  private constructor(coords: { latitude: number; longitude: number }) {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(coords.latitude, coords.longitude),
      zoom: 15,
    });

    this.map = map;
  }

  static getInstance(coords?: { latitude: number; longitude: number }) {
    if (this.instance) {
      return this.instance;
    }

    if (!coords) {
      throw new Error("coords가 없습니다.");
    }

    this.instance = new ClientMap(coords);
    return this.instance;
  }

  static getMap() {
    return this.getInstance().map;
  }
}
