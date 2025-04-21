import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Divider, IconButton, Stack } from '@mui/material';
import MyTime from './UI/MyTime';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const ScheduleCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        p: 1,
        boxSizing: 'border-box',
        width: '23%',
        borderRadius: '10px',
      }}
    >
      {children}
    </Card>
  );
};

const names = [
  ['mon', 'Понедельник'],
  ['tue', 'Вторник'],
  ['wed', 'Среда'],
  ['thu', 'Четверг'],
  ['fri', 'Пятница'],
  ['sat', 'Суббота'],
  ['sun', 'Воскресенье'],
];

const evennessTranslator = (str: string) => {
  switch (str) {
    case 'even':
      return 'Четная';
    case 'odd':
      return 'Нечетная';
    default:
      return 'Всегда';
  }
};

export default function ScheduleSelect({
  schedule,
  setSchedule,
}: {
  schedule: {
    day: string;
    startTime: string;
    evenness: string;
  }[];
  setSchedule: Dispatch<
    SetStateAction<
      {
        day: string;
        startTime: string;
        evenness: string;
      }[]
    >
  >;
}) {
  const [day, setDay] = useState('');
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [evenness, setEvenness] = useState('always');

  const addHandler = () => {
    if (day && time && evenness) {
      for (const element of schedule) {
        if (
          element.day === day &&
          element.startTime === time.format('HH:mm') &&
          element.evenness === evenness
        )
          return;
      }

      setSchedule((prev) => [
        ...prev,
        { day, startTime: time.format('HH:mm'), evenness },
      ]);
      setDay('');
      setTime(null);
      setEvenness('always');
    }
  };

  const deleteHandler = (el: {
    day: string;
    startTime: string;
    evenness: string;
  }) => {
    setSchedule((prev) =>
      prev.filter((element) => {
        if (
          element.day === el.day &&
          element.startTime === el.startTime &&
          element.evenness === el.evenness
        )
          return false;
        return true;
      }),
    );
  };

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <FormControl size='small' sx={{ width: '25%' }}>
          <InputLabel id='mode-label'>День недели</InputLabel>
          <Select
            value={day}
            labelId='mode-label'
            onChange={(e) => setDay(e.target.value)}
            input={<OutlinedInput label='День недели' />}
          >
            {names.map((name) => (
              <MenuItem key={name[0]} value={name[0]}>
                {name[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size='small' sx={{ width: '25%' }}>
          <InputLabel id='evenness-label'>Четность недели</InputLabel>
          <Select
            value={evenness}
            labelId='evenness-label'
            onChange={(e) => setEvenness(e.target.value)}
            input={<OutlinedInput label='Четность недели' />}
          >
            <MenuItem value={'even'}>Четная</MenuItem>
            <MenuItem value={'odd'}>Нечетная</MenuItem>
            <MenuItem value={'always'}>Всегда</MenuItem>
          </Select>
        </FormControl>
        <MyTime
          value={time}
          setValue={setTime}
          label='Время'
          sx={{ width: '25%' }}
        />
        <Button
          variant='outlined'
          size='small'
          sx={{ width: '25%' }}
          onClick={addHandler}
        >
          Добавить
        </Button>
      </Box>
      <Divider />

      {schedule.map((day) => (
        <Box
          key={day.day + day.startTime + day.evenness}
          sx={{ display: 'flex', gap: 1 }}
        >
          <ScheduleCard>
            {(names.find((name) => name[0] === day.day) || [])[1]}
          </ScheduleCard>
          <ScheduleCard>{evennessTranslator(day.evenness)}</ScheduleCard>
          <ScheduleCard>{day.startTime}</ScheduleCard>
          <IconButton size='small' onClick={() => deleteHandler(day)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Stack>
  );
}
