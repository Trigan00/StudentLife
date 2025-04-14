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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Loader } from '../UI/Loader/Loader';
import MyModal from '../UI/MyModal';

import dayjs, { Dayjs } from 'dayjs';
import DeleteModal from '../DeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useOneTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from '@/hooks/useTasks';
import MyDateAndTime from '../UI/MyDateAndTime';
import { useAllClasses } from '@/hooks/useClasses';
import { Comments } from './Comments';
import { useSearchParams } from 'react-router-dom';
import { PRIORITY_OPTIONS } from '@/utils/GeneralConsts';

interface TaskFormI {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  id?: number;
  setTaskId?: Dispatch<SetStateAction<number | undefined>>;
}

export function TaskForm({ isModal, setIsModal, id, setTaskId }: TaskFormI) {
  const [searchParams] = useSearchParams();
  const defaultDate = searchParams.get('date');
  const defaultClassId = searchParams.get('classId');
  const normalizedDate = useMemo(() => {
    return typeof defaultDate === 'string' ? defaultDate : undefined;
  }, [defaultDate]);
  const normalizedClassId = useMemo(() => {
    return typeof defaultClassId === 'string' ? defaultClassId : undefined;
  }, [defaultClassId]);

  const { data, isLoading } = useOneTask(id);
  const { data: classes, isLoading: isClassLoading } = useAllClasses();
  const { addTask, isPending } = useAddTask(() => {
    onClose();
    setIsModal(false);
  });
  const { updateTask, isPending: isUpdatePending } = useUpdateTask(id);
  const { deleteTask, isDeletePending } = useDeleteTask(() =>
    setIsModal(false),
  );

  const [title, setTitle] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [description, setDescription] = useState('');
  const [classId, setClassId] = useState(
    normalizedClassId ? normalizedClassId : '',
  );
  const [classIdError, setClassIdError] = useState('');
  const [priority, setPriority] = useState('');
  const [deadLine, setDeadLine] = useState<Dayjs | null>(
    normalizedDate ? dayjs(normalizedDate) : null,
  );

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setClassId(String(data.classId));
      setPriority(data.priority ? String(data.priority) : '');
      setDeadLine(data.deadLine ? dayjs(data.deadLine) : null);
    }
  }, [data]);

  const submit = () => {
    if (!title.trim()) return setErrMsg('Не может быть пустым');
    if (!classId) return setClassIdError('Не может быть пустым');
    const data = {
      title,
      description,
      classId: Number(classId),
      priority: priority ? Number(priority) : null,
      deadLine: deadLine?.format() || null,
      className: classes?.find((classEl) => classEl.id === Number(classId))
        ?.name as string,
    };
    !!id ? updateTask({ id, ...data }) : addTask(data);
  };

  function onClose() {
    if (!!!id) {
      setErrMsg('');
      setClassIdError('');
      setTitle('');
      setDescription('');
      setPriority('');
    }
    if (!normalizedDate) setDeadLine(null);
    if (!normalizedClassId) setClassId('');

    setTaskId && setTaskId(undefined);
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
        {!!id ? 'Редактировать задачу' : 'Добавить задачу'}
      </Typography>

      {isLoading || isClassLoading ? (
        <Loader />
      ) : (
        <>
          <Stack spacing={3}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errMsg}
              helperText={errMsg}
              required
              size='small'
              label='Название'
              variant='outlined'
              type='text'
              fullWidth
            />

            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              minRows={3}
              size='small'
              label='Описание'
              variant='outlined'
              type='text'
              fullWidth
            />

            <Stack direction='row' spacing={2}>
              <FormControl size='small' sx={{ width: '50%' }}>
                <InputLabel id='classes-label'>Предмет</InputLabel>
                <Select
                  value={classId}
                  labelId='classes-label'
                  onChange={(e) => setClassId(e.target.value)}
                  input={
                    <OutlinedInput label='Предмет' error={!!classIdError} />
                  }
                >
                  {classes?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size='small' sx={{ width: '50%' }}>
                <InputLabel id='priority-label'>Приоритет</InputLabel>
                <Select
                  value={priority}
                  labelId='priority-label'
                  onChange={(e) => setPriority(e.target.value)}
                  input={<OutlinedInput label='Приоритет' />}
                >
                  <MenuItem value={3}>{PRIORITY_OPTIONS['3']}</MenuItem>
                  <MenuItem value={2}>{PRIORITY_OPTIONS['2']}</MenuItem>
                  <MenuItem value={1}>{PRIORITY_OPTIONS['1']}</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Typography variant='h6' color='textSecondary' fontWeight='bold'>
              Расписание
            </Typography>
            <MyDateAndTime
              value={deadLine}
              setValue={setDeadLine}
              label='Крайний срок'
              sx={{ width: '50%' }}
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
          {!!id && <Comments taskId={id} />}
        </>
      )}
      {!!id && (
        <DeleteModal
          isModal={deleteModal}
          setIsModal={setDeleteModal}
          deleteFunction={() => deleteTask(id)}
          isLoading={isDeletePending}
          title='Удалить задачу?'
          subtitle={`Задача «${title}» будет безвозвратно удалена.`}
          confirmation='Удалить задачу.'
        />
      )}
    </MyModal>
  );
}
