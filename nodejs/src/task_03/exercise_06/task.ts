import { isDeepStrictEqual } from "util";

export const getJSONStrMaxNestedDepth = (
  globalObj: object,
  nestedObj: any,
  depth: number
): number => {
  if (!nestedObj) {
    nestedObj = globalObj;
  }
  nestedObj.prop = {};

  const objBackThrough = JSON.parse(JSON.stringify(globalObj));

  console.log(globalObj, depth);

  if (!isDeepStrictEqual(objBackThrough, globalObj)) {
    return depth;
  }

  return getJSONStrMaxNestedDepth(globalObj, nestedObj.prop, depth + 1);
};

export const solveTask = (): void => {
  const maxDepth = getJSONStrMaxNestedDepth({}, null, 0);

  console.log(`JSON.stringify max nested depth: ${maxDepth}`);
};
