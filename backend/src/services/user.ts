import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { User } from "../entities/user";
export class UserServices {
  async getUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = await getMyRepository(User).find();

    return res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, deadline, status } = req.body;

    // console.log(title, description, deadline, status);

    const userModel = getMyRepository(User);

    const createdUser = await userModel.save({
      title,
      description,
      status,
      deadline,
    });

    return res.status(200).json(createdUser);
  }

  async updateUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, deadline, status } = req.body;
    const updatedUser = await getMyRepository(User).update(req.params.id, {
      title,
      description,
      deadline,
      status,
    });

    return res.status(200).json(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const deletedUser = await getMyRepository(User).delete(req.params.id);
    return res.status(200).json(deletedUser);
  }
}
