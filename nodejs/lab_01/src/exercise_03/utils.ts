import { Point } from "./interfaces";

export const getDistance = (fP: Point, sP: Point) => {
  return Math.sqrt(Math.pow(fP.x - sP.x, 2) + Math.pow(fP.y - sP.y, 2));
};
