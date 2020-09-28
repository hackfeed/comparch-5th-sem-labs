import { existsSync, readFileSync } from "fs";

import { question } from "readline-sync";

export const getNestedDepth = (obj: any): number => {
  let depth = 0;

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      depth = getNestedDepth(obj[key]) + 1;
    }
  });

  return depth;
};

export const getMaxNestedDepth = (obj: any): { depth: number; key: string } => {
  const resObject = { depth: 0, key: "" };

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      const depth = getNestedDepth(obj[key]) + 1;
      if (depth > resObject.depth) {
        resObject.depth = depth;
        resObject.key = key;
      }
    }
  });

  return resObject;
};

export const solveTask = (): void => {
  const fileName = question("Input filename: ");

  if (!existsSync(fileName)) {
    console.error("Given file doesn't exist. Aborting.");
    return;
  }

  const JSONData = JSON.parse(readFileSync(fileName).toString());
  const resObject = getMaxNestedDepth(JSONData);

  console.log(
    `Max nested depth: ${resObject.depth}\nBranch: ${resObject.key}: ${JSON.stringify(JSONData[resObject.key])}`
  );
};
