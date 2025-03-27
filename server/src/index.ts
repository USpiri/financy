import { routes } from "@/routes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { resolve } from "path";

const app = express();
dotenv.config({ path: resolve(__dirname, "./.env") });

app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged");
  const timestamp = Date.now();
  const uptime = process.uptime();
  res.send({ timestamp, uptime });
});

export default app;
