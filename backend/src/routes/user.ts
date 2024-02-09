import { Router } from "express";
import { check } from "express-validator";
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
    check("fullname").isString().notEmpty(),
    check("email").isString().notEmpty().isEmail(),
    check("password").isString().notEmpty(),
    check("role").isString().notEmpty(),
  ],
  // authGuard,
  userService.createUser
);

routes.get("/:id", [check("id").isNumeric().notEmpty()], userService.getUser);

routes.get("/", userService.getUsers);

routes.put(
  "/:id",
  [
    check("fullname").isString().notEmpty(),
    check("role").isString().notEmpty(),
    check("password").isString().notEmpty(),
  ],
  // authGuard,
  userService.updateUser
);

routes.delete(
  "/:id",
  [check("id").notEmpty()],
  // authGuard,
  userService.deleteUser
);

export default routes;
