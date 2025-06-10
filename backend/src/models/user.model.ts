import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Program } from "./program.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Program, program => program.user)
  programs: Program[];
}