import * as exController from "../controllers/exercise_03";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getGenerateForm);

router.post("/task", exController.postGenerateForm);
