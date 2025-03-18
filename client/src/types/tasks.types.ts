export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number | null;
  deadLine: string | null;
  classId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDto = Omit<
  Omit<Omit<Partial<Task>, 'id'>, 'title'>,
  'classId'
> & {
  title: string;
  classId: number;
};

export type UpdateTaskDto = Omit<Partial<Task>, 'id'> & { id: number };
