import { Button } from '@mui/material';
import React, { useState } from 'react';
import { QandAForm } from './QandAForm';

function AddQandAButton() {
  const [isQandAForm, setIsQandAForm] = useState(false);

  return (
    <>
      <Button
        variant='contained'
        sx={{ color: 'white', height: 'fit-content' }}
        onClick={() => {
          setIsQandAForm(true);
        }}
      >
        Добавить вопрос
      </Button>

      <QandAForm isModal={isQandAForm} setIsModal={setIsQandAForm} />
    </>
  );
}

export default AddQandAButton;
