import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password!: string;
}
