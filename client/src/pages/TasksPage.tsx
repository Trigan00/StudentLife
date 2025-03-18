import AddTaskButton from '@/components/tasks/AddTaskButton';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllTasks } from '@/hooks/useTasks';
import { Box, Stack, Button } from '@mui/material';
import React, { useState } from 'react';

const TasksPage: React.FC = () => {
  const { data, isLoading } = useAllTasks();
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Stack sx={{ flex: 1 }} spacing={2}>
        {data?.map((taskInfo, i) => (
          <Box key={taskInfo.id}>
            {i + 1}
            <Button
              variant='contained'
              sx={{ ml: 1, color: 'white' }}
              onClick={() => {
                setTaskId(taskInfo.id);
                setIsTaskForm(true);
              }}
            >
              {taskInfo.title}
            </Button>
          </Box>
        ))}
      </Stack>

      <AddTaskButton />
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
