import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "get all subscriptions" }),
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "get subscription by ID" }),
);
subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "update subscription" }),
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "delete subscription" }),
);
(subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions),
  subscriptionRouter.put("/:id/cancel", (req, res) =>
    res.send({ title: "cancel user's subscriptions" }),
  ),
  subscriptionRouter.get("/upcoming-renewals", (req, res) =>
    res.send({ title: "get all upcoming renewals" }),
  ));

export default subscriptionRouter;
