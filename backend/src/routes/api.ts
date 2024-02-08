import express from "express";
import taskRoutes from "./task";
import userRoutes from "./user";

const api = express.Router();

api.use("/task", taskRoutes);
api.use("/user", userRoutes);

export default api;
