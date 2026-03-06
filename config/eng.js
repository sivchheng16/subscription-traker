import { config } from "dotenv";

config({
  path: `.eng.${process.env.NODE_ENV || "development"}.local`,
});

export const PORT = process.env.PORT ?? 3000;
export const NODE_ENV = process.env.NODE_ENV;
