import { Point, Section } from "./entity";

describe("Point", () => {
  let point: Point;

  beforeEach(() => {
    point = new Point(3, 4);
  });

  describe("constructor", () => {
    it("should correctly assign values", () => {
      point = new Point(5, 6);
      expect(point.x).toEqual(5);
      expect(point.y).toEqual(6);
    });
  });

  describe("output", () => {
    it("should output point data to the console", () => {
      point = new Point(5, 6);
      expect(point.output()).toEqual(`X: ${point.x}, Y: ${point.y}`);
    });
  });
});

describe("Section", () => {
  let section: Section;

  beforeEach(() => {
    section = new Section(new Point(0, 0), new Point(3, 4));
  });

  describe("constructor", () => {
    it("should correctly assign values", () => {
      const fPoint = new Point(0, 0);
      const sPoint = new Point(3, 4);
      section = new Section(fPoint, sPoint);
      expect(section.fPoint).toEqual(fPoint);
      expect(section.sPoint).toEqual(sPoint);
    });
  });

  describe("output", () => {
    it("should output point data to the console", () => {
      const fPoint = new Point(0, 0);
      const sPoint = new Point(3, 4);
      section = new Section(fPoint, sPoint);
      expect(section.output()).toEqual(
        `Starting point: ${fPoint.output()}, Ending point: ${sPoint.output()}`
      );
    });
  });

  describe("getLength", () => {
    it("should return section's length", () => {
      section = new Section(new Point(0, 0), new Point(3, 4));
      expect(section.getLength()).toEqual(5);
    });
  });
});
