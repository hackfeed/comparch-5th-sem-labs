import { Car } from "../../server_a/interfaces/car";
import { Warehouse } from "../../server_b/interfaces/warehouse";
import express from "express";
import fetch from "node-fetch";

export const getAddCar = (_: express.Request, res: express.Response) => {
  res.render("cars/addcar", { pageTitle: "Add Car" });
};

export const postAddCar = (req: express.Request, res: express.Response) => {
  const car = {
    model: req.body.model,
    price: +req.body.price!,
  } as Car;

  fetch("http://localhost:3000/insert/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((response) => response.json())
    .then((data) =>
      res.render("cars/message", { pageTitle: "Add Car Result", message: data.message })
    )
    .catch((err) => console.log(err));
};

export const getGetCarPrice = (_: express.Request, res: express.Response) => {
  res.render("cars/getcarprice", { pageTitle: "Get Car Price" });
};

export const postGetCarPrice = (req: express.Request, res: express.Response) => {
  const carModel = req.body.model;

  fetch(`http://localhost:3000/select/${encodeURI(carModel)}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.car) {
        return res.render("cars/message", {
          pageTitle: "Get Car Price Result",
          message: data.message,
        });
      }
      return res.render("cars/message", {
        pageTitle: "Get Car Price Result",
        message: data.car.price,
      });
    })
    .catch((err) => console.log(err));
};

export const getAddWarehouse = (_: express.Request, res: express.Response) => {
  res.render("cars/addwarehouse", { pageTitle: "Add Warehouse" });
};

export const postAddWarehouse = (req: express.Request, res: express.Response) => {
  const cars = (req.body.cars as string).split(",").map((car) => car.trim());
  const warehouse = {
    name: req.body.name,
    cars,
  } as Warehouse;

  fetch("http://localhost:3001/insert/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(warehouse),
  })
    .then((response) => response.json())
    .then((data) =>
      res.render("cars/message", { pageTitle: "Add Warehouse Result", message: data.message })
    )
    .catch((err) => console.log(err));
};

export const getGetWarehouseCars = (_: express.Request, res: express.Response) => {
  res.render("cars/getwarehousecars", { pageTitle: "Get Warehouse Cars" });
};

export const postGetWarehouseCars = (req: express.Request, res: express.Response) => {
  const warehouseName = req.body.name;

  fetch(`http://localhost:3001/select/${encodeURI(warehouseName)}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.warehouse) {
        return res.render("cars/message", {
          pageTitle: "Get Warehouse Result",
          message: data.message,
        });
      }
      return res.render("cars/message", {
        pageTitle: "Get Warehouse Result",
        message: data.warehouse.cars,
      });
    })
    .catch((err) => console.log(err));
};
