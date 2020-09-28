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
