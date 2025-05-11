import { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  Alert,
  Stack,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNotifications } from '@/hooks/useUsers';

const Notifications = () => {
  const { notifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge
          color='primary'
          variant='dot'
          invisible={
            notifications?.isPracticalWorks && notifications.isTermWorks
          }
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          minWidth: 300,
        }}
      >
        {notifications?.isPracticalWorks && notifications.isTermWorks ? (
          <Typography sx={{ m: 1 }}>Уведомлений нет</Typography>
        ) : (
          <Stack spacing={1} sx={{ mx: 1 }}>
            {!notifications?.isPracticalWorks && (
              <Alert severity='info'>У вас не создано задачи на практику</Alert>
            )}
            {!notifications?.isTermWorks && (
              <Alert severity='info'>
                У вас не создано задачи на курсовую работу
              </Alert>
            )}
          </Stack>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
