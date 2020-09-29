# Отчет по разделу #5

## Цель работы

Ознакомиться с разработкой **RESTful** сервиса с использованием **AJAX**-запросов.

## Задания 1-3

### Условие

- Создать сервер. Сервер должен выдавать страницу с тремя текстовыми полями и кнопкой. В поля ввода вбивается информация о почте, фамилии и номере телефона человека. При нажатии на кнопку "Отправить" введённая информация должна отправляться с помощью POST запроса на сервер и добавляться к концу файла (в файле накапливается информация). При этом на стороне сервера должна происходить проверка: являются ли почта и телефон уникальными. Если они уникальны, то идёт добавление информации в файл. В противном случае добавление не происходит. При отправке ответа с сервера клиенту должно приходить сообщение с информацией о результате добавления (добавилось или не добавилось). Результат операции должен отображаться на странице.
- Добавить серверу возможность отправлять клиенту ещё одну страницу. На данной странице должно быть поле ввода и кнопка. В поле ввода вводится почта человека. При нажатии на кнопку "Отправить" на сервер отправляется GET запрос. Сервер в ответ на GET запрос должен отправить информацию о человеке с данной почтой в формате JSON или сообщение об отсутствии человека с данной почтой.
- Оформить внешний вид созданных страниц с помощью CSS. Информация со стилями CSS для каждой страницы должна храниться в отдельном файле. Стили CSS должны быть подключены к страницам.

### Код программы

Язык: **Typescript 4.0.2**

**interfaces/user.ts**

```typescript
export interface User {
  email: string;
  surname: string;
  phone: string;
}
```

**app.ts**

```typescript
import { router as ex01Router } from "./routes/exercise_01";
import { router as ex02Router } from "./routes/exercise_02";
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
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3000);
```

**controllers/exercise_01.ts**

```typescript
import { User } from "../interfaces/user";
import express from "express";
import { promises } from "fs";

export const getAddUser = (_: express.Request, res: express.Response) => {
  res.render("exercise_01/task", { pageTitle: "Exercise 1" });
};

export const postAddUser = (req: express.Request, res: express.Response) => {
  const user = {
    email: req.query.email,
    surname: req.query.surname,
    phone: req.query.phone,
  } as User;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<User>;
      const isExists =
        contentArr.filter((exuser) => exuser.email === user.email && exuser.phone === user.phone)
          .length > 0;
      if (isExists) {
        throw new Error("Given user already exists");
      }
      contentArr.push(user);

      return promises.writeFile("data/data.json", JSON.stringify(contentArr));
    })
    .then(() => res.status(201).json({ message: "User added successfully" }))
    .catch(() => res.status(500).json({ message: "User's addition failed" }));
};
```

**controllers/exercise_02.ts**

```typescript
import { User } from "../interfaces/user";
import express from "express";
import { promises } from "fs";

export const getGetUser = (_: express.Request, res: express.Response) => {
  res.render("exercise_02/task", { pageTitle: "Exercise 2" });
};

export const getGetUserData = (req: express.Request, res: express.Response) => {
  const email = req.params.email;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<User>;
      const foundUsers = contentArr.filter((user) => user.email === email);
      if (!foundUsers.length) {
        throw new Error("User with given email not found");
      }
      const user = foundUsers[0];

      return user;
    })
    .then((user) => res.status(200).json({ message: "Got user data", user }))
    .catch((err) => res.status(500).json({ message: err }));
};
```

**routes/exercise_01.ts**

```typescript
import * as exController from "../controllers/exercise_01";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getAddUser);

router.post("/task", exController.postAddUser);
```

**routes/exercise_02.ts**

```typescript
import * as exController from "../controllers/exercise_02";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getGetUser);

router.get("/task/:email", exController.getGetUserData);
```

**ajax/exercise_01.ts**

