import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Program } from "./program.model";

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line: number;

  @Column()
  content: string;

  @ManyToOne(() => Program, program => program.instructions)
  program: Program;
}