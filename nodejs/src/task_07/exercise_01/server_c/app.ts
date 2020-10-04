import { router as carsRouter } from "./routes/cars";
import express from "express";
import { join } from "path";
import { urlencoded } from "body-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.get("/", (_: express.Request, res: express.Response) =>
  res.render("index", { pageTitle: "Main page" })
);
app.use(carsRouter);
app.use((_: express.Request, res: express.Response) =>
  res.render("404", { pageTitle: "Error 404" })
);

app.listen(3002);
