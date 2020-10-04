import { Warehouse } from "../interfaces/warehouse";
import express from "express";
import { promises } from "fs";

export const getWarehouse = (req: express.Request, res: express.Response) => {
  const warehouseName = req.params.name;

  promises
    .readFile("data/data.json", "utf-8")
    .then((content) => {
      const contentArr = JSON.parse(content) as Array<Warehouse>;
      const foundWarehouse = contentArr.find((warehouse) => warehouse.name === warehouseName);
      if (!foundWarehouse) {
        throw new Error("Warehouse with given name not found");
      }
      const warehouse = foundWarehouse;

      return warehouse;
    })
    .then((warehouse) => res.status(200).json({ message: "Got warehouse data", warehouse }))
    .catch((err) => res.status(404).json({ message: err.message }));
};
