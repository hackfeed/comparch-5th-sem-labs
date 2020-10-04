import express from "express";
import { router as insertRouter } from "./routes/insert";
import { json } from "body-parser";
import { router as selectRouter } from "./routes/select";

const app = express();

app.use(json());

app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/select", selectRouter);
app.use("/insert", insertRouter);

app.listen(3001);
