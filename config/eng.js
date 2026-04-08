import { config } from "dotenv";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

// DATABASE URI - Use local MongoDB or update with valid credentials
export const DB_URI =
  process.env.DB_URI ??
  "mongodb+srv://kheangsivechheng_db_user:subscription@cluster0.p8e1fkj.mongodb.net/subscription-tracker?retryWrites=true&w=majority";
//JWT AUTH
const JWT_SECRET_DEFAULT = "secret";
const JWT_EXPIRES_IN_DEFAULT = "1d";

export const PORT = process.env.PORT ?? 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN ?? JWT_EXPIRES_IN_DEFAULT;
export const JWT_SECRET = process.env.JWT_SECRET ?? JWT_SECRET_DEFAULT;
