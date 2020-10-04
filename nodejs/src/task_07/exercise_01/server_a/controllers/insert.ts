import { Car } from "../interfaces/car";
import express from "express";
import { promises } from "fs";

export const postCar = (req: express.Request, res: express.Response) => {
  const car = {
    model: req.body.model,
    price: +req.body.price!,
  } as Car;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Car>;
      const isExists = !!contentArr.find((excar) => excar.model === car.model);
      if (isExists) {
        throw new Error("Given car already exists");
      }
      contentArr.push(car);

      return promises.writeFile("data/data.json", JSON.stringify(contentArr));
    })
    .then(() => res.status(201).json({ message: "Car added successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
