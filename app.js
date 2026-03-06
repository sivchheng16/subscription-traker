import express from "express";
import { PORT } from "./config/eng.js";

import authRouter from "./route/auth.routes.js";
import userRouter from "./route/user.routes.js";
import subscriptionRouter from "./route/subscription.routes.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/scriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("welecome to the subscription tracker api");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

export default app;
