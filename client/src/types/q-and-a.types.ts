import { Attachment } from './comments.types';

export interface QandA {
  id: number;
  question: string;
  answer: string;
  classId: number;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
}
