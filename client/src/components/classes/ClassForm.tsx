import {
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../UI/Loader/Loader';
import MyModal from '../UI/MyModal';
import {
  useAddClass,
  useDeleteClass,
  useOneClass,
  useUpdateClass,
} from '@/hooks/useClasses';
import dayjs, { Dayjs } from 'dayjs';
import MyDate from '../UI/MyDate';
import DayOfWeekSelect from '../DayOfWeekSelect';
import DeleteModal from '../DeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';

interface ClassFormI {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  id?: number;
  setClassId?: Dispatch<SetStateAction<number | undefined>>;
}

export function ClassForm({ isModal, setIsModal, id, setClassId }: ClassFormI) {
  const { data, isLoading } = useOneClass(id);
  const { addClass, isPending } = useAddClass(() => {
    onClose();
    setIsModal(false);
  });
  const { updateClass, isPending: isUpdatePending } = useUpdateClass(id);
  const { deleteClass, isDeletePending } = useDeleteClass(() =>
    setIsModal(false),
  );

  const [name, setName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [teacher, setTeacher] = useState('');
  const [mode, setMode] = useState('');
  const [room, setRoom] = useState('');
  const [building, setBuilding] = useState('');
  const [startDay, setStartDay] = useState<Dayjs | null>(null);
  const [endDay, setEndDay] = useState<Dayjs | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setTeacher(data.teacher);
      setMode(data.mode);
      setRoom(data.room);
      setBuilding(data.building);
      setStartDay(data.startDay ? dayjs(data.startDay) : null);
      setEndDay(data.endDay ? dayjs(data.endDay) : null);
      setDayOfWeek(data.dayOfWeek);
    }
  }, [data]);

  const submit = () => {
    if (!name.trim()) return setErrMsg('Не может быть пустым');
    const data = {
      name,
      mode,
      room,
      building,
      teacher,
      dayOfWeek,
      startDay: startDay?.format() || null,
      endDay: endDay?.format() || null,
    };
    !!id ? updateClass({ id, ...data }) : addClass(data);
  };

  function onClose() {
    if (!!!id) {
      setErrMsg('');
      setName('');
      setTeacher('');
      setMode('');
      setRoom('');
      setBuilding('');
      setStartDay(null);
      setEndDay(null);
      setDayOfWeek([]);
    }
    setClassId && setClassId(undefined);
  }

  return (
    <MyModal
      isModal={isModal}
      setIsModal={setIsModal}
      onClose={onClose}
      maxWidth={1000}
    >
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          mb: 2,
          textAlign: 'center',
        }}
      >
        {!!id ? 'Редактировать занятие' : 'Добавить занятие'}
      </Typography>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Stack spacing={3}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errMsg}
              helperText={errMsg}
              required
              size='small'
              label='Название'
              variant='outlined'
              type='text'
              fullWidth
            />

            <Stack direction='row' spacing={2}>
              <TextField
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                size='small'
                label='Преподаватель'
                variant='outlined'
                type='text'
                sx={{
                  width: '50%',
                }}
              />

              <FormControl size='small' sx={{ width: '50%' }}>
                <InputLabel id='mode-label'>Тип</InputLabel>
                <Select
                  value={mode}
                  labelId='mode-label'
                  onChange={(e) => setMode(e.target.value)}
                  input={<OutlinedInput label='Тип' />}
                >
                  <MenuItem value={'online'}>Онлайн</MenuItem>
                  <MenuItem value={'in person'}>Офлайн</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction='row' spacing={2}>
              <TextField
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                size='small'
                label='Аудитория'
                variant='outlined'
                type='text'
                sx={{
                  width: '50%',
                }}
              />
              <TextField
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                size='small'
                label='Здание'
                variant='outlined'
                type='text'
                sx={{
                  width: '50%',
                }}
              />
            </Stack>

            <Typography variant='h6' color='textSecondary' fontWeight='bold'>
              Расписание
            </Typography>
            <Stack direction='row' spacing={2}>
              <MyDate
                value={startDay}
                setValue={setStartDay}
                label='Начало'
                sx={{ width: '50%' }}
              />
              <MyDate
                value={endDay}
                setValue={setEndDay}
                label='Конец'
                sx={{ width: '50%' }}
              />
            </Stack>

            <DayOfWeekSelect
              dayOfWeek={dayOfWeek}
              setDatOfWeek={setDayOfWeek}
            />
          </Stack>

          {isPending || isUpdatePending || isDeletePending ? (
            <Loader />
          ) : (
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                {!!id && (
                  <Button
                    onClick={() => setDeleteModal(true)}
                    color='error'
                    startIcon={<DeleteIcon color='error' />}
                  >
                    Удалить
                  </Button>
                )}
              </div>
              <div>
                <Button
                  size='small'
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    onClose();
                    setIsModal(false);
                  }}
                >
                  Отменить
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  sx={{ color: 'white' }}
                  onClick={submit}
                >
                  {!!id ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </Box>
          )}
        </>
      )}
      {!!id && (
        <DeleteModal
          isModal={deleteModal}
          setIsModal={setDeleteModal}
          deleteFunction={() => deleteClass(id)}
          isLoading={isDeletePending}
          title='Удалить занятие?'
          subtitle={`Занятие «${name}» будет безвозвратно удалено.`}
          confirmation='Удалить занятие.'
        />
      )}
    </MyModal>
  );
}
