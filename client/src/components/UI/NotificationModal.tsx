import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type NotificationModalProps = {
  open: boolean;
  onClose: () => void;
  onGoToSchedule: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  onGoToSchedule,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Box display='flex' alignItems='center' gap={1}>
          <CalendarMonthIcon color='primary' />
          Новый семестр начался!
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant='body1' color='text.secondary'>
          Обновите своё расписание, чтобы не пропустить важные пары и быть в
          курсе всех изменений.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Позже
        </Button>
        <Button
          variant='contained'
          sx={{ color: 'white' }}
          onClick={onGoToSchedule}
        >
          Перейти к предметам
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationModal;
