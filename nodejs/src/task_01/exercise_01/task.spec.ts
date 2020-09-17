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
