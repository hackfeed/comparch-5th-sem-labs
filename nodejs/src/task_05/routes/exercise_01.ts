import * as exController from "../controllers/exercise_01";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getAddUser);

router.post("/task", exController.postAddUser);
