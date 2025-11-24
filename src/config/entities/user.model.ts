import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column()
  nickname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // almacenado en hash con bcrypt

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default User;
