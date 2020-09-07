import { Kid } from "./interfaces";

let kids: Kid[] = [];
const vowels = "aeiouy";

export const addKid = (surname: string, age: number): boolean => {
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

export const getKid = (surname: string): Kid | undefined => {
  const kid = kids.find((kid) => kid.surname === surname);

  return kid;
};

export const updateKid = (surname: string, data: Kid): boolean => {
  const kid = getKid(surname);

  if (!kid) {
    return false;
  }

  kid.surname = data.surname;
  kid.age = data.age;

  return true;
};

export const deleteKid = (surname: string): boolean => {
  const newKids = kids.filter((kid) => kid.surname === surname);

  if (newKids === kids) {
    return false;
  }

  kids = newKids;

  return true;
};

export const getAverageAge = (): number => {
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

export const getEldestKid = (): Kid => {
  const eldestKid = kids.reduce((eldest, kid) => (kid.age > eldest.age ? kid : eldest), kids[0]);

  return eldestKid;
};

export const getKidsByAge = (ages: number[]): Kid[] => {
  const agedKids = kids.filter((kid) => ages.includes(kid.age));

  return agedKids;
};

export const getKidsBySurnameLetter = (letter: string): Kid[] => {
  const letterKids = kids.filter((kid) =>
    kid.surname.toLowerCase().startsWith(letter.toLowerCase())
  );

  return letterKids;
};

export const getKidsBySurnameLength = (len: number): Kid[] => {
  const lenKids = kids.filter((kid) => kid.surname.length > len);

  return lenKids;
};

export const getKidsByFirstVowelSurname = (): Kid[] => {
  const vowelKids = kids.filter((kid) => vowels.includes(kid.surname[0].toLowerCase()));

  return vowelKids;
};
