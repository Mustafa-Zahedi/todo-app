import express from "express";
import tastRoutes from "./task";

const api = express.Router();

api.use("/task", tastRoutes);

export default api;
