import { Router } from "express";
import { check } from "express-validator";
import { TaskServices } from "../services/task";
import { authGuard } from "../middlewares/passport";
import { UserServices } from "../services/user";

const routes = Router();

const userService = new UserServices();

routes.post(
  "/login",
  [check("email").notEmpty(), check("password").notEmpty()],
  userService.login
);

routes.post(
  "/register",
  [
    check("fullname").notEmpty(),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty(),
    check("role").notEmpty(),
  ],
  // authGuard,
  userService.createUser
);

routes.get("", authGuard, userService.getUser);

routes.put(
  ":id",
  [
    check("fullname").notEmpty(),
    check("role").notEmpty(),
    check("password").notEmpty(),
  ],
  authGuard,
  userService.updateUser
);

routes.delete(
  ":id",
  [check("id").notEmpty()],
  authGuard,
  userService.deleteUser
);

export default routes;
