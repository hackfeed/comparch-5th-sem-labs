import * as insertController from "../controllers/insert";

import express from "express";

export const router = express.Router();

router.post("/", insertController.postWarehouse);
