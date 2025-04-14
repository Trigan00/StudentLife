import { useState } from 'react';
import {
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  Typography,
  Box,
  IconButton,
  // Divider,
  Tooltip,
  OutlinedInput,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

export type sortType = 'priority' | 'createdAt';
export type groupType =
  | 'no'
  | 'deadline'
  | 'priority'
  | 'createdAt'
  | 'className';

interface TaskTuneI {
  showCompleted: boolean;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  grouping: groupType;
  setGrouping: React.Dispatch<React.SetStateAction<groupType>>;
}

export default function TaskTune({
  showCompleted,
  setShowCompleted,
  grouping,
  setGrouping,
}: TaskTuneI) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const [sorting, setSorting] = useState('');
  // const [deadline, setDeadline] = useState('');
  // const [priority, setPriority] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title='Меню опций отображения' enterDelay={500}>
        <IconButton onClick={handleClick}>
          <TuneIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: 300 }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='body1' fontWeight={'bold'}>
            Отображение
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              alignItems: 'center',
            }}
          >
            <Typography>Выполненные задачи</Typography>
            <Switch
              checked={showCompleted}
              onChange={() => setShowCompleted((prev) => !prev)}
            />
          </Box>

          {/* <Divider sx={{ my: 1 }} /> */}

          {/* <Typography variant='body1'>Сортировка</Typography> */}

          <FormControl size='small' fullWidth sx={{ mt: 1 }}>
            <InputLabel>Группировка</InputLabel>
            <Select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value as groupType)}
              size='small'
              input={<OutlinedInput label='Группировка' />}
            >
              <MenuItem value='no'>нет (по умолчанию)</MenuItem>
              <MenuItem value='createdAt'>Дата добавления</MenuItem>
              <MenuItem value='deadline'>Дедлайн</MenuItem>
              <MenuItem value='priority'>Приоритет</MenuItem>
              <MenuItem value='className'>Предмет</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl size='small' fullWidth sx={{ mt: 1 }}>
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              size='small'
              input={<OutlinedInput label='Сортировка' />}
            >
              <MenuItem value=''>Вручную (по умолчанию)</MenuItem>
              <MenuItem value='date'>По дате</MenuItem>
              <MenuItem value='name'>По названию</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 1 }} />

          <Typography variant='body1'>Фильтр</Typography>

          <FormControl size='small' fullWidth sx={{ mt: 1 }}>
            <InputLabel>Срок</InputLabel>
            <Select
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              size='small'
              input={<OutlinedInput label='Срок' />}
            >
              <MenuItem value=''>Все (по умолчанию)</MenuItem>
              <MenuItem value='today'>Сегодня</MenuItem>
              <MenuItem value='week'>На этой неделе</MenuItem>
            </Select>
          </FormControl>

          <FormControl size='small' fullWidth sx={{ mt: 1 }}>
            <InputLabel>Приоритет</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              size='small'
              input={<OutlinedInput label='Приоритет' />}
            >
              <MenuItem value=''>Все (по умолчанию)</MenuItem>
              <MenuItem value='high'>Высокий</MenuItem>
              <MenuItem value='medium'>Средний</MenuItem>
              <MenuItem value='low'>Низкий</MenuItem>
            </Select>
          </FormControl> */}
        </Box>
      </Menu>
    </>
  );
}
