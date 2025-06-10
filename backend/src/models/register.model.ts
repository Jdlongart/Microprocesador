import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  value: number;
}