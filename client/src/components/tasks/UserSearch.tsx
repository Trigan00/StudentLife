import { useState, useMemo, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import { debounce } from 'lodash';
import { IUser } from '@/types/auth.types';
import { useUsersSearch } from '@/hooks/useUsersSearch';

interface UserSearchI {
  selectedUsers: IUser[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export function UserSearch({ selectedUsers, setSelectedUsers }: UserSearchI) {
  const [inputValue, setInputValue] = useState('');

  const { users, isFetching, refetch } = useUsersSearch(inputValue);

  // Делаем дебаунс поиска
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (inputValue.trim().length >= 2) {
          refetch();
        }
      }, 300),
    [inputValue, refetch],
  );

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleInputChange = (_event: any, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const handleChange = (_event: any, value: (IUser | string)[]) => {
    const filtered = value.filter(
      (v): v is IUser => typeof v === 'object' && v !== null,
    );
    setSelectedUsers(filtered);
    console.log('Выбранные пользователи:', filtered);
  };

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      options={[...selectedUsers, ...users]}
      value={selectedUsers}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option; // если это просто текст
        }
        return option.username; // если это пользователь
      }}
      loading={isFetching}
      onInputChange={handleInputChange}
      onChange={handleChange}
      noOptionsText={
        inputValue.length >= 2 ? (
          <Typography variant='body2' color='text.secondary'>
            Пользователь не найден
          </Typography>
        ) : (
          <Typography variant='body2' color='text.secondary'>
            Введите минимум 2 буквы
          </Typography>
        )
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          label='Поиск пользователя'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
        />
      )}
      renderOption={(props, option) => (
        <Box
          component='li'
          {...props}
          key={typeof option === 'string' ? option : option.id}
        >
          {typeof option === 'string' ? option : option.username}
        </Box>
      )}
    />
  );
}
