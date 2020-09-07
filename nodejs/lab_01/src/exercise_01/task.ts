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
