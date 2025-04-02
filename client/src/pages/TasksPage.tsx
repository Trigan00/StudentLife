import AddTaskButton from '@/components/tasks/AddTaskButton';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { BpCheckedIcon, BpIcon } from '@/components/UI/MyChexbox';
import shortenText from '@/helpers/shortenText';
import { useAllTasks, useUpdateTask } from '@/hooks/useTasks';
import { Task } from '@/types/tasks.types';
import { COLORS } from '@/utils/GeneralConsts';
import { Box, Stack, Typography, Checkbox, Container } from '@mui/material';
import React, { useState } from 'react';

const makeColor = (index: number | null) => {
  let color = '';
  switch (index) {
    case 1:
      color = 'green';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;

    default:
      color = 'grey';
      break;
  }
  return color;
};

interface TaskCardI {
  setIsTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
  taskInfo: Task;
  onDoneHandler: (task: Task) => void;
}
const TaskCard: React.FC<TaskCardI> = ({
  taskInfo,
  onDoneHandler,
  setIsTaskForm,
  setTaskId,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Checkbox
        checked={taskInfo.completed}
        onClick={() => onDoneHandler(taskInfo)}
        checkedIcon={<BpCheckedIcon color={makeColor(taskInfo.priority)} />}
        icon={<BpIcon color={makeColor(taskInfo.priority)} />}
        sx={{
          alignSelf: 'start',
        }}
      />
      <Box
        flex={1}
        sx={{
          ml: 1,
          cursor: 'pointer',
          borderBottom: '1px solid ' + COLORS.border,
          '&:hover': {
            borderBottom: '1px solid ' + COLORS.textGrey,
          },
        }}
        onClick={() => {
          setTaskId(taskInfo.id);
          setIsTaskForm(true);
        }}
      >
        <Typography>{taskInfo.title}</Typography>
        {/* <Typography sx={makeCircle(taskInfo.priority)}>
      {taskInfo.title}
    </Typography> */}
        <Typography variant='subtitle2' color='textSecondary'>
          {shortenText(taskInfo.description, 150)}
        </Typography>
      </Box>
    </Box>
  );
};

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
      <Stack direction='row' spacing={2} mb={2}>
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
