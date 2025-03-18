import { Button } from '@mui/material';
import React, { useState } from 'react';
import { ClassForm } from './ClassForm';

function AddClassButton() {
  const [isClassForm, setIsClassForm] = useState(false);

  return (
    <>
      <Button
        variant='contained'
        sx={{ color: 'white', height: 'fit-content' }}
        onClick={() => {
          setIsClassForm(true);
        }}
      >
        Добавить
      </Button>

      <ClassForm isModal={isClassForm} setIsModal={setIsClassForm} />
    </>
  );
}

export default AddClassButton;
