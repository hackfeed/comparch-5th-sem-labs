# Отчет по разделу #3

## Задание 1

### Условие

С клавиатуры считывается число N. Далее считывается N строк. Необходимо создать массив и сохранять в него строки только с четной длинной. Получившийся массив необходимо преобразовать в строку JSON и сохранить в файл.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

## Задание 2

### Условие

Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON. Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

**types.ts**

```typescript
export type Filter = (_: string, value: string) => string | undefined;
```

## Задание 3

### Условие

С клавиатуры считывается строка - название расширения файлов. Далее считывается строка - адрес папки. Необходимо перебрать все файлы в папке и вывести содержимое файлов, у которых расширение совпадает с введенным расширением.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

## Задание 4

### Условие

Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt". Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

## Задание 5

### Условие

С клавиатуры считывается число N. Далее считывается N строк - имена текстовых файлов. Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

## Задание 6

### Условие

Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга полей в объекте, чтобы данный объект можно было преобразовать в строку формата JSON. Ответом является целое число.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```

## Задание 7

### Условие

Из файла считывается строка в формате JSON. В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве. Необходимо вывести на экран ветку с максимальной вложенностью.

### Код программы

Язык: **Typescript 3.9.7**

**task.ts**

```typescript
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
    `Max nested depth: ${resObject.depth}\nBranch: ${JSON.stringify(JSONData[resObject.key])}`
  );
};
```

**main.ts**

```typescript
import { solveTask } from "./task";

solveTask();
```