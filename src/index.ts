import express from "express";

import problemsRouter from "./routes/problems";
import employeeRouter from "./routes/employee";
import accountRouter from "./routes/account";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_: any, res: any) => {
  res.send("Hello World!");
});

app.use("/problems", problemsRouter);
app.use("/employee", employeeRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`server run: http://localhost:${port}`);
});
