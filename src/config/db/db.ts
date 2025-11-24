import "reflect-metadata";
import { DataSource } from "typeorm";
import Author from "../entities/author.model";
import { Book } from "../entities/book.model";
import { User } from "../entities/user.model";

export const AppDataSource = new DataSource({
  type: "postgres", // o "sqlite", "mysql"
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Author, Book, User],
});
