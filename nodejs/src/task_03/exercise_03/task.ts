import { existsSync, readFileSync, readdirSync } from "fs";

import { extname } from "path";
import { question } from "readline-sync";

export const getFilesByExt = (dirPath: string, extName: string): string[] => {
  const dirFileNames = readdirSync(dirPath);
  const extFileNames = [];

  for (const fileName of dirFileNames) {
    if (extname(fileName) === extName) {
      extFileNames.push(`${dirPath}/${fileName}`);
    }
  }

  return extFileNames;
};

export const getFileContent = (fileName: string): string => {
  const file = readFileSync(fileName).toString();

  return file;
};

export const solveTask = (): void => {
  const path = question("Input absolute path: ");

  if (!existsSync(path)) {
    console.error("Given path doesn't exist. Aborting.");
    return;
  }

  const ext = question("Input extension (with the dot in the beginning): ");

  const extFileNames = getFilesByExt(path, ext);

  for (const fileName of extFileNames) {
    console.log(`File ${fileName}: \n${getFileContent(fileName)}`);
  }
};
