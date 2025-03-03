import { errorCatch } from '@/api/error';
import { authService } from '@/services/auth.service';
import { IAuthForm } from '@/types/auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { routes } from '@/utils/routesConsts';
import { SITE_NAME } from '@/utils/GeneralConsts';

const Auth: FC<{ isLoginForm: boolean }> = ({ isLoginForm }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({});
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? 'login' : 'registration', data),
    onSuccess(res) {
      !isLoginForm && toast.success(res.data.message);
      // reset()
      isLoginForm &&
        queryClient.invalidateQueries({
          queryKey: ['token'],
        });
      // isLoginForm && navigate(routes.HOME_ROUTE);
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        <Typography component='h1' variant='h5' fontWeight={'600'}>
          {isLoginForm ? 'Войти' : 'Регистрация'} в {SITE_NAME}
        </Typography>

        <Typography variant='body2' sx={{ mt: 2, mb: 5 }}>
          {isLoginForm ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
          <Link
            variant='subtitle2'
            underline='hover'
            onClick={() =>
              navigate(
                isLoginForm ? routes.REGISTRATION_ROUTE : routes.LOGIN_ROUTE,
              )
            }
            sx={{ ml: 0.5, cursor: 'pointer' }}
          >
            {isLoginForm ? 'Зарегистроваться' : ' Тогда войдите'}
          </Link>
        </Typography>

        <TextField
          {...register('email', {
            required: 'Не может быть пустым',
            pattern: {
              value: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/,
              message: 'Пожалуйста, введите действующий Email-адрес.',
            },
          })}
          type='email'
          error={!!errors.email}
          label='Email'
          helperText={errors.email?.message}
          variant='outlined'
          size='small'
          fullWidth
          required
        />
        {!isLoginForm && (
          <TextField
            {...register('username', {
              required: 'Не может быть пустым',
            })}
            type='text'
            error={!!errors.username}
            label='Имя пользователя'
            helperText={errors.username?.message}
            variant='outlined'
            size='small'
            fullWidth
            required
          />
        )}
        <TextField
          {...register('password', {
            required: 'Не может быть пустым',
            minLength: {
              value: 8,
              message: 'В пароле должно быть не менее 8 символов.',
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[\W])(?=.*[a-zA-Z]).*$/,
              message:
                'Пароль должен содержать хотя бы одну цифру, один специальный символ и одну букву латинского алфавита',
            },
          })}
          type='password'
          error={!!errors.password}
          label='Пароль'
          helperText={errors.password?.message}
          variant='outlined'
          size='small'
          fullWidth
          required
        />

        <Button
          loading={isPending}
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            color: 'white',
          }}
        >
          {isLoginForm ? 'Войти' : 'Зарегистроваться'}
        </Button>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          sx={{ my: 3 }}
        >
          <Link
            variant='subtitle2'
            underline='hover'
            onClick={() => navigate(routes.RECOVERY_ROUTE)}
          >
            Забыли пароль?
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Auth;
