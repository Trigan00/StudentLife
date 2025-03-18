import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Class } from 'src/classes/classes.model';
import { User } from 'src/users/users.model';

interface TasksCreationAttrs {
  title: string;
  userId: number;
  classId: number;
}

@Table({ tableName: 'tasks', timestamps: true })
export class Task extends Model<Task, TasksCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  priority: number;

  @Column({ type: DataType.STRING, allowNull: true })
  deadLine: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Class)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @BelongsTo(() => Class)
  class: Class;
}
