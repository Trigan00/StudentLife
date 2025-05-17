import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ExamQandA } from 'src/exam-qand-a/examQandA.model';
import { Task } from 'src/tasks/entities/tasks.model';
import { User } from 'src/users/users.model';

interface ClassesCreationAttrs {
  name: string;
  userId: number;
  semester: number;
}

@Table({ tableName: 'classes', timestamps: true })
export class Class extends Model<Class, ClassesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  mode: string;

  @Column({ type: DataType.STRING, allowNull: true })
  room: string;

  @Column({ type: DataType.STRING, allowNull: true })
  building: string;

  @Column({ type: DataType.STRING, allowNull: true })
  teacher: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  schedule: { day: string; startTime: string; evenness: string }[]; //day: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

  @Column({ type: DataType.STRING, allowNull: true })
  examType: string; //credit/exam/null

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  completed: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  semester: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => ExamQandA)
  examQandAs: ExamQandA[];
}
