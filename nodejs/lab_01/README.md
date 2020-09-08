# Отчет по лабораторной работе #1

## Задание 1

### Условие

Создать хранилище в оперативной памяти для хранения информации о детях. Необходимо хранить информацию о ребенке: фамилия и возраст. Необходимо обеспечить уникальность фамилий детей.

Реализовать функции:

* CRUD для детей в хранилище
* Получение среднего возраста детей
* Получение информации о самом старшем ребенке
* Получение информации о детях, возраст которых входит в заданный отрезок
* Получение информации о детях, фамилия которых начинается с заданной буквы
* Получение информации о детях, фамилия которых длиннее заданного количества символов
* Получение информации о детях, фамилия которых начинается с гласной буквы

### Код программы

Язык: **Typescript 3.9.7**

**interfaces.ts**

```typescript
export interface Kid {
  surname: string;
  age: number;
}
```

**task.ts**

```typescript
import { Kid } from "./interfaces";

const vowels = "aeiouy";

export const addKid = (kids: Kid[], surname: string, age: number): boolean => {
  const isExist = kids.filter((kid) => kid.surname === surname).length > 0;

  if (isExist) {
    return false;
  }

  const kid: Kid = {
    surname,
    age,
  };

  kids.push(kid);

  return true;
};

export const getKid = (kids: Kid[], surname: string): Kid | undefined => {
  const kid = kids.find((kid) => kid.surname === surname);

  return kid;
};

export const updateKid = (kids: Kid[], surname: string, data: Kid): boolean => {
  const kid = getKid(kids, surname);

  if (!kid) {
    return false;
  }

  kid.surname = data.surname;
  kid.age = data.age;

  return true;
};

export const deleteKid = (kids: Kid[], surname: string): boolean => {
  const kid = getKid(kids, surname);

  if (kid) {
    kids.splice(kids.indexOf(kid), 1);

    return true;
  }

  return false;
};

export const getAverageAge = (kids: Kid[]): number => {
  const age = kids
    .map((kid) => kid.age)
    .reduce((total, age, index, array) => {
      total += age;
      if (index === array.length - 1) {
        return total / array.length;
      } else {
        return total;
      }
    });

  return age;
};

export const getEldestKid = (kids: Kid[]): Kid | undefined => {
  if (!kids) {
    return undefined;
  }

  const eldestKid = kids.reduce((eldest, kid) => (kid.age > eldest.age ? kid : eldest), kids[0]);

  return eldestKid;
};

export const getKidsByAge = (kids: Kid[], startAge: number, endAge: number): Kid[] => {
  const ages = Array.from({ length: endAge - startAge + 1 }, (_, i) => i + startAge);
  const agedKids = kids.filter((kid) => ages.includes(kid.age));

  return agedKids;
};

export const getKidsBySurnameLetter = (kids: Kid[], letter: string): Kid[] => {
  const letterKids = kids.filter((kid) =>
    kid.surname.toLowerCase().startsWith(letter.toLowerCase())
  );

  return letterKids;
};

export const getKidsBySurnameLength = (kids: Kid[], len: number): Kid[] => {
  const lenKids = kids.filter((kid) => kid.surname.length > len);

  return lenKids;
};

export const getKidsByFirstVowelSurname = (kids: Kid[]): Kid[] => {
  const vowelKids = kids.filter((kid) => vowels.includes(kid.surname[0].toLowerCase()));

  return vowelKids;
};
```

**task.spec.ts**

