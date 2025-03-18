import AddClassButton from '@/components/classes/AddClassButton';
import { ClassForm } from '@/components/classes/ClassForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import { Box, Button, Stack } from '@mui/material';
import React, { useState } from 'react';

const ClassesPage: React.FC = () => {
  const { data, isLoading } = useAllClasses();
  const [isClassForm, setIsClassForm] = useState(false);
  const [classId, setClassId] = useState<number | undefined>();

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
                setClassId(classInfo.id);
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
        id={classId}
        setClassId={setClassId}
      />
    </Box>
  );
};

export default ClassesPage;
