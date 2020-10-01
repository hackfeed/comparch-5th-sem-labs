import { router as ex01Router } from "./routes/exercise_01";
import { router as ex02Router } from "./routes/exercise_02";
import express from "express";
import { join } from "path";
import session from "express-session";
import { urlencoded } from "body-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(session({ secret: "labsecret", resave: false, saveUninitialized: false }));

app.get("/", (_: express.Request, res: express.Response) =>
  res.render("index", { pageTitle: "Main page" })
);
app.use("/exercise_01", ex01Router);
app.use("/exercise_02", ex02Router);
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3000);
