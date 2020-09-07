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
