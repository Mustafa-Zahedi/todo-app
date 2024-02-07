require("dotenv").config();

import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Task } from "./entities/task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port:
    ((process.env.DB_PORT && parseInt(process.env.DB_PORT)) as number) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "task",
  synchronize: true,
  logging: false,
  entities: [Task],
});

export const getMyRepository = (
  model: EntityTarget<ObjectLiteral>
): Repository<any> => {
  const repo = AppDataSource.getRepository(model);
  return repo;
};