```typescript
import * as task from "./task";

import { Kid } from "./interfaces";

describe("KidUtils", () => {
  let kids: Kid[];

  beforeEach(() => {
    kids = [];
  });

  describe("addKid", () => {
    it("should add kid, if kid doesn't exist in kids array", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      expect(task.addKid(kids, kid.surname, kid.age)).toBeTruthy();
      expect(kids).toEqual([kid]);
    });

    it("shouldn't add kid, if kid with given surname already exists", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      kids = [kid];
      expect(task.addKid(kids, kid.surname, kid.age + 3)).toBeFalsy();
      expect(kids).toEqual([kid]);
    });
  });

  describe("getKid", () => {
    it("should return kid if kid with given surname exists", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      kids = [kid];
      expect(task.getKid(kids, kid.surname)).toEqual(kid);
    });

    it("should return undefined if kid with given surname does not exist", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      kids = [kid];
      expect(task.getKid(kids, "Bogachenco")).toBeUndefined();
    });
  });

  describe("updateKid", () => {
    it("should return true if kid was updated successfully", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      const updatedKid: Kid = { surname: "Kononenko", age: 21 };
      kids = [kid];
      expect(task.updateKid(kids, kid.surname, updatedKid)).toBeTruthy();
      expect(kids).toEqual([updatedKid]);
    });

    it("should return false if kid with given surname does not exist", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      const updatedKid: Kid = { surname: "Kononenko", age: 21 };
      kids = [kid];
      expect(task.updateKid(kids, "Bogachenco", updatedKid)).toBeFalsy();
      expect(kids).toEqual([kid]);
    });
  });

  describe("deleteKid", () => {
    it("should return true if kid was deleted successfully", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      kids = [kid];
      expect(task.deleteKid(kids, kid.surname)).toBeTruthy();
      expect(kids).toEqual([]);
    });

    it("should return false if kid with given surname does not exist", () => {
      const kid: Kid = { surname: "Kononenko", age: 20 };
      kids = [kid];
      expect(task.deleteKid(kids, "Bogachenco")).toBeFalsy();
      expect(kids).toEqual([kid]);
    });
  });

  describe("getAverageAge", () => {
    it("should return average age", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getAverageAge(kids)).toEqual(20);
    });
  });

  describe("getEldestKid", () => {
    it("should return undefined if array is empty", () => {
      expect(task.getEldestKid(kids)).toBeUndefined();
    });

    it("should return the eldest kid", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getEldestKid(kids)).toEqual(sKid);
    });
  });

  describe("getKidsByAge", () => {
    it("should return kids with age in given range", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getKidsByAge(kids, 18, 20)).toEqual([fKid, tKid]);
    });
  });

  describe("getKidsBySurnameLetter", () => {
    it("should return kids by first surname letter", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getKidsBySurnameLetter(kids, "k")).toEqual([fKid]);
    });
  });

  describe("getKidsBySurnameLength", () => {
    it("should return kids by surname length", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getKidsBySurnameLength(kids, 8)).toEqual([fKid, sKid]);
    });
  });

  describe("getKidsByFirstVowel", () => {
    it("should return kids by first surname vowel character", () => {
      const fKid: Kid = { surname: "Kononenko", age: 20 };
      const sKid: Kid = { surname: "Bogachenco", age: 21 };
      const tKid: Kid = { surname: "Untilova", age: 19 };
      kids = [fKid, sKid, tKid];
      expect(task.getKidsByFirstVowelSurname(kids)).toEqual([tKid]);
    });
  });
});
```

### Результаты тестирования

```
npm run test:cov -- src/exercise_01

> lab_01@1.0.0 test:cov /home/hackfeed/bmstu/labs/comparch-5th-sem-labs/nodejs/lab_01
> jest --coverage "src/exercise_01"

 PASS  src/exercise_01/task.spec.ts
  KidUtils
    addKid
      ✓ should add kid, if kid doesn't exist in kids array (3 ms)
      ✓ shouldn't add kid, if kid with given surname already exists (1 ms)
    getKid
      ✓ should return kid if kid with given surname exists
      ✓ should return undefined if kid with given surname does not exist (1 ms)
    updateKid
      ✓ should return true if kid was updated successfully
      ✓ should return false if kid with given surname does not exist (1 ms)
    deleteKid
      ✓ should return true if kid was deleted successfully
      ✓ should return false if kid with given surname does not exist (1 ms)
    getAverageAge
      ✓ should return average age
    getEldestKid
      ✓ should return undefined if array is empty (1 ms)
      ✓ should return the eldest kid
    getKidsByAge
      ✓ should return kids with age in given range
    getKidsBySurnameLetter
      ✓ should return kids by first surname letter (1 ms)
    getKidsBySurnameLength
      ✓ should return kids by surname length
    getKidsByFirstVowel
      ✓ should return kids by first surname vowel character

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   98.28 |    91.67 |     100 |   98.04 |                   
 task.ts  |   98.28 |    91.67 |     100 |   98.04 | 70                
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        2.985 s
Ran all test suites matching /src\/exercise_01/i.
```

## Задание 2

### Условие

Создать хранилище в оперативной памяти для хранения информации о студентах. Необходимо хранить информацию о студенте: название группы, номер студенческого билета, оценки по программированию. Необходимо обеспечить уникальность номеров студенческих билетов.

Реализовать функции:

* CRUD для студентов в хранилище
* Получение средней оценки заданного студента
* Получение информации о студентах в заданной группе
* Получение студента, у которого наибольшее количество оценок в заданной группе
* Получение студента, у которого нет оценок

### Код программы

Язык: **Typescript 3.9.7**

**interfaces.ts**

```typescript
export interface Student {
  group: string;
  card: string;
  marks: number[];
}
```

**task.ts**

