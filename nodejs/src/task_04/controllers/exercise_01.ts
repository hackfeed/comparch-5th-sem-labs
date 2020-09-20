import express from "express";

export const getMaxNumber = (_: express.Request, res: express.Response) => {
  res.render("exercise_01/task", { pageTitle: "Exercise 1" });
};

export const postMaxNumber = (req: express.Request, res: express.Response) => {
  const max = Math.max(+req.body.fnum, +req.body.snum, +req.body.tnum);

  res.render("result", { result: max, pageTitle: "Exercise 1" });
};
