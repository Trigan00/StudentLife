import QuickTask from '@/components/home/QuickTask';
import TodayTasks from '@/components/home/TodayTasks';
import { Box, Container, Stack } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Stack spacing={3}>
        <QuickTask />
        <TodayTasks />
      </Stack>
    </Container>
  );
};

export default HomePage;
