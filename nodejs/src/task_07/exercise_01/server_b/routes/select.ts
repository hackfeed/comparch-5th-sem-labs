import * as selectController from "../controllers/select";

import express from "express";

export const router = express.Router();

router.get("/:name", selectController.getWarehouse);
