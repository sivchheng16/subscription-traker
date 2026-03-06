import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "get all subscriptions" } ),
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "get subscription by ID" }),
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "create new subscription" }),
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "update subscription" }),
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "delete subscription" }),
);
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "get all subscriptions " }),
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "cancel user's subscriptions" }),
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "get all upcoming renewals" }),
);

export default subscriptionRouter;
