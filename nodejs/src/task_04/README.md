# Отчет по разделу #4

## Цель работы

Ознакомиться с фреймворком серверной разработки **Express**.

## Задания 1-4

### Условие

- Запустить сервер. Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них. Реализовать страницу с формой ввода для отправки запроса на сервер.
- Запустить сервер. На стороне сервера должен храниться файл, внутри которого находится JSON строка. В этой JSON строке хранится информация о массиве объектов. Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу. Реализовать страницу с формой ввода для отправки запроса на сервер.
- Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять). Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.
- Запустить сервер. Реализовать на сервере функцию, которая принимает на вход числа A, B и C. Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.

### Код программы

Язык: **Typescript 3.9.7**

**app.ts**

```typescript
import { router as ex01Router } from "./routes/exercise_01";
import { router as ex02Router } from "./routes/exercise_02";
import { router as ex03Router } from "./routes/exercise_03";
import { router as ex04Router } from "./routes/exercise_04";
import express from "express";
import { join } from "path";
import { urlencoded } from "body-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.get("/", (_: express.Request, res: express.Response) =>
  res.render("index", { pageTitle: "Main page" })
);
app.use("/exercise_01", ex01Router);
app.use("/exercise_02", ex02Router);
app.use("/exercise_03", ex03Router);
app.use("/exercise_04", ex04Router);
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3000);
```

**controllers/exercise_01.ts**

```typescript
import express from "express";

export const getMaxNumber = (_: express.Request, res: express.Response) => {
  res.render("exercise_01/task", { pageTitle: "Exercise 1" });
};

export const postMaxNumber = (req: express.Request, res: express.Response) => {
  const max = Math.max(+req.body.fnum, +req.body.snum, +req.body.tnum);

  res.render("result", { result: max, pageTitle: "Exercise 1" });
};
```

**controllers/exercise_02.ts**

```typescript
import express from "express";
import { readFileSync } from "fs";

export const getArrayIndex = (_: express.Request, res: express.Response) => {
  res.render("exercise_02/task", { pageTitle: "Exercise 2" });
};

export const postArrayIndex = (req: express.Request, res: express.Response) => {
  const fileData = JSON.parse(readFileSync("data/data.json").toString());
  let result = !fileData[+req.body.index]
    ? "Ничего не найдено"
    : JSON.stringify(fileData[+req.body.index]);

  res.render("result", { result, pageTitle: "Exercise 2" });
};
```

**controllers/exercise_03.ts**

```typescript
import express from "express";
import { writeFileSync } from "fs";

export const getGenerateForm = (_: express.Request, res: express.Response) => {
  res.render("exercise_03/task", { pageTitle: "Exercise 3" });
};

export const postGenerateForm = (req: express.Request, res: express.Response) => {
  const formFields = (req.body.fields as string).split(",").map((field) => field.trim());

  let page = `extends ../layouts/main.pug\nblock content\n\t.centered\n\t\tform(action="${req.body.route}", method="post")\n`;

  for (const field of formFields) {
    page += `\t\t\tinput(name="${field}", type="text", placeholder="${field}")\n`;
  }
  page += `\t\t\tbutton(type="submit") Отправить`;

  writeFileSync(`${__dirname}/../views/exercise_03/generated.pug`, page);

  res.render("exercise_03/generated", { pageTitle: "Exercise 3 Generated" });
};
```

**controllers/exercise_04.ts**

```typescript
import express from "express";

export const getRangeDividends = (_: express.Request, res: express.Response) => {
  res.render("exercise_04/task", { pageTitle: "Exercise 4" });
};

export const postRangeDividends = (req: express.Request, res: express.Response) => {
  const divisibles = [];
  const a = +req.body.a;
  const b = +req.body.b;
  const c = +req.body.c;

  for (let i = a; i < b; ++i) {
    if (!(i % c)) {
      divisibles.push(i);
    }
  }

  res.render("result", { result: JSON.stringify(divisibles), pageTitle: "Exercise 4" });
};
```

**routes/exercise_01.ts**

```typescript
import * as exController from "../controllers/exercise_01";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getMaxNumber);

router.post("/task", exController.postMaxNumber);
```

**routes/exercise_02.ts**

```typescript
import * as exController from "../controllers/exercise_02";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getArrayIndex);

router.post("/task", exController.postArrayIndex);
```

**routes/exercise_03.ts**

```typescript
import * as exController from "../controllers/exercise_03";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getGenerateForm);

router.post("/task", exController.postGenerateForm);
```

**routes/exercise_04.ts**

```typescript
import * as exController from "../controllers/exercise_04";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getRangeDividends);

router.post("/task", exController.postRangeDividends);
```

## Вывод

В результате работы был разработан сервер на основе **Express**, изучены основные достоинства и
недостатки данного фреймворка.
