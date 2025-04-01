export interface Class {
  id: number;
  name: string;
  mode: string;
  room: string;
  building: string;
  teacher: string;
  schedule: { day: string; startTime: string; evenness: string }[];
  examType: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateClassDto = Omit<Omit<Partial<Class>, 'id'>, 'name'> & {
  name: string;
};

export type UpdateClassDto = Omit<Partial<Class>, 'id'> & { id: number };
