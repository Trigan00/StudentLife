import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Comment } from './comments.model';

@Table({ tableName: 'file_attachments' })
export class FileAttachment extends Model {
  @Column
  filename: string;

  @Column
  path: string;

  @Column
  mimetype: string;

  @Column(DataType.INTEGER)
  size: number;

  @Column
  attachmentType: string; // 'comment' | 'answer'

  @Column
  attachmentId: number;
}
