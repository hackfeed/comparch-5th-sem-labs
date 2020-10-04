import { Car } from "../interfaces/car";
import express from "express";
import { promises } from "fs";

export const getCar = (req: express.Request, res: express.Response) => {
  const carModel = req.params.model;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Car>;
      const foundCar = contentArr.find((car) => car.model === carModel);
      if (!foundCar) {
        throw new Error("Car with given model not found");
      }
      const car = foundCar;

      return car;
    })
    .then((car) => res.status(200).json({ message: "Got car data", car }))
    .catch((err) => res.status(404).json({ message: err.message }));
};
