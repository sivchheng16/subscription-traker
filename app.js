import express from "express";
import { PORT } from "./config/eng.js";

import authRouter from "./route/auth.routes.js";
import userRouter from "./route/user.routes.js";
import subscriptionRouter from "./route/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/scriptions", subscriptionRouter);
app.use(errorMiddleware);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welecome to the subscription tracker api");
});

async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
};

export default app;
