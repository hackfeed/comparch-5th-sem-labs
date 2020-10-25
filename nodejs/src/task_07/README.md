# Отчет по разделу #7

## Цель работы

Ознакомиться с взаимодейтсвием серверов в **Node.js**.

## Задание 1

### Условие

Создать сервер А. На стороне сервера хранится файл с содержимым в формате JSON. При получении запроса на /insert/record идёт добавление записи в файл. При получении запроса на /select/record идёт получение записи из файла. Каждая запись хранит информацию о машине (название и стоимость).

Создать сервер Б. На стороне сервера хранится файл с содержимым в формате JSON. Каждая запись в файле хранит информацию о складе и массиве машин, находящихся на данном складе. То есть каждая запись хранит в себе название склада (строку) и массив названий машин (массив строк). При получении запроса на /insert/record идёт добавление записи в файл. При получении запроса на /select/record идёт получение записи из файла.

Создать сервер C. Сервер выдаёт пользователю страницы с формами для ввода информации. При этом сервер взаимодействует с серверами А и Б. Реализовать для пользователя функции:

* создание нового типа машины
* получение информации о стоимости машины по её типу
* создание нового склада с находящимися в нём машинами
* получение информации о машинах на складе по названию склада

Реализовать удобный для пользователя интерфейс взаимодействия с системой (использовать поля ввода и кнопки).

### Код программы

Язык: **Typescript 4.0.2**

#### Сервер A

**interfaces/car.ts**

```typescript
export interface Car {
  model: string;
  price: number;
}
```

**app.ts**

```typescript
import express from "express";
import { router as insertRouter } from "./routes/insert";
import { json } from "body-parser";
import { router as selectRouter } from "./routes/select";

const app = express();

app.use(json());

app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/select", selectRouter);
app.use("/insert", insertRouter);

app.listen(3000);
```

**controllers/insert.ts**

```typescript
import { Car } from "../interfaces/car";
import express from "express";
import { promises } from "fs";

export const postCar = (req: express.Request, res: express.Response) => {
  const car = {
    model: req.body.model,
    price: +req.body.price!,
  } as Car;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Car>;
      const isExists = !!contentArr.find((excar) => excar.model === car.model);
      if (isExists) {
        throw new Error("Given car already exists");
      }
      contentArr.push(car);

      return promises.writeFile("data/data.json", JSON.stringify(contentArr));
    })
    .then(() => res.status(201).json({ message: "Car added successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
```

**controllers/select.ts**

```typescript
import { Car } from "../interfaces/car";
import express from "express";
import { promises } from "fs";

export const getCar = (req: express.Request, res: express.Response) => {
  const carModel = req.params.model;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Car>;
      const foundCar = contentArr.find((car) => car.model === carModel);
      if (!foundCar) {
        throw new Error("Car with given model not found");
      }
      const car = foundCar;

      return car;
    })
    .then((car) => res.status(200).json({ message: "Got car data", car }))
    .catch((err) => res.status(404).json({ message: err.message }));
};
```

**routes/insert.ts**

```typescript
import * as insertController from "../controllers/insert";

import express from "express";

export const router = express.Router();

router.post("/", insertController.postCar);
```

**routes/select.ts**

```typescript
import * as selectController from "../controllers/select";

import express from "express";

export const router = express.Router();

router.get("/:model", selectController.getCar);
```

#### Сервер B

**interfaces/warehouse.ts**

```typescript
export interface Warehouse {
  name: string;
  cars: string[];
}
```

**app.ts**

```typescript
import express from "express";
import { router as insertRouter } from "./routes/insert";
import { json } from "body-parser";
import { router as selectRouter } from "./routes/select";

const app = express();

app.use(json());

app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/select", selectRouter);
app.use("/insert", insertRouter);

app.listen(3001);
```

**controllers/insert.ts**

```typescript
import { Warehouse } from "../interfaces/warehouse";
import express from "express";
import { promises } from "fs";

export const postWarehouse = (req: express.Request, res: express.Response) => {
  const warehouse = {
    name: req.body.name,
    cars: req.body.cars,
  } as Warehouse;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Warehouse>;
      const isExists = !!contentArr.find((exwarehouse) => exwarehouse.name === warehouse.name);
      if (isExists) {
        throw new Error("Given warehouse already exists");
      }
      contentArr.push(warehouse);

      return promises.writeFile("data/data.json", JSON.stringify(contentArr));
    })
    .then(() => res.status(201).json({ message: "Warehouse added successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
```

**controllers/select.ts**

```typescript
import { Warehouse } from "../interfaces/warehouse";
import express from "express";
import { promises } from "fs";

export const getWarehouse = (req: express.Request, res: express.Response) => {
  const warehouseName = req.params.name;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Warehouse>;
      const foundWarehouse = contentArr.find((warehouse) => warehouse.name === warehouseName);
      if (!foundWarehouse) {
        throw new Error("Warehouse with given name not found");
      }
      const warehouse = foundWarehouse;

      return warehouse;
    })
    .then((warehouse) => res.status(200).json({ message: "Got warehouse data", warehouse }))
    .catch((err) => res.status(404).json({ message: err.message }));
};
```

