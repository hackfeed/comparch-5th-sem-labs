import { existsSync, lstatSync, readdirSync } from "fs";

import { extname } from "path";
import { question } from "readline-sync";

const extFileNames: string[] = [];

export const getFilesByExt = (dirPath: string, extName: string): void => {
  const dirFileNames = readdirSync(dirPath);

  for (const fileName of dirFileNames) {
    const stats = lstatSync(`${dirPath}/${fileName}`);
    if (stats.isDirectory()) {
      getFilesByExt(`${dirPath}/${fileName}`, extName);
    }
    if (stats.isFile() && extname(fileName) === extName) {
      extFileNames.push(`${dirPath}/${fileName}`);
    }
  }
};

export const solveTask = (): void => {
  const path = question("Input absolute path: ");

  if (!existsSync(path)) {
    console.error("Given path doesn't exist. Aborting.");
    return;
  }

  const ext = question("Input extension (with the dot in the beginning): ");

  getFilesByExt(path, ext);

  console.log(
    `Files with ${ext} extension in ${path} and all subdirectories: \n${extFileNames.map(
      (path) => `${path}\n`
    )}`
  );
};
