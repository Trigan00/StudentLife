import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';

const ClassesPage: React.FC = () => {
  const { data, isLoading } = useAllClasses();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Stack sx={{ flex: 1 }}>
        {data?.map((classInfo) => (
          <Box key={classInfo.id}>{classInfo.name}</Box>
        ))}
      </Stack>
      <Button variant='contained' sx={{ color: 'white' }}>
        Добавить занятие
      </Button>
    </Box>
  );
};

export default ClassesPage;
