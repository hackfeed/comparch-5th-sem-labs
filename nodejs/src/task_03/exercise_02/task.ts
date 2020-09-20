import { existsSync, readFileSync } from "fs";

import { Filter } from "./types";
import { question } from "readline-sync";

const vowels = "aeiouy";

export const defaultFilter = (_: string, value: string): string | undefined => value;

export const vowelFilter = (_: string, value: string): string | undefined => {
  if (Array.isArray(value)) {
    return value;
  }

  for (let i = 0; i < value.length; ++i) {
    if (!vowels.includes(value[i])) {
      return undefined;
    }
  }

  return value;
};

export const getJSONFromFile = (fileName: string, filter: Filter = defaultFilter): object => {
  const fileData = readFileSync(fileName, "utf-8");
  const JSONData = JSON.parse(fileData, filter);

  return JSONData;
};

export const solveTask = (): void => {
  const fileName = question("Input filename: ");

  if (!existsSync(fileName)) {
    console.error("Given file doesn't exist. Aborting.");
    return;
  }

  const JSONData = (getJSONFromFile(fileName, vowelFilter) as Array<string>).filter((el) => !!el);

  console.log(`Vowels only strings: ${JSONData}`);
};
