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
