import Dates from '@/components/schedule/Dates';
import { Loader } from '@/components/UI/Loader/Loader';
import { useSchedule } from '@/hooks/useShedule';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useState } from 'react';

dayjs.extend(weekOfYear);

const SchedulePage = () => {
  const { data, isLoading } = useSchedule();
  const [active, setActive] = useState(dayjs());

  const weekNumber = active.week();

  const isEvenWeek = weekNumber % 2 === 0 ? 'even' : 'odd';
  const formattedDate = active.format('dddd, D MMMM');

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
            {isEvenWeek === 'even' ? 'Четная' : 'Нечетная'} неделя
          </Typography>
        </Box>
        <Stack spacing={2} mt={2} sx={{ maxWidth: '500px', width: '100%' }}>
          {data &&
            data[active.day()].map((classEl) => {
              return classEl.evenness === isEvenWeek ||
                classEl.evenness === 'always' ? (
                <Card
                  variant='outlined'
                  key={classEl.id}
                  sx={{
                    p: 2,
                    borderRadius: '15px',
                    display: 'flex',
                    cursor: 'pointer',
                  }}
                >
                  <Box flex={1}>
                    <Typography variant='h6' fontWeight={'bold'}>
                      {classEl.name}
                    </Typography>
                    {classEl.building && (
                      <Typography variant='body1'>
                        Здание: {classEl.building}
                      </Typography>
                    )}
                    {classEl.room && (
                      <Typography variant='body1'>
                        Ауд: {classEl.room}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography>
                      {dayjs(classEl.time).format('HH:mm')}
                    </Typography>
                  </Box>
                </Card>
              ) : null;
            })}
        </Stack>
      </Box>
    </Box>
  );
};

export default SchedulePage;