```typescript
import { Student } from "./interfaces";

export const addStudent = (
  students: Student[],
  group: string,
  card: string,
  marks: number[]
): boolean => {
  const isExist = students.filter((student) => student.card === card).length > 0;

  if (isExist) {
    return false;
  }

  const student: Student = {
    group,
    card,
    marks,
  };

  students.push(student);

  return true;
};

export const getStudent = (students: Student[], card: string): Student | undefined => {
  const student = students.find((student) => student.card === card);

  return student;
};

export const updateStudent = (students: Student[], card: string, data: Student): boolean => {
  const student = getStudent(students, card);

  if (!student) {
    return false;
  }

  student.group = data.group;
  student.card = data.card;
  student.marks = data.marks;

  return true;
};

export const deleteStudent = (students: Student[], card: string): boolean => {
  const student = getStudent(students, card);

  if (student) {
    students.splice(students.indexOf(student), 1);

    return true;
  }

  return false;
};

export const getAverageMark = (student: Student): number => {
  const mark = student.marks.reduce((total, mark, index, array) => {
    total += mark;
    if (index === array.length - 1) {
      return total / array.length;
    } else {
      return total;
    }
  });

  return mark;
};

export const getStudentsByGroup = (students: Student[], group: string): Student[] => {
  const groupStudents = students.filter((student) => student.group === group);

  return groupStudents;
};

export const getMarkestStudent = (students: Student[], group: string): Student | undefined => {
  const foundGroup = getStudentsByGroup(students, group);
  if (!foundGroup) {
    return undefined;
  }

  const markestStudent = foundGroup.reduce(
    (markest, student) => (student.marks.length > markest.marks.length ? student : markest),
    foundGroup[0]
  );

  return markestStudent;
};

export const getMarklessStudents = (students: Student[]): Student[] => {
  const marklessStudents = students.filter((student) => !student.marks.length);

  return marklessStudents;
};
```

**task.spec.ts**

```typescript
import * as task from "./task";

import { Student } from "./interfaces";

describe("StudentUtils", () => {
  let students: Student[];

  beforeEach(() => {
    students = [];
  });

  describe("addStudent", () => {
    it("should add student, if student doesn't exist in students array", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      expect(task.addStudent(students, student.group, student.card, student.marks)).toBeTruthy();
      expect(students).toEqual([student]);
    });

    it("shouldn't add student, if student with given card already exists", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.addStudent(students, student.group, student.card, student.marks)).toBeFalsy();
      expect(students).toEqual([student]);
    });
  });

  describe("getStudent", () => {
    it("should return student if student with given card exists", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.getStudent(students, student.card)).toEqual(student);
    });

    it("should return undefined if student with given card does not exist", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.getStudent(students, "18U952")).toBeUndefined();
    });
  });

  describe("updateStudent", () => {
    it("should return true if student was updated successfully", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      const updatedStudent: Student = { group: "ICS7-63B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.updateStudent(students, student.card, updatedStudent)).toBeTruthy();
      expect(students).toEqual([updatedStudent]);
    });

    it("should return false if student with given card does not exist", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      const updatedStudent: Student = { group: "ICS7-63B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.updateStudent(students, "18U952", updatedStudent)).toBeFalsy();
      expect(students).toEqual([student]);
    });
  });

  describe("deleteStudent", () => {
    it("should return true if student was deleted successfully", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.deleteStudent(students, student.card)).toBeTruthy();
      expect(students).toEqual([]);
    });

    it("should return false if student with given card does not exist", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [5, 5, 5] };
      students = [student];
      expect(task.deleteStudent(students, "18U952")).toBeFalsy();
      expect(students).toEqual([student]);
    });
  });

  describe("getAverageMark", () => {
    it("should return average mark", () => {
      const student: Student = { group: "ICS7-53B", card: "18U889", marks: [3, 5, 1] };
      expect(task.getAverageMark(student)).toEqual(3);
    });
  });

  describe("getStudentsByGroup", () => {
    it("should return students with given group", () => {
      const fStudent: Student = { group: "ICS7-53B", card: "18U889", marks: [3, 5, 1] };
      const sStudent: Student = { group: "ICS7-56B", card: "18U952", marks: [2, 2, 2] };
      const tStudent: Student = { group: "ICS7-56B", card: "18U969", marks: [3, 3, 3] };
      students = [fStudent, sStudent, tStudent];
      expect(task.getStudentsByGroup(students, "ICS7-56B")).toEqual([sStudent, tStudent]);
    });
  });

  describe("getMarkestStudent", () => {
    it("should return undefined if array is empty", () => {
      const fStudent: Student = { group: "ICS7-53B", card: "18U889", marks: [3, 5, 1] };
      const sStudent: Student = { group: "ICS7-56B", card: "18U952", marks: [2, 2, 2] };
      const tStudent: Student = { group: "ICS7-56B", card: "18U969", marks: [3, 3, 3] };
      students = [fStudent, sStudent, tStudent];
      expect(task.getMarkestStudent(students, "ICS7-54B")).toBeUndefined();
    });

    it("should return the eldest student", () => {
      const fStudent: Student = { group: "ICS7-53B", card: "18U889", marks: [3, 5, 1] };
      const sStudent: Student = { group: "ICS7-56B", card: "18U952", marks: [2, 2, 2] };
      const tStudent: Student = { group: "ICS7-56B", card: "18U969", marks: [3, 3, 3, 3] };
      students = [fStudent, sStudent, tStudent];
      expect(task.getMarkestStudent(students, "ICS7-56B")).toEqual(tStudent);
    });
  });

  describe("getMarklessStudents", () => {
    it("should return students without group", () => {
      const fStudent: Student = { group: "ICS7-53B", card: "18U889", marks: [] };
      const sStudent: Student = { group: "ICS7-56B", card: "18U952", marks: [2, 2, 2] };
      const tStudent: Student = { group: "ICS7-56B", card: "18U969", marks: [] };
      students = [fStudent, sStudent, tStudent];
      expect(task.getMarklessStudents(students)).toEqual([fStudent, tStudent]);
    });
  });
});
```

