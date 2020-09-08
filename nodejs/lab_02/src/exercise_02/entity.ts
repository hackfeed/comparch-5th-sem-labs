export class Triangle {
  public constructor(
    public readonly fSide: number,
    public readonly sSide: number,
    public readonly tSide: number
  ) {}

  public static isExist = (fSide: number, sSide: number, tSide: number): boolean => {
    if (fSide + sSide > tSide && fSide + tSide > sSide && sSide + tSide > fSide) {
      return true;
    }

    return false;
  };

  public getPerimeter = (): number => {
    const perimeter = this.fSide + this.sSide + this.tSide;

    return perimeter;
  };

  public getArea = (): number => {
    const hP = this.getPerimeter() / 2;
    const area = Math.sqrt(hP * (hP - this.fSide) * (hP - this.sSide) * (hP - this.tSide));

    return area;
  };

  public isRightAngled = (): boolean => {
    const sides = [this.fSide, this.sSide, this.tSide];
    const maxSide = Math.max(...sides);
    sides.splice(sides.indexOf(maxSide), 1);
    const [lfSide, lsSide] = sides;

    if (
      Math.abs(Math.pow(lfSide, 2) + Math.pow(lsSide, 2) - Math.pow(maxSide, 2)) < Number.EPSILON
    ) {
      return true;
    }

    return false;
  };
}
