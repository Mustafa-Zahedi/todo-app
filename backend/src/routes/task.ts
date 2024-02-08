import { Router } from "express";
import { check } from "express-validator";
import { TaskServices } from "../services/task";
import { authGuard } from "../middlewares/passport";

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
  // authGuard,
  taskServices.createTask
);

routes.get(
  "",
  //  authGuard,
  taskServices.getTasks
);

routes.put(
  ":id",
  [check("title").notEmpty(), check("description").notEmpty()],
  authGuard,
  taskServices.updateTask
);

routes.delete(
  ":id",
  [check("id").notEmpty()],
  authGuard,
  taskServices.deleteTask
);

export default routes;
