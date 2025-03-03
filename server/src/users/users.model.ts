import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
// import { Password } from 'src/passwords/passwords.model';
import { Token } from 'src/token/token.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  activationLink: string;
  secret2fa: string;
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

  // @Column({ type: DataType.STRING })
  // secret2fa: string;

  // @HasMany(() => Password)
  // passwords: Password[];

  @HasOne(() => Token)
  token: Token;
}
