import { Router } from "express";
import { check } from "express-validator";
import { TaskServices } from "../services/task";
import { authGuard } from "../middlewares/passport";
import { UserServices } from "../services/user";

const routes = Router();

const userServices = new UserServices();

routes.post(
  "",
  [
    check("fullname").notEmpty(),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty(),
    check("role").notEmpty(),
  ],
  // authGuard,
  userServices.createUser
);

routes.get(
  "",
  //  authGuard,
  userServices.getUser
);

routes.put(
  "/:id",
  [check("title").notEmpty(), check("description").notEmpty()],
  authGuard,
  userServices.updateUser
);

routes.delete(
  "/:id",
  [check("id").notEmpty()],
  authGuard,
  userServices.deleteUser
);

// const token = generateToken({
//     id: findUser.id,
//     role: findUser.is_super_admin,
//     username: findUser.userName,
//   });

export default routes;
