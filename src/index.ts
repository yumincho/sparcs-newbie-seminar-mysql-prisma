import express from "express";

import problemsRouter from "./routes/problems";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_: any, res: any) => {
  res.send("Hello World!");
});

app.use("/problems", problemsRouter);

app.listen(port, () => {
  console.log(`server run: http://localhost:${port}`);
});
