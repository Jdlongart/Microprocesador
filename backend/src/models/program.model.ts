import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.model";
import { Instruction } from "./instruction.model";

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.programs)
  user: User;

  @OneToMany(() => Instruction, instruction => instruction.program)
  instructions: Instruction[];
}