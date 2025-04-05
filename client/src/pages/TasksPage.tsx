import AddTaskButton from '@/components/tasks/AddTaskButton';
import TaskCard from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import TaskTune, { groupType } from '@/components/tasks/TaskTune';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllTasks, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/types/tasks.types';
import { PRIORITY_OPTIONS } from '@/utils/GeneralConsts';
import { Stack, Typography, Container, Box } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

type GroupedTasks = Record<string, Task[]>;

export function groupTasks(tasks: Task[], key: groupType): GroupedTasks {
  const grouped = tasks.reduce((acc, task) => {
    let groupKey: string;

    switch (key) {
      case 'priority':
        groupKey =
          task.priority !== null
            ? PRIORITY_OPTIONS[
                task.priority.toString() as keyof typeof PRIORITY_OPTIONS
              ] + ' приоритет'
            : 'Без приоритета';
        break;
      case 'deadline':
        groupKey = task.deadLine ?? 'Без срока';
        break;
      case 'createdAt':
        groupKey = dayjs(task.createdAt).format('YYYY-MM-DD');
        break;
      case 'no':
        groupKey = 'Все задачи';
        break;
      default:
        groupKey = 'Прочее';
        break;
    }

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(task);

    return acc;
  }, {} as GroupedTasks);

  // 🔽 Сортировка ключей групп
  let sortedKeys = Object.keys(grouped);

  switch (key) {
    case 'priority':
      sortedKeys = sortedKeys.sort((a, b) => {
        if (a === 'Без приоритета') return 1;
        if (b === 'Без приоритета') return -1;
        return Number(b) - Number(a);
      });
      break;

    case 'deadline':
      sortedKeys = sortedKeys.sort((a, b) => {
        if (a === 'Без срока') return 1;
        if (b === 'Без срока') return -1;
        return dayjs(a).diff(dayjs(b));
      });
      break;

    case 'createdAt':
      sortedKeys = sortedKeys.sort((a, b) => dayjs(b).diff(dayjs(a)));
      break;
  }

  // Вернём отсортированный объект
  const sortedGrouped: GroupedTasks = {};
  for (const key of sortedKeys) {
    sortedGrouped[key] = grouped[key];
  }

  if (key === 'no' && sortedGrouped['Все задачи']) {
    const group = sortedGrouped['Все задачи'];
    sortedGrouped['Все задачи'] = [
      ...group.filter((t) => !t.completed),
      ...group.filter((t) => t.completed),
    ];
  }

  return sortedGrouped;
}

const TasksPage: React.FC = () => {
  const { data, isLoading } = useAllTasks();

  const { updateTask } = useUpdateTask();
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  const [showCompleted, setShowCompleted] = useState(false);
  const [grouping, setGrouping] = useState<groupType>('no');

  const onDoneHandler = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  // const completedTasks = allTasks?.filter((task) => task.completed === true);
  // const notCompletedTasks = allTasks?.filter(
  //   (task) => task.completed === false,
  // );

  const grouped = groupTasks(data || [], grouping);
  const groupKeys = Object.keys(grouped);

  data && console.log();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Stack direction='row' spacing={2} ml={5} mb={2}>
          <Typography variant='h5'>Задачи</Typography>
          <AddTaskButton />
        </Stack>
        <TaskTune
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
          grouping={grouping}
          setGrouping={setGrouping}
        />
      </Box>
      <Stack spacing={2}>
        {groupKeys.map((groupKey) => (
          <div key={groupKey} style={{ marginBottom: '1rem' }}>
            <Typography variant='body1' fontWeight='bold' mb={1}>
              {grouping === 'deadline' || grouping === 'createdAt'
                ? groupKey === 'Без срока'
                  ? 'Без срока'
                  : dayjs(groupKey).format('MMMM DD, YYYY • dddd')
                : groupKey}
            </Typography>
            {grouped[groupKey].map((taskInfo) => {
              if (taskInfo.completed && !showCompleted) return null;
              else
                return (
                  <TaskCard
                    key={taskInfo.id}
                    onDoneHandler={onDoneHandler}
                    setIsTaskForm={setIsTaskForm}
                    setTaskId={setTaskId}
                    taskInfo={taskInfo}
                  />
                );
            })}
          </div>
        ))}
        {/* {notCompletedTasks?.map((taskInfo) => (
          <TaskCard
            key={taskInfo.id}
            onDoneHandler={onDoneHandler}
            setIsTaskForm={setIsTaskForm}
            setTaskId={setTaskId}
            taskInfo={taskInfo}
          />
        ))}
        {showCompleted &&
          completedTasks?.map((taskInfo) => (
            <TaskCard
              key={taskInfo.id}
              onDoneHandler={onDoneHandler}
              setIsTaskForm={setIsTaskForm}
              setTaskId={setTaskId}
              taskInfo={taskInfo}
            />
          ))} */}
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
