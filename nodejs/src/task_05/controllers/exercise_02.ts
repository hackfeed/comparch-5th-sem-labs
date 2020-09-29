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
