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
