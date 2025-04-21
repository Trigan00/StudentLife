import { IUser } from './auth.types';

export interface Task {
  id: number;
  title: string;
  description: string;
  className: string;
  priority: number | null;
  deadLine: string | null;
  classId: number;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  users: IUser[];
}

type CreateTaskBase = Partial<
  Omit<Task, 'id' | 'title' | 'classId' | 'className' | 'users'>
>;

export interface CreateTaskDto extends CreateTaskBase {
  title: string;
  classId: number;
  className: string;
  userIds: number[];
}

export type UpdateTaskDto = Omit<Partial<Task>, 'id'> & { id: number };
