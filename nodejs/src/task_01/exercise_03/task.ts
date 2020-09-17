import { Point } from "./interfaces";
import { getDistance } from "./utils";

export const addPoint = (points: Point[], name: string, x: number, y: number): boolean => {
  const isExist = points.filter((point) => point.name === name).length > 0;

  if (isExist) {
    return false;
  }

  const point: Point = {
    name,
    x,
    y,
  };

  points.push(point);

  return true;
};

export const getPoint = (points: Point[], name: string): Point | undefined => {
  const point = points.find((point) => point.name === name);

  return point;
};

export const updatePoint = (points: Point[], name: string, data: Point): boolean => {
  const point = getPoint(points, name);

  if (!point) {
    return false;
  }

  point.name = data.name;
  point.x = data.x;
  point.y = data.y;

  return true;
};

export const deletePoint = (points: Point[], name: string): boolean => {
  const point = getPoint(points, name);

  if (point) {
    points.splice(points.indexOf(point), 1);

    return true;
  }

  return false;
};

export const getFarestPoints = (points: Point[]): Point[] | undefined => {
  let fPoint, sPoint: Point;

  if (points.length < 2) {
    return undefined;
  } else if (points.length === 2) {
    return points;
  } else {
    fPoint = points[0];
    sPoint = points[1];
    let dist = getDistance(fPoint, sPoint);

    for (let i = 0; i < points.length - 1; ++i) {
      for (let j = i + 1; j < points.length; ++j) {
        const calcDist = getDistance(points[i], points[j]);
        if (calcDist > dist) {
          fPoint = points[i];
          sPoint = points[j];
          dist = calcDist;
        }
      }
    }
  }

  return [fPoint, sPoint];
};

export const getClosePoints = (points: Point[], startPoint: Point, distance: number): Point[] => {
  const closePoints = points.filter((point) => getDistance(point, startPoint) <= distance);

  return closePoints;
};

export const getAxisPoints = (points: Point[], axis: "x" | "y"): Point[][] => {
  const greaterPoints = points.filter((point) => point[axis] > 0);
  const lesserPoints = points.filter((point) => point[axis] < 0);

  return [greaterPoints, lesserPoints];
};

export const getRectPoints = (points: Point[], upLeft: Point, downRight: Point) => {
  const rectPoints = points.filter(
    (point) =>
      point.x > upLeft.x && point.y < upLeft.y && point.x < downRight.x && point.y > downRight.y
  );

  return rectPoints;
};
