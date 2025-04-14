// components/Calendar.tsx
import {
  Calendar as BigCalendar,
  Views,
  SlotInfo,
  ToolbarProps,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from '@mui/material';
import { COLORS } from '@/utils/GeneralConsts';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAllTasks } from '@/hooks/useTasks';
import { Loader } from '@/components/UI/Loader/Loader';
import { Task } from '@/types/tasks.types';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useState } from 'react';
import { makeColor } from '@/helpers/makeColorByPriority';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);

export const localizer = dayjsLocalizer(dayjs);

interface CalendarEvent extends Omit<Task, 'deadLine'> {
  deadLine: dayjs.Dayjs;
  start: Date;
  end: Date;
}

// const initialEvents: CalendarEvent[] = [
//   {
//     id: 1,
//     title: 'Собрание команды',
//     start: new Date(2025, 3, 12, 10, 0),
//     end: new Date(2025, 3, 12, 10, 0),
//   },
//   {
//     id: 2,
//     title: 'Обед с инвестором',
//     start: new Date(2025, 3, 13, 13, 0),
//     end: new Date(2025, 3, 13, 13, 0),
//   },
//   {
//     id: 3,
//     title: 'Дедлайн проекта',
//     start: new Date(2025, 3, 15, 0, 0),
//     end: new Date(2025, 3, 15, 0, 0),
//     allDay: true,
//   },
// ];

// Функция для изменения стилей событий
const eventStyleGetter = (event: CalendarEvent) => {
  //TODO цвет от приоритета
  const style = {
    backgroundColor: 'white',
    border: '2px solid ' + makeColor(event.priority),
    color: 'black',
  };
  return {
    style,
  };
};

// Кастомизация панели инструментов
const CustomToolbar = (toolbarProps: ToolbarProps<CalendarEvent, any>) => {
  const { onView, onNavigate, view, label } = toolbarProps;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Box>
        <IconButton onClick={() => onNavigate('PREV')} color='primary'>
          <ChevronLeftIcon />
        </IconButton>
        <Button
          variant='outlined'
          size='small'
          onClick={() => onNavigate('TODAY')}
        >
          Сегодня
        </Button>
        <IconButton onClick={() => onNavigate('NEXT')} color='primary'>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Typography variant='body1'>{label}</Typography>
      <ButtonGroup variant='outlined' size='small'>
        <Button
          onClick={() => onView(Views.MONTH)}
          variant={view === Views.MONTH ? 'contained' : 'outlined'}
          sx={{ color: view === Views.MONTH ? 'white' : COLORS.primary }}
        >
          Месяц
        </Button>
        <Button
          onClick={() => onView(Views.WEEK)}
          variant={view === Views.WEEK ? 'contained' : 'outlined'}
          sx={{ color: view === Views.WEEK ? 'white' : COLORS.primary }}
        >
          Неделя
        </Button>
        <Button
          onClick={() => onView(Views.DAY)}
          variant={view === Views.DAY ? 'contained' : 'outlined'}
          sx={{ color: view === Views.DAY ? 'white' : COLORS.primary }}
        >
          День
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const Calendar = () => {
  const { data, isLoading } = useAllTasks();
  const [isTaskForm, setIsTaskForm] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  const handleSelectEvent = (event: CalendarEvent) => {
    setTaskId(event.id);
    setIsTaskForm(true);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // const newEvent: CalendarEvent = {
    //   id: events.length + 1,
    //   title: 'Новое событие',
    //   deadLine: slotInfo.start,
    //   end: slotInfo.start,
    //   allDay: false,
    // };

    console.log('📅 Новое событие:', slotInfo);
    // setEvents([...events, newEvent]);
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ height: '80vh' }}>
      {data && (
        <BigCalendar
          culture='ru'
          messages={{
            showMore: (total) => `+ еще ${total}`,
          }}
          localizer={localizer}
          events={data.reduce<CalendarEvent[]>((acc, task) => {
            if (!task.completed && task.deadLine !== null) {
              const date = dayjs(task.deadLine).toDate(); // <-- преобразуем в Date

              acc.push({
                ...task,
                deadLine: dayjs(task.deadLine), // можешь оставить для других целей
                start: date,
                end: date,
              });
            }
            return acc;
          }, [])}
          startAccessor='start'
          endAccessor='end'
          selectable={true}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          defaultView={Views.MONTH}
          views={['month', 'week', 'day']}
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      )}
      <TaskForm
        isModal={isTaskForm}
        setIsModal={setIsTaskForm}
        id={taskId}
        setTaskId={setTaskId}
      />
    </Box>
  );
};

export default Calendar;
