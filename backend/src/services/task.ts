import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { Task } from "../entities/task";
export class TaskServices {
  async getTasks(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tasks = await getMyRepository(Task).find();

    return res.status(200).json(tasks);
  }

  async getTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const tasks = await getMyRepository(Task).findOne({ where: { id } });

    return res.status(200).json(tasks);
  }

  async createTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, deadline, status } = req.body;

    const taskModel = getMyRepository(Task);

    const createdTask = await taskModel.save({
      title,
      description,
      status,
      deadline: new Date(deadline),
    });

    return res.status(200).json(createdTask);
  }

  async updateTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { title, description, deadline, status } = req.body;
    deadline = new Date(deadline);
    // console.log(title, description, deadline, status, req.params.id);
    await getMyRepository(Task).update(
      { id: +req.params.id },
      {
        title,
        description,
        deadline,
        status,
      }
    );

    const findTask = await getMyRepository(Task).findOne({
      where: { id: +req.params.id },
    });

    return res.status(200).json(findTask);
  }

  async deleteTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const deletedTask = await getMyRepository(Task).delete(req.params.id);
    return res.status(200).json(deletedTask);
  }
}
