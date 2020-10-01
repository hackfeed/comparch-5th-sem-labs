# Отчет по разделу #6

## Цель работы

Ознакомиться с работой шаблонизаторов и управлением сессиями в **Node.js**.

## Задания 1-2

### Условие

- Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится информация о компьютерных играх (название игры, описание игры, возрастные ограничения). Создать страницу с помощью шаблонизатора. В url передаётся параметр возраст (целое число). Необходимо отображать на этой странице только те игры, у которых возрастное ограничение меньше, чем переданное в url значение.
- Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится информация о пользователях (логин, пароль, хобби, возраст). На основе cookie реализовать авторизацию пользователей. Реализовать возможность для авторизованного пользователя просматривать информацию о себе.

### Код программы

Язык: **Typescript 4.0.2**

**app.ts**

```typescript
import { router as ex01Router } from "./routes/exercise_01";
import { router as ex02Router } from "./routes/exercise_02";
import express from "express";
import { join } from "path";
import session from "express-session";
import { urlencoded } from "body-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(session({ secret: "labsecret", resave: false, saveUninitialized: false }));

app.get("/", (_: express.Request, res: express.Response) =>
  res.render("index", { pageTitle: "Main page" })
);
app.use("/exercise_01", ex01Router);
app.use("/exercise_02", ex02Router);
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3000);
```

**controllers/exercise_01.ts**

```typescript
import express from "express";

const games = [
  { title: "Ghost Of Tsushima", imageUrl: "/images/got.jpg", age: 18 },
  { title: "The Last Of Us Part II", imageUrl: "/images/tlou.jpg", age: 18 },
  { title: "Uncharted Collection", imageUrl: "/images/uncharted.jpg", age: 18 },
  { title: "Fortnite", imageUrl: "/images/fortnite.jpg", age: 12 },
  { title: "FIFA 21", imageUrl: "/images/fifa21.jpg", age: 0 },
];

export const getGames = (req: express.Request, res: express.Response) => {
  let age: number;
  if (!req.query.age) {
    age = Math.max(...games.map((game) => game.age));
  } else {
    age = +req.query.age;
  }
  const ageGames = games.filter((game) => game.age <= age);
  res.render("exercise_01/task", { pageTitle: "Exercise 1", games: ageGames, age });
};
```

**controllers/exercise_02.ts**

```typescript
import express from "express";

const users = [
  {
    login: "hackfeed",
    password: "hackfeed",
    age: 20,
    hobbie: "Спать",
  },
  {
    login: "Justarone",
    password: "hockeyiscool",
    age: 20,
    hobbie: "Решать математику",
  },
  {
    login: "mrrvz",
    password: "haskellkruta",
    age: 19,
    hobbie: "Писать лабы",
  },
];

export const getLogin = (req: express.Request, res: express.Response) => {
  if (req.session!.isLoggedIn) {
    const login = req.session!.login;
    return res.render("exercise_02/message", {
      pageTitle: "Exercise 2",
      message: `Пользователь ${login} уже в системе`,
    });
  }
  res.render("exercise_02/login", { pageTitle: "Exercise 2", message: "Введите логин и пароль" });
};

export const getLogout = (req: express.Request, res: express.Response) => {
  if (req.session!.isLoggedIn) {
    return res.render("exercise_02/logout", {
      pageTitle: "Exercise 2",
      message: "Выйти из системы",
    });
  }
  res.redirect("/");
};

export const postLogout = (req: express.Request, res: express.Response) => {
  if (req.session!.isLoggedIn) {
    const login = req.session!.login;
    req.session?.destroy(() => {});
    return res.render("exercise_02/message", {
      pageTitle: "Exercise 2",
      message: `Пользователь ${login} вышел из системы`,
    });
  }
  res.redirect("/");
};

export const postLogin = (req: express.Request, res: express.Response) => {
  const login = req.body.login;
  const password = req.body.pass;
  if (!login || !password) {
    return res.render("exercise_02/login", {
      pageTitle: "Exercise 2",
      message: "Поле логина или пароля не заполнено",
    });
  }
  const user = users.find((user) => user.login === login && user.password === password);
  if (!user) {
    return res.render("exercise_02/login", {
      pageTitle: "Exercise 2",
      message: "Введен неверный логин или пароль",
    });
  }
  req.session!.isLoggedIn = true;
  req.session!.login = login;
  req.session!.password = password;
  res.render("exercise_02/message", {
    pageTitle: "Exercise 2",
    message: `Пользователь ${login} вошел в систему`,
  });
};

export const getUser = (req: express.Request, res: express.Response) => {
  if (req.session!.isLoggedIn) {
    const user = users.find(
      (user) => user.login === req.session!.login && user.password === req.session!.password
    );
    return res.render("exercise_02/user", {
      pageTitle: "Exercise 2",
      user: user?.login,
      age: user?.age,
      hobbie: user?.hobbie,
    });
  }
  res.redirect("/");
};
```

**routes/exercise_01.ts**

```typescript
import * as exController from "../controllers/exercise_01";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getGames);
```

**routes/exercise_02.ts**

```typescript
import * as exController from "../controllers/exercise_02";

import express from "express";

export const router = express.Router();

router.get("/login", exController.getLogin);

router.post("/login", exController.postLogin);

router.get("/logout", exController.getLogout);

router.post("/logout", exController.postLogout);

router.get("/user", exController.getUser);
```

## Вывод

В результате работы был освоен шаблонизатор **Pug** и работа с сессиями при помощи 
**express-session**.
