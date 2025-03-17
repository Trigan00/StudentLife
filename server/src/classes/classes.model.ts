import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface ClassesCreationAttrs {
  name: string;
  userId: number;
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
    type: DataType.ARRAY(
      DataType.ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'),
    ),
    allowNull: true,
  })
  dayOfWeek: string[];

  @Column({ type: DataType.STRING, allowNull: true })
  startDay: string;

  @Column({ type: DataType.STRING, allowNull: true })
  endDay: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
