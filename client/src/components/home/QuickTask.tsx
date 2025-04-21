import { useAllClasses } from '@/hooks/useClasses';
import { useAddTask } from '@/hooks/useTasks';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import MyDateAndTime from '../UI/MyDateAndTime';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from '@/utils/GeneralConsts';
import { CreateTaskDto } from '@/types/tasks.types';
import { useAuth } from '@/hooks/useAuth';

const QuickTask = () => {
  const { auth } = useAuth();
  const { addTask, isPending } = useAddTask(() => {
    onClose();
  });
  const { data: classes, isLoading: isClassLoading } = useAllClasses();

  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState('');
  const [deadLine, setDeadLine] = useState<Dayjs | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [classIdError, setClassIdError] = useState('');

  const submit = () => {
    setErrMsg('');
    setClassIdError('');
    if (!title.trim()) return setErrMsg('Не может быть пустым');
    if (!classId) return setClassIdError('Не может быть пустым');
    if (!auth) return;

    const data: CreateTaskDto = {
      title,
      description: '',
      classId: Number(classId),
      priority: null,
      deadLine: deadLine?.format() || null,
      className: classes?.find((classEl) => classEl.id === Number(classId))
        ?.name as string,
      userIds: [Number(auth.id)],
    };
    addTask(data);
  };

  function onClose() {
    setErrMsg('');
    setClassIdError('');
    setTitle('');
    setDeadLine(null);
    setClassId('');
  }

  return (
    <Paper
      variant='elevation'
      elevation={2}
      sx={{ p: 3, borderRadius: 5, width: '50%' }}
    >
      <Stack direction='row' spacing={1}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errMsg}
          helperText={errMsg}
          required
          size='small'
          label='Быстрое добавление задачи'
          variant='outlined'
          type='text'
          fullWidth
        />
        <IconButton
          sx={{
            backgroundColor: COLORS.primary,
            '&:hover': {
              backgroundColor: COLORS.darkBlue,
            },
            height: '40px',
            width: '40px',
          }}
          loading={isPending || isClassLoading}
          onClick={submit}
        >
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
      </Stack>
      <Stack direction='row' spacing={1} mt={1}>
        <FormControl size='small' sx={{ width: '190px' }}>
          <InputLabel id='classes-label'>Предмет</InputLabel>
          <Select
            value={classId}
            labelId='classes-label'
            onChange={(e) => setClassId(e.target.value)}
            input={<OutlinedInput label='Предмет' error={!!classIdError} />}
          >
            {classes?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MyDateAndTime
          value={deadLine}
          setValue={setDeadLine}
          label='Крайний срок'
          sx={{ width: '190px' }}
        />
      </Stack>
    </Paper>
  );
};

export default QuickTask;
