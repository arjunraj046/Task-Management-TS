import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskSchema {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "int", nullable: false })
  userId!: number;

  @Column({ type: "varchar", nullable: false })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "date" })
  dueDate!: string;

  @Column({ type: "boolean", default: false })
  completed!: boolean;
}
