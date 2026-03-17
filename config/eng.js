import { config } from "dotenv";

// DATABASE URI
export const DB_URI =
  "mongodb+srv://sivchheng16:sivchheng16@cluster0.qyzm5od.mongodb.net/?appName=Cluster0";

//JWT AUTH
JWT_SECRET = "secret";
JWT_EXPIRES_IN = "1d";

config({
  path: `.eng.${process.env.NODE_ENV || "development"}.local`,
});

export const PORT = process.env.PORT ?? 3000;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_EXPIRES_IN = process.env.NODE_ENV;
export const JWT_SECRET = process.env.NODE_ENV;
