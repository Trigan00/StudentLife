import QuickTask from '@/components/home/QuickTask';
import TodayTasks from '@/components/home/TodayTasks';
import { Box, Stack } from '@mui/material';

const HomePage = () => {
  return (
    <Stack spacing={3}>
      <QuickTask />
      <TodayTasks />
    </Stack>
  );
};

export default HomePage;
