export interface Attachment {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  commentId: number;
}

export interface Comment {
  id: number;
  username: string;
  text: string;
  taskId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
}

export interface UpdateCommentDto {
  id: number;
  text: string;
  taskId: number;
}
