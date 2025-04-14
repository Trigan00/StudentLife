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
}

export type CreateTaskDto = Omit<
  Omit<Omit<Omit<Partial<Task>, 'id'>, 'title'>, 'classId'>,
  'className'
> & {
  title: string;
  classId: number;
  className: string;
};

export type UpdateTaskDto = Omit<Partial<Task>, 'id'> & { id: number };
