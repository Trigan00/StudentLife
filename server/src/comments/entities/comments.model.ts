import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Task } from 'src/tasks/tasks.model';
import { FileAttachment } from './file-attachment.model.ts';

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;

  @HasMany(() => FileAttachment)
  attachments: FileAttachment[];
}