```typescript
const addUser = () => {
  const inputs = document.querySelectorAll("input");
  const email = inputs[0].value;
  const surname = inputs[1].value;
  const phone = inputs[2].value;

  const pageBody = document.querySelector("main .centered")!;
  let result = pageBody!.querySelector(".result")!;
  let resultField: HTMLHeadingElement;

  if (!result) {
    result = document.createElement("div");
    result.className = "result";

    resultField = document.createElement("h1");

    result.appendChild(resultField);
    pageBody.appendChild(result);
  } else {
    resultField = result.querySelector("h1")!;
  }

  fetch(
    `/exercise_01/task?email=${encodeURI(email)}&surname=${encodeURI(surname)}&phone=${encodeURI(
      phone
    )}`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      if (!response.ok) {
        result.classList.add("result-error");
        result.classList.remove("result-ok");
        resultField.textContent =
          "Произошла ошибка добавления данных. Возможно, пользователь с введенными данными уже существует";
      } else {
        result.classList.add("result-ok");
        result.classList.remove("result-error");
        resultField.textContent = "Данные успешно добавлены";
      }
    })
    .catch((err) => console.log(err));
};

const addUserBtn = document.querySelector("button")!;
addUserBtn.addEventListener("click", addUser);
```

**ajax/exercise_02.ts**

```typescript
const getUser = () => {
  const email = document.querySelector("input")!.value;

  const pageBody = document.querySelector("main .centered")!;
  let result = pageBody!.querySelector(".result")!;
  let resultField: HTMLHeadingElement,
    emailField: HTMLHeadingElement,
    surnameField: HTMLHeadingElement,
    phoneField: HTMLHeadingElement;

  if (!result) {
    result = document.createElement("div");
    result.className = "result";

    resultField = document.createElement("h1");
    emailField = document.createElement("h2");
    surnameField = document.createElement("h2");
    phoneField = document.createElement("h2");

    result.appendChild(resultField);
    const userFields = [emailField, surnameField, phoneField];
    userFields.forEach((field) => result.appendChild(field));
    pageBody.appendChild(result);
  } else {
    resultField = result.querySelector("h1")!;

    emailField = result.querySelectorAll("h2")[0];
    surnameField = result.querySelectorAll("h2")[1];
    phoneField = result.querySelectorAll("h2")[2];
  }

  fetch(`/exercise_02/task/${encodeURI(email)}`)
    .then((response) => {
      if (!response.ok) {
        result.classList.add("result-error");
        result.classList.remove("result-ok");
        resultField.textContent = "Пользователя с указанным Email не существует";
        emailField.textContent = "";
        surnameField.textContent = "";
        phoneField.textContent = "";
      } else {
        response.json().then((data) => {
          result.classList.add("result-ok");
          result.classList.remove("result-error");
          resultField.textContent = "Пользователь с указанным Email найден";
          emailField.textContent = `Email: ${data.user.email}`;
          surnameField.textContent = `Фамилия: ${data.user.surname}`;
          phoneField.textContent = `Телефон: ${data.user.phone}`;
        });
      }
    })
    .catch((err) => console.log(err));
};

const getUserBtn = document.querySelector("button")!;
getUserBtn.addEventListener("click", getUser);
```

**public/css/main.css**

```css
* {
  box-sizing: border-box;
}

header {
  padding: 1rem;
  margin: auto;
}

body {
  padding: 0;
  margin: 0;
  background-color: black;
  color: white;
  font-family: "Open Sans", sans-serif;
}

main {
  padding: 1rem;
  margin: auto;
}

main a,
main a:visited {
  font-size: 2em;
  text-decoration: none;
  color: white;
  font-family: "Courier New", Courier, monospace;
}

main a:hover {
  color: black;
  background-color: white;
  padding: 3px;
  border-radius: 10px;
}

main button {
  padding: 3px;
  background-color: black;
  border: 2px solid white;
  border-radius: 2px;
  color: white;
  width: 300px;
  cursor: pointer;
}

main button:hover {
  background-color: white;
  color: black;
}

.centered {
  text-align: center;
}

.result {
  width: 500px;
  margin: 1rem auto;
}

.result-ok {
  border: 2px solid #00df00;
}

.result-error {
  border: 2px solid red;
}

.data-input {
  display: inline-block;
}

.data-input p,
.data-input input {
  display: block;
  width: 300px;
  margin-bottom: 0.25rem;
}

.img404 {
  width: 30%;
}

.imghp {
  width: 3%;
  background-color: white;
  padding-left: 3px;
  padding-right: 3px;
  border-radius: 5px;
}
```

## Вывод

В результате работы был разработан **RESTful** сервис с применением **AJAX**-запросов, выяснены
плюсы и минусы использования асинхронных запросов.
