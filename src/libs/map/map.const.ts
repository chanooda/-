const baseRadius = 800;

export const getMapCircleSize = (zoom: number) => {
  return baseRadius / Math.pow(2, zoom - 10);
};
