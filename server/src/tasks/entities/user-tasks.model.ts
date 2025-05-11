import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Task } from './tasks.model';

@Table({ tableName: 'user-tasks' })
export class UserTasks extends Model<UserTasks> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Task)
  @Column({
    onDelete: 'CASCADE',
  })
  taskId: number;
}
