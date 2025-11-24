import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.model";

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id_author!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: 0 })
  books_published?: number;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Author;
