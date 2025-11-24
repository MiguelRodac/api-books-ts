import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Author } from "./author.model";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id_book!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "date", nullable: true })
  published_at?: string;

  @Column({ default: true })
  available!: boolean;

  // Relation with Author
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "id_author" })
  author!: Author;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Book;
