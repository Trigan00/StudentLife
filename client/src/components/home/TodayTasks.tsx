import { useAllTasks, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/types/tasks.types';
import React, { useState } from 'react';
import { Loader } from '../UI/Loader/Loader';
import TaskCard from '../tasks/TaskCard';
import { TaskForm } from '../tasks/TaskForm';
import { Box, Container, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

const filterTodayTasks = (tasks: Task[] | undefined) => {
  const today = dayjs().startOf('day'); // Начало текущего дня

  return tasks?.filter((task) => {
    if (!task.deadLine) return false; // Пропускаем задачи без дедлайна

    const taskDeadline = dayjs(task.deadLine);

    // Сравниваем даты без учета времени
    return taskDeadline.isSame(today, 'day');
  });
};

const TodayTasks = () => {
  const { data, isLoading } = useAllTasks();

  const { updateTask } = useUpdateTask();
  const [taskId, setTaskId] = useState<number | undefined>();
  const [isTaskForm, setIsTaskForm] = useState(false);

  const onDoneHandler = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Paper
      variant='elevation'
      elevation={2}
      sx={{ py: 1, px: 3, borderRadius: 5, width: '50%' }}
    >
      <Typography fontWeight='bold' my={2}>
        Задачи на сегодня
      </Typography>
      {filterTodayTasks(data)?.map((taskInfo) => (
        <TaskCard
          key={taskInfo.id}
          onDoneHandler={onDoneHandler}
          setIsTaskForm={setIsTaskForm}
          setTaskId={setTaskId}
          taskInfo={taskInfo}
        />
      ))}
      {filterTodayTasks(data)?.length === 0 && (
        <Typography>Задач на сегодня нет</Typography>
      )}
      <TaskForm
        isModal={isTaskForm}
        setIsModal={setIsTaskForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Paper>
  );
};

export default TodayTasks;
