import dotenv from "dotenv";
import path from "path";
import { Client } from "pg";

dotenv.config({ path: path.join(__dirname, "../../../.env") });
console.log("PATH NAME: ", __dirname + "../../../.env");

const client = new Client({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("DATABASE CONNECTED SUCCESSFULLY!");
  } catch (e) {
    console.error("ERROR DURING DATABASE CONNECTION: ", e);
    process.exit(1); // Exit on failure
  }
};

export { connectDB, client };
