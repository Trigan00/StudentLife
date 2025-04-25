import { useLogout } from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useProfile } from '@/hooks/useUsers';
import { Loader } from '@/components/UI/Loader/Loader';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const ProfilePage = () => {
  const { profile, isLoading } = useProfile();
  const { logout, isPending } = useLogout();

  const TasksStats: {
    amount: number | undefined;
    title: string;
    icon: React.ReactNode;
  }[] = [
    {
      amount: profile?.overdue,
      title: 'Задач просрочено',
      icon: <AccessAlarmIcon sx={{ fontSize: '4rem' }} color='error' />,
    },
    {
      amount: profile?.completed,
      title: 'Задач завершено',
      icon: <CheckCircleIcon sx={{ fontSize: '4rem' }} color='primary' />,
    },
    {
      amount: profile?.notCompleted,
      title: 'Задач осталось',
      icon: <AssignmentIcon sx={{ fontSize: '4rem' }} color='action' />,
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant='h5'>Профиль</Typography>
        <Paper
          variant='elevation'
          elevation={2}
          sx={{ p: 3, borderRadius: 5, width: 'fit-content' }}
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar sx={{ width: 72, height: 72 }}>
              <PersonIcon sx={{ fontSize: '3rem' }} />
            </Avatar>
            <Box>
              <Typography variant='h4'>{profile?.user.username}</Typography>
              <Typography>{profile?.user.email}</Typography>
            </Box>
          </Stack>
        </Paper>

        <Stack direction={'row'} spacing={3}>
          {TasksStats.map((el) => (
            <Paper
              variant='elevation'
              elevation={2}
              sx={{ p: 3, borderRadius: 5 }}
              key={el.title}
            >
              <Stack direction='row' alignItems='center' spacing={2}>
                {el.icon}
                <Box>
                  <Typography variant='h4'>{el.amount}</Typography>
                  <Typography>{el.title}</Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button
          variant='outlined'
          color='error'
          onClick={() => logout()}
          loading={isPending}
        >
          Выйти
        </Button>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
