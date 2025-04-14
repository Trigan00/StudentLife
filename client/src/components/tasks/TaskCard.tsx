import shortenText from '@/helpers/shortenText';
import { Task } from '@/types/tasks.types';
import { COLORS, dayCalendarConfig } from '@/utils/GeneralConsts';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { BpCheckedIcon, BpIcon } from '../UI/MyChexbox';
import TodayIcon from '@mui/icons-material/Today';
import dayjs from 'dayjs';
import { getDeadlineColor } from '@/helpers/getDeadlineColor';
import { makeColor } from '@/helpers/makeColorByPriority';

interface TaskCardI {
  setIsTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
  taskInfo: Task;
  onDoneHandler: (task: Task) => void;
}
const TaskCard: React.FC<TaskCardI> = ({
  taskInfo,
  onDoneHandler,
  setIsTaskForm,
  setTaskId,
}) => {
  return (
    <Box my={1} sx={{ display: 'flex' }}>
      <Checkbox
        checked={taskInfo.completed}
        onClick={() => onDoneHandler(taskInfo)}
        checkedIcon={<BpCheckedIcon color={makeColor(taskInfo.priority)} />}
        icon={<BpIcon color={makeColor(taskInfo.priority)} />}
        sx={{
          alignSelf: 'start',
        }}
      />
      <Box
        flex={1}
        sx={{
          ml: 1,
          cursor: 'pointer',
          borderBottom: '1px solid ' + COLORS.border,
          '&:hover': {
            borderBottom: '1px solid ' + COLORS.textGrey,
          },
        }}
        onClick={() => {
          setTaskId(taskInfo.id);
          setIsTaskForm(true);
        }}
      >
        <Typography
          sx={{ textDecoration: taskInfo.completed ? 'line-through' : 'none' }}
        >
          {taskInfo.title}
        </Typography>
        {!taskInfo.completed && (
          <Typography variant='subtitle2' color='textSecondary'>
            {shortenText(taskInfo.description, 150)}
          </Typography>
        )}
        {taskInfo.deadLine && (
          <Button
            size='small'
            startIcon={<TodayIcon />}
            component='div'
            disabled={taskInfo.completed}
            disableRipple
            disableElevation
            sx={{
              color: getDeadlineColor(taskInfo.deadLine),
              cursor: 'default',
              pointerEvents: 'none', // отключает любые взаимодействия
              '&:hover': {
                backgroundColor: 'transparent', // убирает подсветку
              },
              '&.Mui-disabled': {
                opacity: 1,
              },
            }}
          >
            {dayjs(taskInfo.deadLine).calendar(null, dayCalendarConfig)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TaskCard;
