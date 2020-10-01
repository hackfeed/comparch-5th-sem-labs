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
