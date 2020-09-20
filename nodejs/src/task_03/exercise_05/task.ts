import { existsSync, readFileSync, writeFileSync } from "fs";
import { question, questionInt } from "readline-sync";

export const readFileNames = (count: number): string[] => {
  const fileNames = [];

  for (let i = 0; i < count; ++i) {
    const fileName = question(`Input filename #${i + 1}: `);
    if (!existsSync(fileName)) {
      console.error("Given file doesn't exist.");
    } else {
      fileNames.push(fileName);
    }
  }

  return fileNames;
};

export const mergeFiles = (fileNames: string[], outFileName: string): void => {
  let outFileContent = "";

  for (const fileName of fileNames) {
    outFileContent += `${readFileSync(fileName).toString()}\n`;
  }

  writeFileSync(outFileName, outFileContent);
};

export const solveTask = (): void => {
  const count = questionInt("Input amount of files: ");

  if (count < 0) {
    console.error("Given number is negative. Aborting.");
    return;
  }

  const fileNames = readFileNames(count);
  const outFileName = question("Input out file name: ");
  mergeFiles(fileNames, outFileName);
  console.log(`Succesfully written into ${outFileName}`);
};
