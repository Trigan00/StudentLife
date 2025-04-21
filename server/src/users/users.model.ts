import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Class } from 'src/classes/classes.model';
import { Comment } from 'src/comments/entities/comments.model';
import { Task } from 'src/tasks/entities/tasks.model';
import { UserTasks } from 'src/tasks/entities/user-tasks.model';
import { Token } from 'src/token/token.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  username: string;
  activationLink: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING })
  activationLink: string;

  @HasOne(() => Token)
  token: Token;

  @HasMany(() => Class)
  classes: Class[];

  @BelongsToMany(() => Task, () => UserTasks)
  tasks: Task[];

  @HasMany(() => Comment)
  comments: Comment[];
}
