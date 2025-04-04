import AddTaskButton from '@/components/tasks/AddTaskButton';
import TaskCard from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllTasks, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/types/tasks.types';
import { Stack, Typography, Container } from '@mui/material';
import React, { useState } from 'react';

const TasksPage: React.FC = () => {
  const { data, isLoading } = useAllTasks();
  const { updateTask } = useUpdateTask();
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  const onDoneHandler = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const completedTasks = data?.filter((task) => task.completed === true);
  const notCompletedTasks = data?.filter((task) => task.completed === false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Stack direction='row' spacing={2} ml={5} mb={2}>
        <Typography variant='h5'>Задачи</Typography>
        <AddTaskButton />
      </Stack>
      <Stack spacing={2}>
        {notCompletedTasks?.map((taskInfo) => (
          <TaskCard
            key={taskInfo.id}
            onDoneHandler={onDoneHandler}
            setIsTaskForm={setIsTaskForm}
            setTaskId={setTaskId}
            taskInfo={taskInfo}
          />
        ))}
        {completedTasks?.map((taskInfo) => (
          <TaskCard
            key={taskInfo.id}
            onDoneHandler={onDoneHandler}
            setIsTaskForm={setIsTaskForm}
            setTaskId={setTaskId}
            taskInfo={taskInfo}
          />
        ))}
      </Stack>

      <TaskForm
        isModal={isTaskForm}
        setIsModal={setIsTaskForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Container>
  );
};

export default TasksPage;
