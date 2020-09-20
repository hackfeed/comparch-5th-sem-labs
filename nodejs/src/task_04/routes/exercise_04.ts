import * as exController from "../controllers/exercise_04";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getRangeDividends);

router.post("/task", exController.postRangeDividends);
