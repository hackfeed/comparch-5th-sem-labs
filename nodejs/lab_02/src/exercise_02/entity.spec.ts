import { Triangle } from "./entity";

describe("Triangle", () => {
  let triangle: Triangle;

  beforeEach(() => {
    triangle = new Triangle(3, 4, 5);
  });

  describe("constructor", () => {
    it("should correctly assign values", () => {
      triangle = new Triangle(3, 4, 5);
      expect(triangle.fSide).toEqual(3);
      expect(triangle.sSide).toEqual(4);
      expect(triangle.tSide).toEqual(5);
    });
  });

  describe("isExist", () => {
    it("should return true if triangle with given sides exists", () => {
      expect(Triangle.isExist(3, 4, 5)).toBeTruthy();
    });

    it("should return false if triangle with given sides doesn't exist", () => {
      expect(Triangle.isExist(1, 4, 5)).toBeFalsy();
    });
  });

  describe("getPerimeter", () => {
    it("should return triangle's perimeter", () => {
      triangle = new Triangle(3, 4, 5);
      expect(triangle.getPerimeter()).toEqual(12);
    });
  });

  describe("getArea", () => {
    it("should return triangle's area", () => {
      triangle = new Triangle(3, 4, 5);
      expect(triangle.getArea()).toEqual(6);
    });
  });

  describe("isRightAngled", () => {
    it("should return true if triangle is right angled", () => {
      triangle = new Triangle(3, 4, 5);
      expect(triangle.isRightAngled()).toBeTruthy();
    });

    it("should return false if triangle is not right angled", () => {
      triangle = new Triangle(3, 3, 3);
      expect(triangle.isRightAngled()).toBeFalsy();
    });
  });
});
