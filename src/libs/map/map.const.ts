export const BASE_RADIUS = 800;
export const MINIMUM_DISTANCE = 5;

export const getMapCircleSize = (zoom: number) => {
  return BASE_RADIUS / Math.pow(2, zoom - 10);
};

export const calculateDistance = (
  prevLat: number,
  prevLon: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // 지구 반경 (미터)
  const radLat1 = (prevLat * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - prevLat) * Math.PI) / 180;
  const deltaLon = ((lon2 - prevLon) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 거리 반환 (미터 단위)
};

export const watchPositionOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
};

export const pointTime = 60 * 5 * 1000;
