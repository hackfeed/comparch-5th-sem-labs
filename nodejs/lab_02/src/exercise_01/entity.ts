export class Point {
  public constructor(public readonly x: number, public readonly y: number) {}

  public output = (): string => {
    const data = `X: ${this.x}, Y: ${this.y}`;
    console.log(data);

    return data;
  };
}

export class Section {
  public constructor(public readonly fPoint: Point, public readonly sPoint: Point) {}

  public output = (): string => {
    const data = `Starting point: ${this.fPoint.output()}, Ending point: ${this.sPoint.output()}`;
    console.log(data);

    return data;
  };

  public getLength = (): number => {
    return Math.sqrt(
      Math.pow(this.fPoint.x - this.sPoint.x, 2) + Math.pow(this.fPoint.y - this.sPoint.y, 2)
    );
  };
}
