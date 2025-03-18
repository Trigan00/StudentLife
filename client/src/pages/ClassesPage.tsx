import AddClassButton from '@/components/classes/AddClassButton';
import { ClassForm } from '@/components/classes/ClassForm';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const ClassesPage: React.FC = () => {
  const { data, isLoading } = useAllClasses();
  const [isClassForm, setIsClassForm] = useState(false);
  const [classId, setClassId] = useState<number | undefined>();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <div>
        <Stack direction='row' spacing={2} mb={2}>
          <Typography variant='h5'>Предметы</Typography>
          <AddClassButton />
        </Stack>
        <Stack spacing={2} sx={{ width: 'fit-content' }}>
          {data?.map((classInfo, i) => (
            <Box key={classInfo.id}>
              {i + 1}
              <Button
                variant='outlined'
                sx={{ ml: 1 }}
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
      </div>

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
