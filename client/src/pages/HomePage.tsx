import QuickTask from '@/components/home/QuickTask';
import TodayTasks from '@/components/home/TodayTasks';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <QuickTask />
      <TodayTasks />
    </Box>
  );
};

export default HomePage;
