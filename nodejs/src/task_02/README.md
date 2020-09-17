# Отчет по разделу #2

## Задание 1

### Условие

Создать класс _Точка_. Добавить классу точка _Точка_ метод инициализации полей и метод вывода полей на экран

Создать класс _Отрезок_. У класса _Отрезок_ должны быть поля, являющиеся экземплярами класса _Точка_. Добавить классу _Отрезок_ метод инициализации полей, метод вывода информации о полях на экран, а так же метод получения длины отрезка.

### Код программы

Язык: **Typescript 3.9.7**

**entity.ts**

```typescript
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
```

**entity.spec.ts**

```typescript
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
```

### Результаты тестирования

```
npm run test:cov -- src/exercise_01

> lab_02@1.0.0 test:cov /home/hackfeed/bmstu/labs/comparch-5th-sem-labs/nodejs/lab_02
> jest --coverage "src/exercise_01"

 PASS  src/exercise_01/entity.spec.ts
  Point
    constructor
      ✓ should correctly assign values (3 ms)
    output
      ✓ should output point data to the console (16 ms)
  Section
    constructor
      ✓ should correctly assign values (1 ms)
    output
      ✓ should output point data to the console (5 ms)
    getLength
      ✓ should return section's length

  console.log
    X: 5, Y: 6

      at Point.output (src/exercise_01/entity.ts:6:13)

  console.log
    X: 0, Y: 0

      at Point.output (src/exercise_01/entity.ts:6:13)

  console.log
    X: 3, Y: 4

      at Point.output (src/exercise_01/entity.ts:6:13)

  console.log
    Starting point: X: 0, Y: 0, Ending point: X: 3, Y: 4

      at Section.output (src/exercise_01/entity.ts:17:13)

  console.log
    X: 0, Y: 0

      at Point.output (src/exercise_01/entity.ts:6:13)

  console.log
    X: 3, Y: 4

      at Point.output (src/exercise_01/entity.ts:6:13)

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |
 entity.ts |     100 |      100 |     100 |     100 |
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.036 s
Ran all test suites matching /src\/exercise_01/i.
```

## Задание 2

### Условие

Создать класс _Треугольник_. Класс _Треугольник_ должен иметь поля, хранящие длины сторон треугольника. Реализовать следующие методы:

- Метод инициализации полей
- Метод проверки возможности существования треугольника с такими сторонами
- Метод получения периметра треугольника
- Метод получения площади треугольника
- Метод для проверки факта: является ли треугольник прямоугольным

### Код программы

Язык: **Typescript 3.9.7**

**entity.ts**

```typescript
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
```

**entity.spec.ts**

```typescript
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
```

### Результаты тестирования

```
npm run test:cov -- src/exercise_02

> lab_02@1.0.0 test:cov /home/hackfeed/bmstu/labs/comparch-5th-sem-labs/nodejs/lab_02
> jest --coverage "src/exercise_02"

 PASS  src/exercise_02/entity.spec.ts
  Triangle
    constructor
      ✓ should correctly assign values (2 ms)
    isExist
      ✓ should return true if triangle with given sides exists
      ✓ should return false if triangle with given sides doesn't exist (1 ms)
    getPerimeter
      ✓ should return triangle's perimeter
    getArea
      ✓ should return triangle's area
    isRightAngled
      ✓ should return true if triangle is right angled (1 ms)
      ✓ should return false if triangle is not right angled

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |
 entity.ts |     100 |      100 |     100 |     100 |
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.98 s, estimated 3 s
Ran all test suites matching /src\/exercise_02/i.
```

## Задание 3

### Условие

Реализовать программу, в которой происходят следующие действия:

- Происходит вывод целых чисел от 1 до 10 с задержками в 2 секунды
- После этого происходит вывод от 11 до 20 с задержками в 1 секунду
- Потом опять происходит вывод чисел от 1 до 10 с задержками в 2 секунды
- После этого происходит вывод от 11 до 20 с задержками в 1 секунду

Это должно происходить циклически.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
let n = 0;
let timerExecution = 2000;

const timer = () => {
  n++;
  console.log(n);

  if (n === 10) {
    timerExecution = 1000;
  }
  if (n === 20) {
    timerExecution = 2000;
    n = 0;
  }

  setTimeout(timer, timerExecution);
};

timer();
```
