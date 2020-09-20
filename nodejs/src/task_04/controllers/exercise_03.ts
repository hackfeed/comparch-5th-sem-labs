import express from "express";
import { readFileSync } from "fs";

export const getGenerateForm = (_: express.Request, res: express.Response) => {
  res.render("exercise_03/task", { pageTitle: "Exercise 3" });
};

export const postGenerateForm = (req: express.Request, res: express.Response) => {
  const formFields = (req.body.fields as string).split(",").map((field) => field.trim());
  let formBody = `\nform(action="${req.body.route}", method="post")\n`;

  for (const field of formFields) {
    formBody += `\tinput(name="${field}", type="text")\n`;
  }
  formBody += `\tbutton(type="submit")</code>`;

  res.render("result", { result: formBody, pageTitle: "Exercise 2" });
};
