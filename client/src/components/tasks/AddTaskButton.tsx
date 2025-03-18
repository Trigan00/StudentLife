import { Button } from '@mui/material';
import React, { useState } from 'react';
import { TaskForm } from './TaskForm';

function AddClassButton() {
  const [isTaskForm, setIsTaskForm] = useState(false);

  return (
    <>
      <Button
        variant='contained'
        sx={{ color: 'white', height: 'fit-content' }}
        onClick={() => {
          setIsTaskForm(true);
        }}
      >
        Добавить задачу
      </Button>

      <TaskForm isModal={isTaskForm} setIsModal={setIsTaskForm} />
    </>
  );
}

export default AddClassButton;
