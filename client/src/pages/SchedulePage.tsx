import Dates from '@/components/schedule/Dates';
import { Loader } from '@/components/UI/Loader/Loader';
import { useSchedule } from '@/hooks/useShedule';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useState } from 'react';

dayjs.extend(weekOfYear);

const SchedulePage = () => {
  const { data, isLoading } = useSchedule();
  const [active, setActive] = useState(dayjs());

  const weekNumber = active.week();

  // Определяем, четная или нечетная неделя
  const isEvenWeek = weekNumber % 2 === 0 ? 'четная' : 'нечетная';

  // Форматируем дату
  const formattedDate = active.format('dddd, D MMMM');

  // Итоговая строка

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Dates active={active} setActive={setActive} />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{
              '&:first-letter': {
                textTransform: 'uppercase',
              },
            }}
          >
            {formattedDate}
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              '&:first-letter': {
                textTransform: 'uppercase',
              },
            }}
          >
            {isEvenWeek} неделя
          </Typography>
        </Box>
        <Stack spacing={2} mt={2}>
          {data &&
            data[active.day()].map((classEl) => (
              <Box key={classEl.id} sx={{ maxWidth: '500px' }}>
                <Typography variant='h6' fontWeight={'bold'}>
                  {classEl.name}
                </Typography>
                {classEl.building && (
                  <Typography variant='body1'>
                    Здание: {classEl.building}
                  </Typography>
                )}
                {classEl.room && (
                  <Typography variant='body1'>Ауд: {classEl.room}</Typography>
                )}
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SchedulePage;
