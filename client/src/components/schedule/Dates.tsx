import React, { useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import { Box, Typography, Badge, Stack } from '@mui/material';
import { COLORS } from '@/utils/GeneralConsts';

interface DatesI {
  active: dayjs.Dayjs;
  setActive: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const Dates: React.FC<DatesI> = ({ active, setActive }) => {
  const today = dayjs();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLDivElement | null>(null);

  const days = Array.from({ length: 15 }, (_, i) =>
    today.subtract(7, 'day').add(i, 'day'),
  );

  useEffect(() => {
    if (containerRef.current && todayRef.current) {
      const container = containerRef.current;
      const todayElement = todayRef.current;

      const containerWidth = container.offsetWidth;
      const todayPosition = todayElement.offsetLeft;
      const todayWidth = todayElement.offsetWidth;

      // Прокрутка так, чтобы сегодняшний день был в центре
      container.scrollLeft =
        todayPosition - containerWidth / 2 + todayWidth / 2;
    }
  }, []);

  const onClick = (day: dayjs.Dayjs) => {
    // console.log(day.day());
    setActive(day);
  };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Stack
        ref={containerRef}
        spacing={2}
        direction={'row'}
        overflow={'auto'}
        sx={{ whiteSpace: 'nowrap', scrollbarWidth: 'thin' }} // предотвращает перенос строк
      >
        {days.map((day, index) => {
          const isToday = day.isSame(today, 'day');
          const isActive = day.isSame(active, 'day');

          return (
            <Box
              key={index}
              ref={isToday ? todayRef : null} // Присваиваем ref только сегодняшнему дню
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: 2,
                p: 1,
                border: isActive ? '2px solid ' + COLORS.primary : 'none',
                cursor: 'pointer',
              }}
              onClick={() => onClick(day)}
            >
              <Badge
                badgeContent={
                  <Typography
                    variant='caption'
                    color={isToday ? 'primary' : 'gray'}
                    sx={{ textAlign: 'center', display: 'block' }}
                  >
                    {day.format('MM')}
                  </Typography>
                }
                color='default'
              >
                <Typography
                  variant='h6'
                  color={isToday ? 'primary' : 'textPrimary'}
                >
                  {day.format('DD')}
                </Typography>
              </Badge>

              <Typography variant='body2' color={isToday ? 'primary' : 'gray'}>
                {day.format('dd').toUpperCase()}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Dates;
