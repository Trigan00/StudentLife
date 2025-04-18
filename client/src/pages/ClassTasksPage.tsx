import AddTaskButton from '@/components/tasks/AddTaskButton';
import TaskCard from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useTasksBySubject, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/types/tasks.types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Stack,
  Typography,
  Container,
  Button,
  Collapse,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ClassTasksPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId');
  const name = searchParams.get('name');
  const date = searchParams.get('date');

  const { data, isLoading } = useTasksBySubject(Number(classId), date || '');
  const { updateTask } = useUpdateTask();
  const [expanded, setExpanded] = useState({
    today: true,
    other: true,
  });
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  const onDoneHandler = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const expandedHandler = (type: 'today' | 'other') => {
    if (type === 'today')
      setExpanded((prev) => {
        return { ...prev, today: !prev.today };
      });
    else
      setExpanded((prev) => {
        return { ...prev, other: !prev.other };
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Stack direction={'row'} spacing={2} ml={5} mb={2}>
        <Typography variant='h5'>{name}</Typography>
        <AddTaskButton />
      </Stack>
      <Box>
        <Button
          onClick={() => expandedHandler('today')}
          color='inherit'
          sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
        >
          {expanded.today ? <ExpandLess /> : <ExpandMore />}
          {dayjs(date).format('MMMM DD, YYYY • dddd')}
        </Button>
        <Collapse in={expanded.today} timeout='auto' unmountOnExit>
          <Stack spacing={2}>
            {data?.dayTasks.length ? (
              data?.dayTasks.map((taskInfo) => (
                <TaskCard
                  key={taskInfo.id}
                  onDoneHandler={onDoneHandler}
                  setIsTaskForm={setIsTaskForm}
                  setTaskId={setTaskId}
                  taskInfo={taskInfo}
                />
              ))
            ) : (
              <Typography>{`Задач на ${dayjs(date).format(
                'MMMM DD, YYYY',
              )} нет`}</Typography>
            )}
          </Stack>
        </Collapse>
      </Box>
      <Button
        onClick={() => expandedHandler('other')}
        color='inherit'
        sx={{ mt: 2, fontWeight: 'bold' }}
        size='medium'
      >
        {expanded.other ? <ExpandLess /> : <ExpandMore />}
        Другие дни
      </Button>
      <Collapse in={expanded.other} timeout='auto' unmountOnExit>
        <Stack spacing={2}>
          {data?.classTasks.length ? (
            data?.classTasks.map((taskInfo) => (
              <TaskCard
                key={taskInfo.id}
                onDoneHandler={onDoneHandler}
                setIsTaskForm={setIsTaskForm}
                setTaskId={setTaskId}
                taskInfo={taskInfo}
              />
            ))
          ) : (
            <Typography variant='body2'>Задач нет</Typography>
          )}
        </Stack>
      </Collapse>

      <TaskForm
        isModal={isTaskForm}
        setIsModal={setIsTaskForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Container>
  );
};

export default ClassTasksPage;
