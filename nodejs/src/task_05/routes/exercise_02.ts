import * as exController from "../controllers/exercise_02";

import express from "express";

export const router = express.Router();

router.get("/task", exController.getGetUser);

router.get("/task/:email", exController.getGetUserData);
