import { Router } from "express";
import { check } from "express-validator";
import { TaskServices } from "../services/task";
import { authGuard } from "../middlewares/passport";

const routes = Router();

const taskServices = new TaskServices();

routes.post(
  "/task",
  [check("title").notEmpty(), check("description").notEmpty()],
  authGuard,
  //   (req, res) => {}
  taskServices.createTask
);

routes.get("/task", authGuard, taskServices.getTasks);

routes.put(
  "/task/:id",
  [check("title").notEmpty(), check("description").notEmpty()],
  authGuard,
  taskServices.updateTask
);

routes.delete(
  "/task/:id",
  [check("id").notEmpty()],
  authGuard,
  taskServices.deleteTask
);

// const token = generateToken({
//     id: findUser.id,
//     role: findUser.is_super_admin,
//     username: findUser.userName,
//   });

export default routes;
