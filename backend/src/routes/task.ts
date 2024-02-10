import { Router, Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { TaskServices } from "../services/task";
import { authGuard } from "../middlewares/passport";
import { checkIsInRole } from "../helpers/check-role";

const routes = Router();

const taskServices = new TaskServices();

routes.post(
  "",
  [
    check("title").notEmpty(),
    check("description").notEmpty(),
    check("deadline").notEmpty(),
    check("status").notEmpty(),
  ],
  authGuard,
  checkIsInRole("ADMIN"),
  taskServices.createTask
);

routes.get("", authGuard, checkIsInRole("ADMIN"), taskServices.getTasks);

routes.get(
  "/:id",
  authGuard,
  // checkIsInRole("ADMIN"),
  [check("id").notEmpty()],
  taskServices.getTask
);

routes.put(
  "/:id",
  [
    check("title").isString().notEmpty(),
    check("description").notEmpty().isString(),
    check("deadline").isString().notEmpty(),
    check("status").notEmpty().isString(),
  ],
  // authGuard,
  taskServices.updateTask
);

routes.delete(
  "/:id",
  [check("id").notEmpty()],
  // authGuard,
  taskServices.deleteTask
);

export default routes;
