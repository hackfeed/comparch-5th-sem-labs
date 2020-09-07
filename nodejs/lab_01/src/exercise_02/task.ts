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