**routes/insert.ts**

```typescript
import * as insertController from "../controllers/insert";

import express from "express";

export const router = express.Router();

router.post("/", insertController.postWarehouse);
```

**routes/select.ts**

```typescript
import * as selectController from "../controllers/select";

import express from "express";

export const router = express.Router();

router.get("/:name", selectController.getWarehouse);
```

#### Сервер C

**interfaces/warehouse.ts**

**app.ts**

```typescript
import { router as carsRouter } from "./routes/cars";
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
app.use(carsRouter);
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3002);
```

**controllers/cars.ts**

```typescript
import { Car } from "../../server_a/interfaces/car";
import { Warehouse } from "../../server_b/interfaces/warehouse";
import express from "express";
import fetch from "node-fetch";

export const getAddCar = (_: express.Request, res: express.Response) => {
  res.render("cars/addcar", { pageTitle: "Add Car" });
};

export const postAddCar = (req: express.Request, res: express.Response) => {
  const car = {
    model: req.body.model,
    price: +req.body.price!,
  } as Car;

  fetch("http://localhost:3000/insert/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then((data) =>
      res.render("cars/message", { pageTitle: "Add Car Result", message: data.message })
    )
    .catch((err) => console.log(err));
};

export const getGetCarPrice = (_: express.Request, res: express.Response) => {
  res.render("cars/getcarprice", { pageTitle: "Get Car Price" });
};

export const postGetCarPrice = (req: express.Request, res: express.Response) => {
  const carModel = req.body.model;

  fetch(`http://localhost:3000/select/${encodeURI(carModel)}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.car) {
        return res.render("cars/message", {
          pageTitle: "Get Car Price Result",
          message: data.message,
        });
      }
      return res.render("cars/message", {
        pageTitle: "Get Car Price Result",
        message: data.car.price,
      });
    })
    .catch((err) => console.log(err));
};

export const getAddWarehouse = (_: express.Request, res: express.Response) => {
  res.render("cars/addwarehouse", { pageTitle: "Add Warehouse" });
};

export const postAddWarehouse = (req: express.Request, res: express.Response) => {
  const cars = (req.body.cars as string).split(",").map((car) => car.trim());
  const warehouse = {
    name: req.body.name,
    cars,
  } as Warehouse;

  fetch("http://localhost:3001/insert/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(warehouse),
  })
    .then((response) => response.json())
    .then((data) =>
      res.render("cars/message", { pageTitle: "Add Warehouse Result", message: data.message })
    )
    .catch((err) => console.log(err));
};

export const getGetWarehouseCars = (_: express.Request, res: express.Response) => {
  res.render("cars/getwarehousecars", { pageTitle: "Get Warehouse Cars" });
};

export const postGetWarehouseCars = (req: express.Request, res: express.Response) => {
  const warehouseName = req.body.name;

  fetch(`http://localhost:3001/select/${encodeURI(warehouseName)}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.warehouse) {
        return res.render("cars/message", {
          pageTitle: "Get Warehouse Result",
          message: data.message,
        });
      }
      return res.render("cars/message", {
        pageTitle: "Get Warehouse Result",
        message: data.warehouse.cars,
      });
    })
    .catch((err) => console.log(err));
};
```

**routes/cars.ts**

```typescript
import * as carsController from "../controllers/cars";

import express from "express";

export const router = express.Router();

router.get("/addcar", carsController.getAddCar);

router.post("/addcar", carsController.postAddCar);

router.get("/getcarprice", carsController.getGetCarPrice);

router.post("/getcarprice", carsController.postGetCarPrice);

router.get("/addwarehouse", carsController.getAddWarehouse);

router.post("/addwarehouse", carsController.postAddWarehouse);

router.get("/getwarehousecars", carsController.getGetWarehouseCars);

router.post("/getwarehousecars", carsController.postGetWarehouseCars);
```

## Задание 2

### Условие

Написать скрипт, который принимает на вход число и считает его факториал. Скрипт должен получать параметр через process.argv.

Написать скрипт, который принимает на вход массив чисел и выводит на экран факториал каждого числа из массива. Скрипт принимает параметры через process.argv.

При решении задачи вызывать скрипт вычисления факториала через execSync.

### Код программы

Язык: **Typescript 4.0.2**

**fac.ts**

```typescript
const getFactorial = (n: number): void => {
  let prod = 1;

  for (let i = 2; i <= n; ++i) {
    prod *= i;
  }
  console.log(prod);
};

getFactorial(+process.argv[2]);
```

**task.ts**

```typescript
import { exec } from "child-process-promise";

const runCmd = (cmd: string, values: string[]) => {
  values.forEach((value) =>
    exec(`${cmd} ${value}`)
      .then((res) => console.log(res.stdout))
      .catch((err) => console.log(err))
  );
};

runCmd("node fac.js", ["1", "2", "3", "4", "5"]);
```

## Вывод

В результате работы было освоено взаимодействие между серверами.
