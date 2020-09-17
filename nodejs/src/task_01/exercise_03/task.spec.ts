import * as task from "./task";

import { Point } from "./interfaces";

describe("PointUtils", () => {
  let points: Point[];

  beforeEach(() => {
    points = [];
  });

  describe("addPoint", () => {
    it("should add point, if point doesn't exist in points array", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      expect(task.addPoint(points, point.name, point.x, point.y)).toBeTruthy();
      expect(points).toEqual([point]);
    });

    it("shouldn't add point, if point with given name already exists", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.addPoint(points, point.name, point.x, point.y)).toBeFalsy();
      expect(points).toEqual([point]);
    });
  });

  describe("getPoint", () => {
    it("should return point if point with given name exists", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.getPoint(points, point.name)).toEqual(point);
    });

    it("should return undefined if point with given name does not exist", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.getPoint(points, "B")).toBeUndefined();
    });
  });

  describe("updatePoint", () => {
    it("should return true if point was updated successfully", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      const updatedPoint: Point = { name: "A", x: 3, y: 6 };
      points = [point];
      expect(task.updatePoint(points, point.name, updatedPoint)).toBeTruthy();
      expect(points).toEqual([updatedPoint]);
    });

    it("should return false if point with given name does not exist", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      const updatedPoint: Point = { name: "A", x: 3, y: 6 };
      points = [point];
      expect(task.updatePoint(points, "B", updatedPoint)).toBeFalsy();
      expect(points).toEqual([point]);
    });
  });

  describe("deletePoint", () => {
    it("should return true if point was deleted successfully", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.deletePoint(points, point.name)).toBeTruthy();
      expect(points).toEqual([]);
    });

    it("should return false if point with given name does not exist", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.deletePoint(points, "B")).toBeFalsy();
      expect(points).toEqual([point]);
    });
  });

  describe("getFarestPoints", () => {
    it("should return undefined if length of points array < 2", () => {
      const point: Point = { name: "A", x: 3, y: 5 };
      points = [point];
      expect(task.getFarestPoints(points)).toBeUndefined();
    });

    it("should return points array if its length = 2", () => {
      const fPoint: Point = { name: "A", x: 3, y: 5 };
      const sPoint: Point = { name: "B", x: 4, y: 5 };
      points = [fPoint, sPoint];
      expect(task.getFarestPoints(points)).toEqual([fPoint, sPoint]);
    });

    it("should return farest points", () => {
      const fPoint: Point = { name: "A", x: 0, y: 0 };
      const sPoint: Point = { name: "B", x: 4, y: 5 };
      const tPoint: Point = { name: "C", x: 9, y: 9 };
      points = [fPoint, sPoint, tPoint];
      expect(task.getFarestPoints(points)).toEqual([fPoint, tPoint]);
    });
  });

  describe("getClosePoints", () => {
    it("should return closest points to given with fixed distance", () => {
      const fPoint: Point = { name: "A", x: 0, y: 0 };
      const sPoint: Point = { name: "B", x: 3, y: 4 };
      const tPoint: Point = { name: "C", x: 9, y: 9 };
      points = [sPoint, tPoint];
      expect(task.getClosePoints(points, fPoint, 5)).toEqual([sPoint]);
    });
  });

  describe("getAxisPoints", () => {
    it("should return x axis points", () => {
      const fPoint: Point = { name: "A", x: 0, y: 0 };
      const sPoint: Point = { name: "B", x: 3, y: 4 };
      const tPoint: Point = { name: "C", x: -9, y: 9 };
      points = [fPoint, sPoint, tPoint];
      expect(task.getAxisPoints(points, "x")).toEqual([[sPoint], [tPoint]]);
    });

    it("should return y axis points", () => {
      const fPoint: Point = { name: "A", x: 0, y: 0 };
      const sPoint: Point = { name: "B", x: 3, y: 4 };
      const tPoint: Point = { name: "C", x: 9, y: -9 };
      points = [fPoint, sPoint, tPoint];
      expect(task.getAxisPoints(points, "y")).toEqual([[sPoint], [tPoint]]);
    });
  });

  describe("getRectPoints", () => {
    it("should return points located inside given rectangle", () => {
      const upLeft: Point = { name: "D1", x: 0, y: 5 };
      const downRight: Point = { name: "D2", x: 5, y: 0 };
      const fPoint: Point = { name: "A", x: 0, y: 0 };
      const sPoint: Point = { name: "B", x: 3, y: 4 };
      const tPoint: Point = { name: "C", x: 9, y: -9 };
      points = [fPoint, sPoint, tPoint];
      expect(task.getRectPoints(points, upLeft, downRight)).toEqual([sPoint]);
    });
  });
});
