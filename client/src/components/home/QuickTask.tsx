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
import { Description } from '@mui/icons-material';

const QuickTask = () => {
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
    const data = {
      title,
      description: '',
      classId: Number(classId),
      priority: null,
      deadLine: deadLine?.format() || null,
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
    <Paper variant='outlined' sx={{ p: 3, borderRadius: 5 }}>
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
