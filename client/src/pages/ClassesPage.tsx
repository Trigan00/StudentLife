import AddClassButton from '@/components/AddClassButton';
import { ClassForm } from '@/components/ClassForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import { Box, Button, Stack } from '@mui/material';
import React, { useState } from 'react';

const ClassesPage: React.FC = () => {
  const { data, isLoading } = useAllClasses();
  const [isClassForm, setIsClassForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Stack sx={{ flex: 1 }} spacing={2}>
        {data?.map((classInfo, i) => (
          <Box key={classInfo.id}>
            {i + 1}
            <Button
              variant='contained'
              sx={{ ml: 1, color: 'white' }}
              onClick={() => {
                setTaskId(classInfo.id);
                setIsClassForm(true);
              }}
            >
              {classInfo.name}
            </Button>
          </Box>
        ))}
      </Stack>

      <AddClassButton />
      <ClassForm
        isModal={isClassForm}
        setIsModal={setIsClassForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Box>
  );
};

export default ClassesPage;
