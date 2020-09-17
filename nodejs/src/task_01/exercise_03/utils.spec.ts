import { Point } from "./interfaces";
import { getDistance } from "./utils";

describe("getDistance", () => {
  it("should return distance between points", () => {
    const fP: Point = { name: "A", x: 0, y: 0 };
    const sP: Point = { name: "B", x: 3, y: 4 };
    expect(getDistance(fP, sP)).toEqual(5);
  });
});
