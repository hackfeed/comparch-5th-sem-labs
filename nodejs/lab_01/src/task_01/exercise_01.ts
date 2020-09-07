import { Kid, KidUpdate } from "./interfaces";

const kids: Kid[] = [];

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

export const updateKid = (surname: string, data: KidUpdate) => {
  const kid = getKid(surname);

  if (!kid) {
    return false;
  }

  for (const key in Object.keys(data)) {
    kid.get(key) = data[key];
  }
};
