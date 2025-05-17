import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Class } from 'src/classes/classes.model';
import { FileAttachment } from 'src/comments/entities/file-attachment.model.ts';

interface ExamQandACreationAttrs {
  question: string;
  answer: string;
  classId: number;
}

@Table({ tableName: 'examQandA', timestamps: true })
export class ExamQandA extends Model<ExamQandA, ExamQandACreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  question: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  answer: string;

  @ForeignKey(() => Class)
  @Column
  classId: number;

  @BelongsTo(() => Class)
  class: Class;

  @HasMany(() => FileAttachment, {
    foreignKey: 'attachmentId',
    scope: {
      attachmentType: 'answer',
    },
  })
  attachments: FileAttachment[];
}
