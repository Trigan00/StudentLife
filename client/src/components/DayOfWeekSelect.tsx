import * as React from 'react';
// import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: personName.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

export default function DayOfWeekSelect({
  dayOfWeek,
  setDatOfWeek,
}: {
  dayOfWeek: string[];
  setDatOfWeek: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  //   const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof dayOfWeek>) => {
    const {
      target: { value },
    } = event;
    setDatOfWeek(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl size='small' sx={{ width: '50%' }}>
        <InputLabel id='demo-multiple-chip-label'>День недели</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={dayOfWeek}
          onChange={handleChange}
          input={
            <OutlinedInput id='select-multiple-chip' label='День недели' />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, i) => (
                <Chip
                  key={value}
                  label={(names.find((el) => el[0] === value) as string[])[1]}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name[0]}
              value={name[0]}
              //   style={getStyles(name[1], dayOfWeek, theme)}
            >
              {name[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
