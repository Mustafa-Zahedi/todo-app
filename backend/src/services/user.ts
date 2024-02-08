import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { User } from "../entities/user";
import { generateToken } from "../helpers/token.helper";
import { hashData, isHashValid } from "../helpers/hash.helper";

export class UserServices {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user: User = await getMyRepository(User).findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const passwordCompared = await isHashValid(password, user.password);

    if (!passwordCompared) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    return res.status(200).json({ token: generateToken(user) });
  }

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

    const { fullname, email, password, role } = req.body;

    const userModel = getMyRepository(User);

    const createdUser = await userModel.save({
      fullname,
      email,
      role,
      password: await hashData(password),
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
