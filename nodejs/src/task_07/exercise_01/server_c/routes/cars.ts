import * as carsController from "../controllers/cars";

import express from "express";

export const router = express.Router();

router.get("/addcar", carsController.getAddCar);

router.post("/addcar", carsController.postAddCar);

router.get("/getcarprice", carsController.getGetCarPrice);

router.post("/getcarprice", carsController.postGetCarPrice);

router.get("/addwarehouse", carsController.getAddWarehouse);

router.post("/addwarehouse", carsController.postAddWarehouse);

router.get("/getwarehousecars", carsController.getGetWarehouseCars);

router.post("/getwarehousecars", carsController.postGetWarehouseCars);
