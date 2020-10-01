import * as exController from "../controllers/exercise_02";

import express from "express";

export const router = express.Router();

router.get("/login", exController.getLogin);

router.post("/login", exController.postLogin);

router.get("/logout", exController.getLogout);

router.post("/logout", exController.postLogout);

router.get("/user", exController.getUser);
