import { question, questionInt } from "readline-sync";

export const readStrings = (count: number): string[] => {
  const strings = [];

  for (let i = 0; i < count; ++i) {
    const str = question(`Input string #${i + 1}: `);
    strings.push(str);
  }

  return strings;
};

export const formEvenLenArr = (strings: string[]): string[] => {
  const evenLenStrings = strings.filter((str) => !(str.length % 2));

  return evenLenStrings;
};

export const solveTask = (): void => {
  const count = questionInt("Input amount of strings: ");

  if (count < 0) {
    console.error("Given number is negative. Aborting.");
    return;
  }

  const evenLenStrings = formEvenLenArr(readStrings(count));
  const evenLenStringsJSON = JSON.stringify(evenLenStrings);

  console.log(`Formed JSON string: ${evenLenStringsJSON}`);
};
