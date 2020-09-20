import express from "express";

export const getRangeDividends = (_: express.Request, res: express.Response) => {
  res.render("exercise_04/task", { pageTitle: "Exercise 4" });
};

export const postRangeDividends = (req: express.Request, res: express.Response) => {
  const divisibles = [];
  const a = +req.body.a;
  const b = +req.body.b;
  const c = +req.body.c;

  for (let i = a; i < b; ++i) {
    if (!(i % c)) {
      divisibles.push(i);
    }
  }

  res.render("result", { result: JSON.stringify(divisibles), pageTitle: "Exercise 4" });
};
