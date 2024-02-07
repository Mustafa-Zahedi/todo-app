import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";

import api from "./routes/api";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api", api);

AppDataSource.initialize()
  .then(() => {
    // start application after connection with database!
    app.listen(port, () => {
      console.log(`🚀 app is running on PORT => ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting with database", err);
  });