### Результаты тестирования

```
npm run test:cov -- src/exercise_02

> lab_01@1.0.0 test:cov /home/hackfeed/bmstu/labs/comparch-5th-sem-labs/nodejs/lab_01
> jest --coverage "src/exercise_02"

 PASS  src/exercise_02/task.spec.ts
  StudentUtils
    addStudent
      ✓ should add student, if student doesn't exist in students array (3 ms)
      ✓ shouldn't add student, if student with given card already exists
    getStudent
      ✓ should return student if student with given card exists (1 ms)
      ✓ should return undefined if student with given card does not exist
    updateStudent
      ✓ should return true if student was updated successfully (1 ms)
      ✓ should return false if student with given card does not exist
    deleteStudent
      ✓ should return true if student was deleted successfully
      ✓ should return false if student with given card does not exist (1 ms)
    getAverageMark
      ✓ should return average mark
    getStudentsByGroup
      ✓ should return students with given group
    getMarkestStudent
      ✓ should return undefined if array is empty (1 ms)
      ✓ should return the eldest student
    getMarklessStudents
      ✓ should return students without group

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files | 97.92   | 91.67    | 100     | 97.73   |
 task.ts  | 97.92   | 91.67    | 100     | 97.73   | 80                
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        2.71 s
Ran all test suites matching /src\/exercise_02/i.
```

## Задание 3

### Условие

Создать хранилище в оперативной памяти для хранения точек. Неоходимо хранить информацию о точке: имя точки, позиция X и позиция Y. Необходимо обеспечить уникальность имен точек.

Реализовать функции:

* CRUD для точек в хранилище
* Получение двух точек, между которыми наибольшее расстояние
* Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
* Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
* Получение точек, входящих внутрь заданной прямоугольной зоны

### Код программы

Язык: **Typescript 3.9.7**

**interfaces.ts**

```typescript
export interface Point {
  name: string;
  x: number;
  y: number;
}
```

**task.ts**

```typescript
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
```

**task.spec.ts**

```typescript
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
```

**utils.ts**

```typescript
import { Point } from "./interfaces";

export const getDistance = (fP: Point, sP: Point) => {
  return Math.sqrt(Math.pow(fP.x - sP.x, 2) + Math.pow(fP.y - sP.y, 2));
};
```

**utils.spec.ts**

```typescript
import { Point } from "./interfaces";
import { getDistance } from "./utils";

describe("getDistance", () => {
  it("should return distance between points", () => {
    const fP: Point = { name: "A", x: 0, y: 0 };
    const sP: Point = { name: "B", x: 3, y: 4 };
    expect(getDistance(fP, sP)).toEqual(5);
  });
});
```

### Результаты тестирования

```
npm run test:cov -- src/exercise_03

> lab_01@1.0.0 test:cov /home/hackfeed/bmstu/labs/comparch-5th-sem-labs/nodejs/lab_01
> jest --coverage "src/exercise_03"

 PASS  src/exercise_03/utils.spec.ts
 PASS  src/exercise_03/task.spec.ts
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 task.ts  |     100 |      100 |     100 |     100 |                   
 utils.ts |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        3.413 s
Ran all test suites matching /src\/exercise_03/i.
```