export class Point {
  public constructor(public readonly x: number, public readonly y: number) {}

  public getOutputData = (): string => {
    const data = `X: ${this.x}, Y: ${this.y}`;

    return data;
  };

  public output = () => {
    console.log(this.getOutputData());
  };
}

export class Section {
  public constructor(public readonly fPoint: Point, public readonly sPoint: Point) {}

  public getOutputData = (): string => {
    const data = `Starting point: ${this.fPoint.getOutputData()}, Ending point: ${this.sPoint.getOutputData()}`;

    return data;
  };

  public output = () => {
    console.log(this.getOutputData());
  };

  public getLength = (): number => {
    return Math.sqrt(
      Math.pow(this.fPoint.x - this.sPoint.x, 2) + Math.pow(this.fPoint.y - this.sPoint.y, 2)
    );
  };
}
