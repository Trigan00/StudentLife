import AddTaskButton from '@/components/tasks/AddTaskButton';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Loader } from '@/components/UI/Loader/Loader';
import shortenText from '@/helpers/shortenText';
import { useAllTasks } from '@/hooks/useTasks';
import { COLORS } from '@/utils/GeneralConsts';
import { Box, Stack, Button, Typography, SxProps } from '@mui/material';
import React, { useState } from 'react';

const makeCircle = (index: number | null): SxProps => {
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
  return {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 4,
      left: -30,
      height: '13px',
      width: '13px',
      borderRadius: '50%',
      border: '2px solid ' + color,
    },
  };
};

const TasksPage: React.FC = () => {
  const { data, isLoading } = useAllTasks();
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <div>
        <Stack direction='row' spacing={2} mb={2}>
          <Typography variant='h5'>Задачи</Typography>
          <AddTaskButton />
        </Stack>
        <Stack spacing={2} sx={{ width: 'fit-content', ml: 3 }}>
          {data?.map((taskInfo, i) => (
            <Box
              key={taskInfo.id}
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
              <Typography sx={makeCircle(taskInfo.priority)}>
                {taskInfo.title}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                {shortenText(taskInfo.description, 150)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </div>

      <TaskForm
        isModal={isTaskForm}
        setIsModal={setIsTaskForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Box>
  );
};

export default TasksPage;
