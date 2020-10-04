import { Warehouse } from "../interfaces/warehouse";
import express from "express";
import { promises } from "fs";

export const postWarehouse = (req: express.Request, res: express.Response) => {
  const warehouse = {
    name: req.body.name,
    cars: req.body.cars,
  } as Warehouse;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Warehouse>;
      const isExists = !!contentArr.find((exwarehouse) => exwarehouse.name === warehouse.name);
      if (isExists) {
        throw new Error("Given warehouse already exists");
      }
      contentArr.push(warehouse);

      return promises.writeFile("data/data.json", JSON.stringify(contentArr));
    })
    .then(() => res.status(201).json({ message: "Warehouse added successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
