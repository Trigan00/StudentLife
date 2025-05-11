import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Class } from 'src/classes/classes.model';
import { Comment } from 'src/comments/entities/comments.model';
import { User } from 'src/users/users.model';
import { UserTasks } from './user-tasks.model';

interface TasksCreationAttrs {
  title: string;
  // userId: number;
  classId: number;
  className: string;
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

  @Column({ type: DataType.STRING, allowNull: false })
  className: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  completed: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  type: string;

  @BelongsToMany(() => User, () => UserTasks)
  users: User[];

  @ForeignKey(() => Class)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @BelongsTo(() => Class)
  class: Class;

  @HasMany(() => Comment)
  comments: Comment[];
}
