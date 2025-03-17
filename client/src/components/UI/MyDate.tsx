import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { SxProps } from '@mui/material';

interface MyDateI {
  label: string;
  value: dayjs.Dayjs | null;
  setValue: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  sx?: SxProps;
}

export default function MyDate({ value, setValue, label, sx }: MyDateI) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{ textField: { size: 'small' } }}
        sx={sx}
      />
    </LocalizationProvider>
  );
}
