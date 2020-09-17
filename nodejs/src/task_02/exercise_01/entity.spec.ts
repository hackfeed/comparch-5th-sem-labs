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

  describe("getOutputData", () => {
    it("should return point data", () => {
      point = new Point(5, 6);
      expect(point.getOutputData()).toEqual(`X: ${point.x}, Y: ${point.y}`);
    });
  });

  describe("output", () => {
    it("should output point data to the console", () => {
      point.output();
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
    it("should return section data", () => {
      const fPoint = new Point(0, 0);
      const sPoint = new Point(3, 4);
      section = new Section(fPoint, sPoint);
      expect(section.getOutputData()).toEqual(
        `Starting point: ${fPoint.getOutputData()}, Ending point: ${sPoint.getOutputData()}`
      );
    });
  });

  describe("output", () => {
    it("should output section data to the console", () => {
      const fPoint = new Point(0, 0);
      const sPoint = new Point(3, 4);
      section = new Section(fPoint, sPoint);
      section.output();
    });
  });

  describe("getLength", () => {
    it("should return section's length", () => {
      section = new Section(new Point(0, 0), new Point(3, 4));
      expect(section.getLength()).toEqual(5);
    });
  });
});
